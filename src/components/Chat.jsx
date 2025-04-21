import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import Message from './Message';
import ChatList from './ChatList';
import ThemeToggle from './ThemeToggle';
import { FaPaperPlane, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { db, doc, setDoc, addDoc, collection, onSnapshot, query, orderBy, Timestamp, getDoc } from '../firebase/firebase';

// Gemini API key - Note: In production, this should be stored securely
const GEMINI_API_KEY = 'AIzaSyB6TorXC_HfPDWIYbQ--DhtAxPxmnhz80I';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

function Chat() {
  const { currentUser, logout } = useAuth();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [latestMessageId, setLatestMessageId] = useState(null);
  const [isCurrentChatNewMessage, setIsCurrentChatNewMessage] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Handle chat selection
  const handleSelectChat = (selectedChatId) => {
    if (selectedChatId) {
      // Reset the current session when switching chats
      setCurrentSession(null);
      setIsCurrentChatNewMessage(false);
      navigate(`/chat/${selectedChatId}`);
    } else {
      navigate('/chat/new');
    }
  };

  // Generate a new session ID when component mounts or chatId changes
  useEffect(() => {
    // Generate a unique session ID for this chat instance
    setCurrentSession(`session-${Date.now()}`);
    // Reset new message flag when changing chats
    setIsCurrentChatNewMessage(false);
  }, [chatId]);

  // Load messages when chatId changes
  useEffect(() => {
    if (!currentUser) return;
    if (chatId === 'new') {
      setMessages([]);
      return;
    }

    setIsLoading(true);
    
    const q = query(
      collection(db, `users/${currentUser.uid}/chats/${chatId}/messages`),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(loadedMessages);
      setIsLoading(false);
      
      // Scroll to bottom after loading messages
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    });

    return () => unsubscribe();
  }, [currentUser, chatId]);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) {
      setError('Please enter a message.');
      return;
    }

    const newMessage = {
      text: userInput,
      isUser: true,
      timestamp: Timestamp.now(),
    };

    const inputCopy = userInput.trim(); // Store a copy of the input
    setUserInput('');
    setError(null);
    setIsLoading(true);
    
    try {
      let newChatId = chatId;
      
      // Handle new chat creation
      if (chatId === 'new') {
        const chatDoc = await addDoc(collection(db, `users/${currentUser.uid}/chats`), {
          title: inputCopy.slice(0, 50),
          createdAt: Timestamp.now(),
          lastMessage: inputCopy,
          lastUpdated: Timestamp.now()
        });
        newChatId = chatDoc.id;
        
        // Add user message to database first, before navigating
        await addDoc(collection(db, `users/${currentUser.uid}/chats/${newChatId}/messages`), newMessage);
        
        // Get AI response before navigation
        try {
          const result = await model.generateContent(inputCopy);
          const response = await result.response.text();
          
          const aiMessage = {
            text: response,
            isUser: false,
            timestamp: Timestamp.now(),
          };
          
          // Add AI message to database
          const aiMessageRef = await addDoc(collection(db, `users/${currentUser.uid}/chats/${newChatId}/messages`), aiMessage);
          setLatestMessageId(aiMessageRef.id);
          
          // Only navigate after both messages are added
          navigate(`/chat/${newChatId}`, { replace: true });
          setIsCurrentChatNewMessage(true);
        } catch (aiError) {
          console.error("AI Error:", aiError);
          const errorMessage = {
            text: "I'm sorry, I couldn't process your request. Please try again.",
            isUser: false,
            timestamp: Timestamp.now(),
          };
          await addDoc(collection(db, `users/${currentUser.uid}/chats/${newChatId}/messages`), errorMessage);
          navigate(`/chat/${newChatId}`, { replace: true });
        }
      } else {
        // Existing chat flow remains unchanged
        // Add user message to database
        await addDoc(collection(db, `users/${currentUser.uid}/chats/${newChatId}/messages`), newMessage);
        
        // Update existing chat metadata
        await setDoc(doc(db, `users/${currentUser.uid}/chats`, newChatId), {
          lastMessage: inputCopy,
          lastUpdated: Timestamp.now()
        }, { merge: true });
        
        // Set flag that we're creating a new message in this chat session
        setIsCurrentChatNewMessage(true);
        
        // Get AI response
        try {
          const result = await model.generateContent(inputCopy);
          const response = await result.response.text();
          
          const aiMessage = {
            text: response,
            isUser: false,
            timestamp: Timestamp.now(),
          };
          
          // Add AI message to database
          const aiMessageRef = await addDoc(collection(db, `users/${currentUser.uid}/chats/${newChatId}/messages`), aiMessage);
          setLatestMessageId(aiMessageRef.id);
        } catch (aiError) {
          console.error("AI Error:", aiError);
          const errorMessage = {
            text: "I'm sorry, I couldn't process your request. Please try again.",
            isUser: false,
            timestamp: Timestamp.now(),
          };
          await addDoc(collection(db, `users/${currentUser.uid}/chats/${newChatId}/messages`), errorMessage);
        }
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setUserInput('');
    setError(null);
    navigate('/chat/new', { replace: true });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      setError('Failed to log out.');
      console.error(err);
    }
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <ChatList onSelectChat={handleSelectChat} />
      </div>
      <div className="main-content">
        <header className="chat-header">
          <h1>NashSearch</h1>
          <div className="header-actions">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="logout-button"
              aria-label="Log out"
            >
              <FaSignOutAlt size={20} />
            </button>
          </div>
        </header>
        <div ref={scrollRef} className="messages-container">
          {messages.length === 0 && !isLoading && !error && (
            <div className="no-messages">Start a conversation!</div>
          )}
          {messages.map((msg, index) => (
            <Message
              key={msg.id || index}
              message={msg.text}
              isUser={msg.isUser}
              isCurrentChatNewMessage={isCurrentChatNewMessage && msg.id === latestMessageId && !msg.isUser}
            />
          ))}
          {isLoading && <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Processing...</div>
          </div>}
          {error && <div className="error-message">{error}</div>}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear chat"
          >
            <FaTrash size={20} />
          </button>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="send-button"
            disabled={isLoading}
            aria-label="Send message"
          >
            <FaPaperPlane size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;