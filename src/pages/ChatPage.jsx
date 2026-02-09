import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import { MOCK_CHATS } from '../data/mockChats';
import './ChatPage.css';

const ChatPage = () => {
    const [chats, setChats] = useState(MOCK_CHATS);
    const [activeChatId, setActiveChatId] = useState(null);
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

    // Initial selection
    useEffect(() => {
        if (!activeChatId && window.innerWidth > 768) {
            setActiveChatId(chats[0].id);
        }
    }, []);

    const handleSelectChat = (id) => {
        setActiveChatId(id);
        // Mark as read
        setChats(chats.map(c => c.id === id ? { ...c, unread: 0 } : c));
        setIsMobileChatOpen(true);
    };

    const handleSendMessage = (chatId, text) => {
        const newMessage = {
            id: Date.now(),
            sender: 'me',
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChats(chats.map(chat => {
            if (chat.id === chatId) {
                return {
                    ...chat,
                    messages: [...chat.messages, newMessage],
                    lastMessage: text,
                    time: 'Just now'
                };
            }
            return chat;
        }));
    };

    const activeChat = chats.find(c => c.id === activeChatId);

    return (
        <div className="chat-page">
            <Navbar />
            <div className="chat-layout">
                <div className={`sidebar-container ${isMobileChatOpen ? 'mobile-hidden' : ''}`}>
                    <ChatSidebar
                        chats={chats}
                        activeChatId={activeChatId}
                        onSelectChat={handleSelectChat}
                    />
                </div>

                <div className={`chat-window-container ${isMobileChatOpen ? 'mobile-visible' : ''}`}>
                    {activeChat ? (
                        <ChatWindow
                            chat={activeChat}
                            onSendMessage={handleSendMessage}
                            onBack={() => setIsMobileChatOpen(false)}
                        />
                    ) : (
                        <div className="empty-chat-state">
                            <div className="empty-content">
                                <h3>Select a conversation</h3>
                                <p>Choose a chat from the sidebar to start messaging.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
