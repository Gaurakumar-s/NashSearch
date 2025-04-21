# NashSearch

## Overview
NashSearch is an AI-powered chat application built with React, Firebase, and Google's Gemini AI API. 

## Features
- **AI-Powered Conversations**: Interact with Google's Gemini 1.5 Flash model for intelligent responses
- **User Authentication**: Secure login with email/password or Google authentication
- **Chat Management**: Create, view, and delete conversation histories
- **Responsive Design**: Works on both desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Real-time Updates**: Messages appear instantly using Firebase's real-time database

## Technology Stack
- **Frontend**: React.js with React Router for navigation
- **Backend**: Firebase (Authentication, Firestore Database)
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Styling**: CSS with dark/light theme support
- **Icons**: React Icons library

## Screenshots
![image](https://github.com/user-attachments/assets/7c40ff10-a0bc-4b81-980b-957a8c78bd1f)
![image](https://github.com/user-attachments/assets/9cad709a-6e3d-4bbd-89c0-cd8929184bc2)
![image](https://github.com/user-attachments/assets/4f1fb5bc-66d2-4024-b74b-3bd8e507da4a)
<img width="1440" alt="Screenshot 2025-04-21 at 11 51 30 PM" src="https://github.com/user-attachments/assets/75724998-71e1-4ff0-9908-65cdf459a532" />




## Setup Instructions

### Prerequisites
- Node.js and npm installed
- Firebase account
- Google Generative AI API key

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nashsearch.git
   cd nashsearch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


4. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google sign-in methods)
   - Set up Firestore Database

5. Obtain a Gemini API key:
   - Go to [Google AI Studio](https://ai.google.dev/)
   - Create a project and generate an API key

6. Start the development server:
   ```bash
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

## Security Note
In the provided code, the Gemini API key is hardcoded. For production, always store API keys securely using environment variables.

## Future Improvements
- Add user profile management
- Implement chat categorization
- Add message search functionality
- Improve conversation context handling
- Add support for image and file attachments

## Learning Resources
This project was built using the following technologies:
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Generative AI Documentation](https://ai.google.dev/docs)

