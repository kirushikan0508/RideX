import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Phone } from 'lucide-react';
import './ChatWindow.css';

const ChatWindow = ({ chat, onSendMessage, onBack }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat.messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(chat.id, newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <button className="back-btn-mobile" onClick={onBack}>
                    ←
                </button>
                <div className="header-user-info">
                    <img src={chat.user.avatar} alt={chat.user.name} />
                    <div>
                        <h3>{chat.user.name}</h3>
                        <span className="status-text">{chat.user.status === 'online' ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="icon-btn"><Phone size={20} /></button>
                    <button className="icon-btn"><MoreVertical size={20} /></button>
                </div>
            </div>

            <div className="messages-area">
                {chat.messages.map((msg) => (
                    <div key={msg.id} className={`message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                        <div className="message-content">
                            <p>{msg.text}</p>
                            <span className="msg-time">{msg.time}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
                <button type="button" className="icon-btn"><Paperclip size={20} /></button>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="button" className="icon-btn emoji-btn"><Smile size={20} /></button>
                </div>
                <button type="submit" className="send-btn">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
