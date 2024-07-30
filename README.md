
UniRoomMatess

## Overview
UniRoomMatess is an innovative platform designed to simplify the process of finding suitable roommates for international students in Canada. This application caters to students at various academic levels—undergraduate, graduate, and PhD—helping them connect, share living spaces, and integrate into local communities through shared interests and events. UniRoomMatess leverages modern web technologies, offering a secure and dynamic environment where users can create detailed profiles, explore potential roommates, join interest groups, and discover local events in Windsor.

## Key Features
- **User Profiles**: Users can create detailed profiles that include personal habits, study habits, and interests to help match with compatible roommates.
- **Authentication**: Secure login process using a unique key generated at registration, ensuring user data protection.
- **Roommate Exploration**: Home page displays potential roommate cards, allowing users to learn about each other at a glance.
- **Group Functionality**: Users can form groups based on shared interests or needs and communicate via integrated email functionality.
- **Local Events Discovery**: A dedicated section for users to explore upcoming events in Windsor, promoting social interactions and community engagement.

## Technologies Used
- **Frontend**: React with Vite for efficient component management and faster development cycles.
- **Backend**: Express framework on Node.js for handling API requests and server-side logic.
- **Database**: MongoDB, a NoSQL database, to store user data flexibly and securely.
- **Authentication**: Unique key based authentication for managing user sessions and securing API endpoints.

## Installation

### Prerequisites
- Node.js
- MongoDB
- Git (optional, for cloning the repository)

### Setup
1. **Clone the repository (if using Git):**
   ```bash
   git clone https://github.com/your-username/UniRoomMatess.git
   cd UniRoomMatess
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory and add the necessary configurations (e.g., database URI, JWT secret).

4. **Start the server:**
   ```bash
   # From the backend directory
   npm start
   ```

5. **Run the frontend:**
   ```bash
   # From the frontend directory
   npm run dev
   ```

## Getting Started
- Visit `http://localhost:5173` on your browser to view the application.
- Register as a new user to explore the features.
- Login using the credentials you registered with to access the home page and other functionalities.

## Contribution
Contributions to UniRoomMatess are welcome! Please refer to the `CONTRIBUTING.md` file for more details on how to contribute to this project.

## License
This project is licensed under the [MIT License](LICENSE).

---
