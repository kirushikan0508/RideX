export const MOCK_CHATS = [
    {
        id: 1,
        user: {
            name: "RideX Fleet Support",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop",
            status: "online"
        },
        vehicle: "Luxury Car 1",
        lastMessage: "Your booking is confirmed! See you at 10 AM.",
        time: "10:30 AM",
        unread: 2,
        messages: [
            { id: 1, sender: "them", text: "Hello James! Thanks for choosing RideX.", time: "10:28 AM" },
            { id: 2, sender: "me", text: "Hi! Just double checking the pickup location.", time: "10:29 AM" },
            { id: 3, sender: "them", text: "It's at the main airport terminal, Gate 4.", time: "10:30 AM" },
            { id: 4, sender: "them", text: "Your booking is confirmed! See you at 10 AM.", time: "10:30 AM" }
        ]
    },
    {
        id: 2,
        user: {
            name: "Michael Chen",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
            status: "offline"
        },
        vehicle: "Superbike 3",
        lastMessage: "Is the helmet included?",
        time: "Yesterday",
        unread: 0,
        messages: [
            { id: 1, sender: "me", text: "Hi Michael, is the helmet included in the rental?", time: "4:00 PM" },
            { id: 2, sender: "them", text: "Yes, we provide a DOT certified helmet.", time: "4:15 PM" }
        ]
    },
    {
        id: 3,
        user: {
            name: "Sarah Jones",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
            status: "online"
        },
        vehicle: "Luxury SUV",
        lastMessage: "Great, thanks!",
        time: "Yesterday",
        unread: 0,
        messages: [
            { id: 1, sender: "them", text: "The SUV is ready for your trip.", time: "11:00 AM" },
            { id: 2, sender: "me", text: "Great, thanks!", time: "11:05 AM" }
        ]
    }
];
