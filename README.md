# NashSearch

## Overview
NashSearch is an AI-powered chat application built with React, Firebase, and Google's Gemini AI API. 
Firebase was used for Authentication and chats storage.

## Live Demo
Check out the live application: [NashSearch](https://nash-search.vercel.app/login)

## Features

### Chat Capabilities
- **AI-Powered Conversations**: Interact with Google's Gemini 1.5 Flash model for intelligent responses
- **Real-time Message Delivery**: See responses appear with a realistic typing effect
- **Markdown Support**: AI responses can include formatted text for better readability

### Chat Management
- **Previous Chats**: Access your conversation history organized by date
- **Chat History**: All conversations are saved automatically for future reference
- **Chat Navigation**: Easily switch between different conversation threads
- **New Chat Creation**: Start fresh conversations with one click
- **Chat Deletion**: Remove unwanted conversations from your history

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing in any environment
- **Loading Indicators**: Visual feedback when messages are being processed
- **Scroll to Bottom**: Automatically scrolls to the latest message
- **Clean Interface**: Minimalist design focused on the conversation

### Authentication & Security
- **Multiple Sign-in Methods**: Register and login with email/password or Google authentication
- **Protected Routes**: Chat interface is only accessible to authenticated users
- **Secure Data Storage**: All conversations are stored securely in Firebase

## Technology Stack
- **Frontend**: React.js with React Router for navigation
- **Backend**: Firebase (Authentication, Firestore Database)
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Styling**: CSS with dark/light theme support
- **Icons**: React Icons library
- **Markdown**: ReactMarkdown for message formatting
- **Deployment**: Vercel

## Screenshots
![iimge](https://github.com/user-attachments/assets/7c40ff10-a0bc-4b81-980b-957a8c78bd1f)
![image](https://github.com/user-attachments/assets/9cad709a-6e3d-4bbd-89c0-cd8929184bc2)
![image](https://github.com/user-attachments/assets/4f1fb5bc-66d2-4024-b74b-3bd8e507da4a)
![image](https://github.com/user-attachments/assets/51e5cd05-73f5-4d2c-9a1f-32f1fc4a1003)


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
   - Set up Firestore Database with the following structure:
     ```
     users/
       {userId}/
         chats/
           {chatId}/
             messages/
               {messageId}/
                 - text
                 - isUser
                 - timestamp
             - title
             - createdAt
             - lastMessage
             - lastUpdated
     ```

5. Obtain a Gemini API key:
   - Go to [Google AI Studio](https://ai.google.dev/)
   - Create a project and generate an API key

6. Start the development server:
   ```bash
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`

## Application Structure

### Key Components
- **Chat**: Main chat interface with message display and input
- **ChatList**: Sidebar showing previous conversations
- **Message**: Individual message component with typing effect
- **Login**: Authentication screen
- **ThemeToggle**: Dark/light mode switch

### Context Providers
- **AuthContext**: Manages user authentication state
- **ThemeContext**: Handles dark/light mode preferences



## Future Improvements
- Add user profile management
- Implement chat categorization and tagging
- Add message search functionality
- Improve conversation context handling for more coherent responses
- Add support for image and file attachments
- Implement chat sharing functionality
- Add export options for saving conversations

## Learning Resources
This project was built using the following technologies:
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Generative AI Documentation](https://ai.google.dev/docs)

