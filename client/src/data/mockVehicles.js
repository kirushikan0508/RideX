export const MOCK_VEHICLES = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? `Luxury Car ${i + 1}` : `Superbike ${i + 1}`,
    type: i % 2 === 0 ? 'Luxury' : 'Sport Bike',
    image: i % 2 === 0
        ? 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=2070&auto=format&fit=crop',
    gallery: [
        i % 2 === 0
            ? 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop'
            : 'https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583121274602-3e2820c698d9?q=80&w=2070&auto=format&fit=crop'
    ],
    price: 5000 + (i * 1000),
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 100),
    description: "Experience the ultimate driving machine. This vehicle combines performance, luxury, and style in one package. Perfect for weekend getaways or making a statement at your next event.",
    specs: {
        speed: `${200 + i * 10} km/h`,
        fuel: i % 3 === 0 ? 'Electric' : 'Petrol',
        seats: i % 2 === 0 ? 4 : 1,
        transmission: i % 3 === 0 ? 'Automatic' : 'Manual',
        engine: i % 2 === 0 ? '3.0L Twin Turbo' : '998cc Inline-4',
        power: `${300 + i * 20} HP`
    },
    owner: {
        name: "RideX Fleet",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop",
        joined: "2024"
    },
    location: "Beverly Hills, CA",
    insurance: "Full Coverage Included"
}));
