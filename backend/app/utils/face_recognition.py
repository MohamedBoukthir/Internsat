import tensorflow as tf
import numpy as np
import cv2

# Path to the saved model directory
model_dir = "app/models/facenet"  # Replace with the path to your facenet folder

# Load the model
model = tf.saved_model.load(model_dir)

# Access the inference function
infer = model.signatures['serving_default']

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

def get_face_embedding(img):
    """
    Generate face embedding from an image.
    Args:
        img (np.ndarray): Image as a numpy array.
    Returns:
        np.ndarray: 128-dimensional face embedding.
    """
    # Preprocess the image
    img = preprocess_image(img)

    # Convert the image to a TensorFlow tensor
    input_tensor = tf.convert_to_tensor(img, dtype=tf.float32)

    # Perform inference using the model
    result = infer(input_tensor)

    # Extract the embedding (use the correct output key)
    embedding = result['Bottleneck_BatchNorm'].numpy()

    # Flatten to 1D array
    return embedding.flatten()

def capture_face():
    """
    Capture a face from the webcam.
    Returns:
        np.ndarray: Captured face image as a numpy array.
    """
    # Initialize webcam
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            raise ValueError("Unable to capture image from webcam.")

        # Display the frame
        cv2.imshow("Capture Face", frame)

        # Press 's' to save the face
        if cv2.waitKey(1) & 0xFF == ord('s'):
            break

    # Release the webcam and close the window
    cap.release()
    cv2.destroyAllWindows()

    return frame

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

def compare_faces(embedding1, embedding2, threshold=1.0):
    """
    Compare two face embeddings using Euclidean distance.
    Args:
        embedding1 (np.ndarray): First face embedding.
        embedding2 (np.ndarray): Second face embedding.
        threshold (float): Threshold for face similarity.
    Returns:
        bool: True if the faces match, False otherwise.
    """
    # Calculate Euclidean distance
    distance = calculate_euclidean_distance(embedding1, embedding2)
    return distance < threshold