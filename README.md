# Internsat

This project is a web application designed to manage internships. It consists of a backend built with Flask and a frontend built with Vite + React.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Alternative Editing Methods](#alternative-editing-methods)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Deployment](#deployment)

## Features

- User registration and login
- Face recognition for authentication
- Internship management

## Technologies

- **Backend**: Flask, MongoDB, TensorFlow, MTCNN
- **Frontend**: Vite, TypeScript, React, shadcn-ui, Tailwind CSS

## Setup

### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MohamedBoukthir/Internsat.git
   cd Internsat/backend
   ```
2. **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On MacOS/Linux
    source venv/bin/activate
    ```
3. **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4. **Set up environment variables:**
    ```bash
    MONGO_URI=your_mongodb_atlas_uri
    SECRET_KEY=your_secret_key
    ```

### Frontend

1. **Install dependencies:**

   ```bash
   npm install
   ```
2. **Start the development server:**
    ```bash
    npm run dev
    ```
