# Eduject

Welcome to **Eduject**! This project is a online learning web application designed to provide a seamless experience for students and educators, similar to platform like Udemy. It is built using the **MERN stack** and styled with **Tailwind CSS**.  

---

## Features

- **User Authentication**: Secure login and signup system with role-based access (e.g., Students and Instructors).  
- **Course Management**:  
  - Instructors can create, edit, and manage courses.  
  - Students can browse, enroll, watch lectures, do test, and track their progress.  
- **Interactive Learning**: Video-based lectures, document lectures, and quizzes.  
- **Personalized Dashboard**: Customized dashboards for users to monitor progress, achievements, and enrolled courses.    
- **Search and Filter**: Advanced search functionality to find courses by category, instructor, or popularity.
  
---

## Tech Stack

### Frontend
- **React.js**: Build the user interface.  
- **Tailwind CSS**: Create sleek and modern styling.  
- **Yarn**: Do dependency management and project builds.  

### Backend
- **Node.js**: Runtime for the server-side logic.  
- **Express.js**: Build RESTful APIs.  
- **MongoDB**: Store all data.  

---

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v16 or higher)  
- **Yarn** (v1.22 or higher)  
- **MongoDB** (local or cloud instance)  

### Installation

1. **Clone the Repository**:
   ```bash
   https://github.com/bachdam/Eduject.git
   cd Eduject
   
2. **Install Dependencies**:
   - Frontend:
     ```bash
     cd client
     npm install
     ```
   - Backend:
     ```bash
     cd server
     npm install
     ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGO_URL=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   ```

4. **Start the Application**:
  - Frontend:
     ```bash
     cd client
     yarn start
     ```
   - Backend:
     ```bash
     cd server
     node index.js
     ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## Features in Progress

The project is currently in progress. There are several features more to add.

---

## Credits
I got the template from a free credit website. All other codes in this project are my own work.

---

## Contact

- **Author**: [Bach Dam](https://github.com/bachdam)
- **Email**: dam07464@stthomas.edu

For any questions or suggestions, feel free to reach out!
