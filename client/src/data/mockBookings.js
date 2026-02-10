export const MOCK_BOOKINGS = [
    {
        id: 'BK-7829',
        vehicle: {
            name: "Luxury Car 1",
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
            type: "Luxury"
        },
        dates: {
            pickup: "Oct 15, 2026",
            return: "Oct 18, 2026"
        },
        status: "active",
        cost: 15000,
        days: 3
    },
    {
        id: 'BK-5521',
        vehicle: {
            name: "Superbike 3",
            image: "https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=2070&auto=format&fit=crop",
            type: "Sport Bike"
        },
        dates: {
            pickup: "Sep 10, 2026",
            return: "Sep 12, 2026"
        },
        status: "completed",
        cost: 8000,
        days: 2
    },
    {
        id: 'BK-4490',
        vehicle: {
            name: "Luxury SUV",
            image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1000&auto=format&fit=crop",
            type: "SUV"
        },
        dates: {
            pickup: "Aug 05, 2026",
            return: "Aug 07, 2026"
        },
        status: "cancelled",
        cost: 12000,
        days: 2
    }
];
