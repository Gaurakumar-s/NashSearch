import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

function Message({ message, isUser, isCurrentChatNewMessage = false }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(true);

  useEffect(() => {
    // For user messages or messages in existing chats, show immediately
    if (isUser || !isCurrentChatNewMessage) {
      setDisplayedText(message);
      setIsTyping(false);
      setTypingComplete(true);
      return;
    }

    // Only apply typing effect for new AI messages in a new chat session
    setIsTyping(true);
    setTypingComplete(false);
    setDisplayedText('');

    // Safety check for message
    if (!message) {
      setIsTyping(false);
      setTypingComplete(true);
      return;
    }

    // Typing effect for new AI messages only
    let index = 0;
    const typingSpeed = 15; // milliseconds per character
    
    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTypingComplete(true);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [message, isUser, isCurrentChatNewMessage]);

  return (
    <div className={`message ${isUser ? 'user' : 'bot'}`}>
      {typingComplete || isUser ? (
        <ReactMarkdown>{message || ''}</ReactMarkdown>
      ) : (
        <>
          <ReactMarkdown>{displayedText}</ReactMarkdown>
          {isTyping && <span className="typing-indicator">...</span>}
        </>
      )}
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
  isCurrentChatNewMessage: PropTypes.bool,
};

Message.defaultProps = {
  message: '',
  isCurrentChatNewMessage: false,
};

export default Message;