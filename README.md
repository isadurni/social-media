# Piazza Documentation

## Overview

This application is a backend for a social media platform. Using RESTful APIs authenticated users can create, edit, view, and delete posts. 

## Installation

1. Set-Up Project
    - git clone [https://github.com/your-username/social-media.git](https://github.com/your-username/social-media-api.git)
    - cd social-media
2. Install Dependencies
    - npm install bcryptjs body-parser dotenv express joi jswebtoken mongoose nodemon
3. Configure MongoDB in a .env file (ensure to replace placeholders with your keys)
    - DB_CONNECTOR=your_mongodb_connection_string
    - TOKEN_SECRET=your_jwt_secret
4. Run Application
    - npm start

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Postman (preferred)
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token), Bycryptjs
- **Validation:** Joi

## API Endpoints

Documentation for utilizing endpoints for authentication and posts.

### Register a New User

POST /api/user/register

Body Parameters:

- name (3-256 characters)
- email (6-256 characters, email format, unique)
- password (6-1024 characters)

```json
// Example Body
{
    "name":"Ignacio"
    "email":"ignaciosadurni@gmail.com",
    "password":"123456"
}
```

### Login As an Existing User

POST /api/user/login

Body Parameters:

- email (6-256 characters, email format, exists in the database)
- password (6-1024 characters, matches the user password in the database)

```json
// Example Body
{
    "email":"ignaciosadurni@gmail.com",
    "password":"123456"
}
```

### Get All Posts

GET /api/posts

### Get a Single Post

GET /api/posts/:postId

Path Parameters:

- postId (id of existing post in database)

### Create a Post (Authorization Required)

POST /api/posts

Body Parameters:

- title (string, max 100 characters)
- description (string, max 500 characters)
- likes (default 0)

Header:

- “auth-token”: *token…*
    - obtained in response of login request → /api/user/login

```json
// Example Body
{
    "title": "My First Post",
    "description": "This is my first post.",
    "likes": 5,
}
```

### Update a Post (Authorization Required)

PATCH /api/posts/:postId

Body Parameters (same as creating a post)

- title (string, max 100 characters)
- description (string, max 500 characters)
- likes (default 0)

Path Parameters:

- postId (id of an existing post in the database created by user)

Header:

- “auth-token”: *token…*
    - obtained in response of login request → /api/user/login
    - the auth-token must belong to the user that created the post

### Delete a Post (Authorization Required)

DEL /api/posts/:postId

Path Parameters:

- postId (id of an existing post in the database created by user)

Header:

- “auth-token”: *token…*
    - obtained in response of login request → /api/user/login
    - the auth-token must belong to the user that created the post
