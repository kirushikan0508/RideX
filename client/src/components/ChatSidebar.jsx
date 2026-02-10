import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './ChatSidebar.css';

const ChatSidebar = ({ chats, activeChatId, onSelectChat, currentUser }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChats = chats.filter((chat) => {
        const otherUser = chat.participants.find(p => p._id !== currentUser._id);
        return otherUser?.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
                {filteredChats.map((chat) => {
                    const otherUser = chat.participants.find(p => p._id !== currentUser._id);
                    return (
                        <div
                            key={chat._id}
                            className={`conversation-item ${activeChatId === chat._id ? 'active' : ''}`}
                            onClick={() => onSelectChat(chat)}
                        >
                            <div className="avatar-wrapper">
                                <img src={otherUser?.avatar || 'https://via.placeholder.com/40'} alt={otherUser?.name} />
                                {/* Status dot can be improved with real online users list prop */}
                            </div>

                            <div className="conversation-info">
                                <div className="convo-top">
                                    <h4>{otherUser?.name}</h4>
                                    {/* <span className="time">{new Date(chat.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span> */}
                                </div>
                                <div className="convo-bottom">
                                    <p className="last-message">{chat.lastMessage || 'Start a conversation'}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatSidebar;
