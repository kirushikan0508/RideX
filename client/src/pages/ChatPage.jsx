import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import { useAuth } from '../context/AuthContext';
import './ChatPage.css';

const ENDPOINT = window.location.origin.replace('5173', '5000'); // Adjust port if needed

const ChatPage = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    // Connect to Socket
    useEffect(() => {
        if (user) {
            socket.current = io(ENDPOINT);
            socket.current.emit("addUser", user._id);
        }
    }, [user]);

    // Listen for incoming messages
    useEffect(() => {
        if (socket.current) {
            socket.current.on("getMessage", (data) => {
                setArrivalMessage({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                    _id: Date.now() // Temp ID
                });
            });
        }
    }, []);

    // Update messages when arrivalMessage changes
    useEffect(() => {
        if (arrivalMessage && activeChat?.participants.some(p => p._id === arrivalMessage.sender)) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage, activeChat]);

    // Fetch Conversations
    useEffect(() => {
        const getConversations = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch('/api/chat/conversations', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setConversations(data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user]);

    // Fetch Messages for Active Chat
    useEffect(() => {
        const getMessages = async () => {
            if (!activeChat) return;
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`/api/chat/messages/${activeChat._id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [activeChat]);

    const handleSelectChat = (chat) => {
        setActiveChat(chat);
        setIsMobileChatOpen(true);
    };

    const handleSendMessage = async (text) => {
        const receiverId = activeChat.participants.find(member => member._id !== user._id)._id;

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text,
            conversationId: activeChat._id,
        });

        // Optimistic UI update
        const newMessage = {
            sender: user._id,
            text,
            createdAt: Date.now(),
            _id: Date.now()
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="chat-page">
            <Navbar />
            <div className="chat-layout">
                <div className={`sidebar-container ${isMobileChatOpen ? 'mobile-hidden' : ''}`}>
                    <ChatSidebar
                        chats={conversations}
                        activeChatId={activeChat?._id}
                        onSelectChat={handleSelectChat}
                        currentUser={user}
                    />
                </div>

                <div className={`chat-window-container ${isMobileChatOpen ? 'mobile-visible' : ''}`}>
                    {activeChat ? (
                        <ChatWindow
                            chat={activeChat}
                            messages={messages}
                            currentUser={user}
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
