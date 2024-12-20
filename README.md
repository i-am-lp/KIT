# Project Title

The KIT

## Overview

The KIT is a way to Keep In Touch with friends near and far through written updates, pictures, shoutouts, and prompts.

### Problem

It can be difficutlt to stay feeling connected to a larger group when you may not live near one another or talk daily. Social media apps like Instagram make it easy to see a highlight reel of what people are up to but it can't always capture the minutiae. It can also be difficult to keep up with those that may not have social media or even a smart phone.

### User Profile

- Friend groups who:
    - want to share life updates
    - want to share photos with the group
    - want to ask questions to the larger group
    - want everything compiled in a newsletter type format

### Features

- As a user, I want to be able to see a newsletter template

- As a logged in user, I want to be able to view my group newsletter
- As a logged in user, I want to be able to submit my life updates to the newsletter
- As a logged in user, I want to be able to submit pictures to the newsletter
- As a logged in user, I want to be able to ask questions to my group
- As a logged in user, I want to answer questions asked by my group
- As a logged in user, I want to see answers to questions asked by me or the group

## Implementation

### Tech Stack

- React
- MySQL
- Express
- JavaScript
- Client libraries:
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Home page
- Newsletter
- Update page
- Image upload page
- Register
- Login 


### Mockups

TBD

### Data

- User table
    - user ID 
    - email 
    - password

- Updates
    - user ID
    - timestamp
    - update
    - image
    - question

### Endpoints

**GET /newsletter**

- Get newsletter, with data shared from the group compiled:

Parameters:
- id: user ID as a number

Response:
```
{
    "id": 1,
    "name": "Jane Doe",
    "update": "I got a new job!",
    "image": "http://localhost:8080/images/image0.jpg",
    "question": "What was the best thing you've eaten recently?",
    "timestamp": 1691471862000
}
```

**Get /newsletter/:id**

- Get individual newsletter response by user id as well as answers to question

Parameters:
- id: user ID as a number

Response:
```
{
    "id": 1,
    "name": "Jane Doe",
    "update": "I got a new job!",
    "image": "http://localhost:8080/images/image0.jpg",
    "question": "What was the last TV show you watched?",
    "timestamp": 1691471862000,
    "answers": [
        {
            "id": 2,
            "name": "John Doe",
            "response": "The season finale of Survivor",
            "timestamp": 1691731062000
        }
    ]
}
```

**POST /updates**

- Logged in user can add their updates, image, and question

Parameters:
- id: user ID as a number

Response:
```
{
    "id": 1,
    "name": "Jane Doe",
    "update": "I got a new job!",
    "image": "http://localhost:8080/images/image0.jpg",
    "question": "What was the best thing you've eaten recently?",
    "timestamp": 1691471862000
}
```

**PUT /updates**

- Logged in user can edit their updates

Parameters:
- id: user ID as a number

Response:
```
{
    "id": 1,
    "name": "Jane Doe",
    "update": "I got a new job!",
    "image": "http://localhost:8080/images/image0.jpg",
    "question": "What was the best thing you've eaten recently?",
    "timestamp": 1691471862000
}
```

**POST /login/register**

- Add a user

Parameters:
- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /login**

- Login a user

Parameters:
- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth

- JWT auth
    - Before adding auth, all API requests will be using a fake user with id 1
    - Added after core features have first been implemented
    - Store JWT in localStorage, remove when a user logs out
    - Add states for logged in showing different UI in places listed in mockups

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

- Create client
    - react project with routes and boilerplate pages

- Create server
    - express project with routing, with placeholder 200 responses

- Create migrations

- Create 5 sample responses from diffferent users

- Create seeds with sample response data

- Deploy client and server projects so all commits will be reflected in production

- Feature: Create account
    - Implement register page + form
    - Create POST /login/register endpoint

- Feature: Login
    - Implement register page + form
    - Create POST /login endpoint

- Feature: Home page

- Feature: Update page
    - Add form to submit updates
    - Create POST /updates

- Feature: Edit update
    - Create PUT /updates

- Feature: Newsletter
    - Implement newsletter page
    - Create GET /newsletter 

- Feature: View newsletter by user
    - Implement individual newsletter page
    - Create GET /newsletter/:id
    - Create POST /newsletter/:id

- Bug fixes

- DEMO DAY 

## Nice-to-haves

- Forgot password functionality
- Add multiple images
- Add video
- Ability to filter newsletter to just updates/ questions/ or images
- Add comments to updates