import tensorflow as tf
import numpy as np
import cv2
import base64

# Path to the saved model directory
model_dir = "app/models/facenet"  # Replace with the path to your facenet folder

# Load the model
model = tf.saved_model.load(model_dir)

# Access the inference function
infer = model.signatures['serving_default']
print(infer.structured_outputs)

def detect_face(img):
    """
    Detect a face in the image using OpenCV's Haar Cascade.
    Args:
        img (np.ndarray): Image as a numpy array.
    Returns:
        np.ndarray: Cropped face image as a numpy array.
    """
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) == 0:
        print("Error: No face detected in the image.")
        return None

    # Crop the first detected face
    (x, y, w, h) = faces[0]
    margin = 10  # Add a margin around the face
    x = max(0, x - margin)
    y = max(0, y - margin)
    w = w + 2 * margin
    h = h + 2 * margin
    return img[y:y+h, x:x+w]

def preprocess_image(img):
    """
    Preprocess the image for FaceNet using OpenCV.
    Args:
        img (np.ndarray): Image as a numpy array.
    Returns:
        np.ndarray: Preprocessed image as a numpy array.
    """
    # Convert BGR to RGB (OpenCV loads images in BGR format)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Resize to model input size (160x160)
    img = cv2.resize(img, (160, 160))

    # Normalize to [-1, 1] (FaceNet expects this range)
    img = (img.astype('float32') / 127.5) - 1.0

    # Add batch dimension
    img = np.expand_dims(img, axis=0)
    return img

def get_face_embedding(base64_image):
    """
    Generate face embedding from a base64-encoded image.
    Args:
        base64_image (str): Base64-encoded image.
    Returns:
        np.ndarray: 128-dimensional face embedding.
    """
    try:
        # Decode the base64 image
        image_bytes = base64.b64decode(base64_image.split(',')[1])  # Remove the data URL prefix
        image_np = np.frombuffer(image_bytes, dtype=np.uint8)
        img = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

        if img is None:
            print("Error: Failed to decode image.")
            return None

        # Detect face
        face_img = detect_face(img)
        if face_img is None:
            return None

        # Preprocess the image
        face_img = preprocess_image(face_img)

        # Generate embedding
        input_tensor = tf.convert_to_tensor(face_img, dtype=tf.float32)
        result = infer(input_tensor)
        embedding = result['Bottleneck_BatchNorm'].numpy().flatten()

        print(f"Generated embedding shape: {embedding.shape}")
        return embedding
    except Exception as e:
        print(f"Error in get_face_embedding: {e}")
        return None

def calculate_euclidean_distance(embedding1, embedding2):
    """
    Calculate Euclidean distance between two embeddings.
    Args:
        embedding1 (np.ndarray): First face embedding.
        embedding2 (np.ndarray): Second face embedding.
    Returns:
        float: Euclidean distance.
    """
    return np.linalg.norm(embedding1 - embedding2)

def compare_faces(embedding1, embedding2, threshold=2.5):  
    """
    Compare two face embeddings using Euclidean distance.
    Args:
        embedding1 (np.ndarray): First face embedding.
        embedding2 (np.ndarray): Second face embedding.
        threshold (float): Threshold for face comparison.
    Returns:
        bool: True if the distance is below the threshold, False otherwise.
    """
    distance = calculate_euclidean_distance(embedding1, embedding2)
    print(f"Euclidean distance: {distance}")
    return distance < threshold