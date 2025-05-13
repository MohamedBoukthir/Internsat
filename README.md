# Internsat

Internsat is a web application designed to streamline internship management. It provides features like user registration, face recognition for authentication, and an intuitive interface for managing internship details.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Requirements](#requirements)
- [Setup](#setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Using Docker](#using-docker)
- [Alternative Editing Methods](#alternative-editing-methods)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Deployment](#deployment)

## Features

- User registration and login
- Face recognition for authentication
- Internship management
- Responsive frontend built with modern web technologies
- **Security Features**:
  - Password hashing 
  - Embedded stored hash-based authentication mechanisms
  - Input validation on both frontend and backend to prevent injection attacks
  - Secure storage of sensitive data (e.g., environment variables and user credentials)

## Technologies

- **Backend**: Flask, MongoDB, TensorFlow, MTCNN
- **Frontend**: Vite, TypeScript, React, shadcn-ui, Tailwind CSS

## Requirements

To install and run this project, ensure you have the following installed on your system:

- [Git](https://git-scm.com/) (version 2.45.1 or higher)
- [Node.js](https://nodejs.org/) (version 22.14.0 or higher)
- [Python](https://www.python.org/) (version 3.12 or higher)
- [Docker](https://www.docker.com/) (optional, for running the project with Docker)

## Setup
  **Clone the repository:**
   ```bash
   git clone https://github.com/MohamedBoukthir/Internsat.git
   ```

### Backend

   ```bash
   cd Internsat/backend
   ```
1. **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On MacOS/Linux
    source venv/bin/activate
    ```
1. **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
3. **Set up environment variables:**
    ```bash
    MONGO_URI=your_mongodb_atlas_uri
    SECRET_KEY=your_secret_key
    ```

### Frontend
  ```bash
   cd Internsat/frontend
   ```

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
    ```bash
    npm run dev
    ```

### Using Docker

If you prefer to use Docker to run the project, follow these steps:

1. **Ensure Docker is Installed**
Make sure Docker is installed on your system. You can download and install it from the [official Docker website](https://www.docker.com/get-started/).

2. **Build and Run the Docker Containers:**
Navigate to the root of the project and run the following command:

  ```bash
  docker-compose up --build
  ```


