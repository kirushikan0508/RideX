import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './ChatSidebar.css';

const ChatSidebar = ({ chats, activeChatId, onSelectChat }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChats = chats.filter(chat =>
        chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="chat-sidebar">
            <div className="sidebar-header">
                <h2>Messages</h2>
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="conversations-list">
                {filteredChats.map(chat => (
                    <div
                        key={chat.id}
                        className={`conversation-item ${activeChatId === chat.id ? 'active' : ''}`}
                        onClick={() => onSelectChat(chat.id)}
                    >
                        <div className="avatar-wrapper">
                            <img src={chat.user.avatar} alt={chat.user.name} />
                            {chat.user.status === 'online' && <span className="status-dot"></span>}
                        </div>

                        <div className="conversation-info">
                            <div className="convo-top">
                                <h4>{chat.user.name}</h4>
                                <span className="time">{chat.time}</span>
                            </div>
                            <div className="convo-bottom">
                                <p className="last-message">{chat.lastMessage}</p>
                                {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                            </div>
                            <span className="vehicle-tag">{chat.vehicle}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
