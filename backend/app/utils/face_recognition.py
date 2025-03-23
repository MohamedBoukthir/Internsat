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
    img = preprocess_image(img)
    input_tensor = tf.convert_to_tensor(img, dtype=tf.float32)
    result = infer(input_tensor)
    embedding = result['Bottleneck_BatchNorm'].numpy().flatten()
    print("Face Embedding:", embedding)  # Print the embedding
    return embedding

def capture_face():
    print("Starting face capture...")  # Debugging line
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise ValueError("Unable to access webcam. Please check your camera permissions.")

    print("Please look at the camera for face capture...")
    print("Press 's' to save the face and 'q' to quit.")

    captured_image = None

    while True:
        ret, frame = cap.read()
        if not ret:
            raise ValueError("Unable to capture image from webcam.")

        cv2.imshow("Capture Face", frame)

        key = cv2.waitKey(1) & 0xFF

        if key == ord('s'):
            captured_image = frame
            print("Face captured successfully.")
            # Save the captured image for debugging
            cv2.imwrite("debug_login.jpg", captured_image)
            break

        if key == ord('q'):
            print("Face capture cancelled.")
            break

    cap.release()
    cv2.destroyAllWindows()

    if captured_image is None:
        raise ValueError("No face was captured.")

    return captured_image

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

def compare_faces(embedding1, embedding2, threshold=1.2):  # Increased threshold
    distance = calculate_euclidean_distance(embedding1, embedding2)
    return distance < threshold