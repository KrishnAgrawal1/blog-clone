# Blogging Application

A full-stack blogging application built using **JavaScript**, **EJS**, **Express**, and **MongoDB**. This application allows users to sign up, log in, create blogs with titles, content, and cover images, and comment on other users' posts.

## Features

- **User Authentication**: 
  - Sign up and log in functionality.
  - Password hashing and secure authentication.
  
- **Blog Creation**: 
  - Users can create their own blogs.
  - Each blog contains a title, body, and optional cover image.

- **Comments**:
  - Users can comment on any blog post.
  
- **Responsive Design**: 
  - EJS templating for dynamic HTML rendering with a responsive design.
  
---

## Technologies Used

- **JavaScript**: Core language for both the frontend and backend.
- **Node.js**: JavaScript runtime environment for server-side programming.
- **Express.js**: Web framework for building the backend server.
- **MongoDB**: NoSQL database to store user and blog data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **EJS (Embedded JavaScript)**: Templating engine to generate dynamic HTML content.
- **crypto**: For password hashing.
- **multer**: Middleware for handling file uploads (used for uploading cover images).

---

add .env file  
{  
  PORT = 8000  
  MONGODB_URL = mongodb://localhost:27017/blogify  
  SECRET_KEY = 12345678  
}  
  

