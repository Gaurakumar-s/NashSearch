import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { db, doc, setDoc } from '../firebase/firebase';

function ChatList({ onSelectChat }) {
  const { chats, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleNewChat = () => {
    onSelectChat(null);
    navigate('/chat/new');
  };

  const handleDeleteChat = async (chatId, e) => {
    e.stopPropagation(); // Prevent chat selection when clicking delete
    try {
      // Mark the chat as deleted in the database
      await setDoc(
        doc(db, `users/${currentUser.uid}/chats`, chatId),
        { deleted: true, updatedAt: new Date() },
        { merge: true }
      );
      
      // If we're currently viewing this chat, navigate to new chat
      if (window.location.pathname.includes(chatId)) {
        navigate('/chat/new');
      }
    } catch (err) {
      console.error("Error marking chat as deleted:", err);
    }
  };

  // Filter out chats marked as deleted
  const activeChats = chats.filter(chat => !chat.deleted);

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Nash Chat</h2>
        <button
          onClick={handleNewChat}
          className="new-chat-btn"
        >
          <FaPlus className="icon-mr" /> New Chat
        </button>
      </div>
      
      <h3>Previous Chats</h3>
      {activeChats.length === 0 ? (
        <p className="no-chats">No previous chats.</p>
      ) : (
        <ul>
          {activeChats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => {
                onSelectChat(chat.id);
                navigate(`/chat/${chat.id}`);
              }}
              className="chat-item"
            >
              <div className="chat-info">
                <span className="chat-title">
                  {chat.title || `Chat ${chat.id.slice(0, 6)}`}
                </span>
                <small className="chat-date">
                  {chat.createdAt && chat.createdAt.toDate ? 
                    new Date(chat.createdAt.toDate()).toLocaleString() : 
                    'Unknown date'}
                </small>
              </div>
              <button
                className="delete-chat-btn"
                onClick={(e) => handleDeleteChat(chat.id, e)}
                aria-label="Delete chat"
              >
                <FaTrash size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ChatList.propTypes = {
  onSelectChat: PropTypes.func.isRequired,
};

export default ChatList;