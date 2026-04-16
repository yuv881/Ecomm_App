export const COLORS = {
    primary: "#111111",
    secondary: "#666666",
    background: "#FFFFFF",
    surface: "#F7F7F7",
    accent: "#FF4C3B",
    border: "#EEEEEE",
    error: "#FF4444",
};

export const PAGES = [
    { id: 1, name: "Home", icon: "home-outline", route: "/(tabs)" },
    { id: 2, name: "Shop All", icon: "grid-outline", route: "/screen/Product" },
    { id: 3, name: "My Account", icon: "person-outline", route: "/screen/Account" },
    { id: 4, name: "Support", icon: "help-buoy-outline", route: "/screen/Support" },
];

export const CATEGORIES = [
    { id: 1, name: "Men", icon: "man-outline", route: "/screen/Product" },
    { id: 2, name: "Women", icon: "woman-outline", route: "/screen/Product" },
    { id: 3, name: "Kids", icon: "happy-outline", route: "/screen/Product" },
    { id: 4, name: "Shoes", icon: "footsteps-outline", route: "/screen/Product" },
    { id: 5, name: "Bag", icon: "briefcase-outline", route: "/screen/Product" },
    { id: 6, name: "Other", icon: "grid-outline", route: "/screen/Product" },
];

export const PROFILE_MENU = [
    { id: 1, title: "My Orders", icon: "receipt-outline", route: "/screen/My_Orders" },
    { id: 2, title: "Shipping Addresses", icon: "location-outline", route: "/screen/Addresses" },
    { id: 4, title: "My Reviews", icon: "star-outline", route: "/screen/Reviews" },
    { id: 5, title: "Settings", icon: "settings-outline", route: "/screen/Settings" },
];

export const MOCK_PRODUCTS = [
    {
        _id: "1",
        name: "Classic Leather Jacket",
        description: "A premium quality leather jacket for a timeless look.",
        price: 129.99,
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        stock: 10,
        ratings: { average: 4.5, count: 120 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        _id: "2",
        name: "Denim Skinny Jeans",
        description: "Premium stretch denim with a modern skinny fit.",
        price: 59.99,
        images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500"],
        category: "Women",
        sizes: ["28", "30", "32", "34"],
        stock: 25,
        ratings: { average: 4.2, count: 85 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        _id: "3",
        name: "Canvas Backpack",
        description: "Durable canvas backpack perfect for students and travelers.",
        price: 34.99,
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"],
        category: "Bag",
        sizes: ["S", "M", "L", "XL"],
        stock: 15,
        ratings: { average: 4.8, count: 210 },
        isFeatured: false,
        isActive: true,
        createdAt: new Date().toISOString(),
    },
    {
        _id: "4",
        name: "Minimalist Sneakers",
        description: "Clean, versatile sneakers for effortless style.",
        price: 89.99,
        images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500"],
        category: "Shoes",
        sizes: ["40", "41", "42", "43"],
        stock: 12,
        ratings: { average: 4.6, count: 180 },
        isFeatured: true,
        isActive: true,
        createdAt: new Date().toISOString(),
    },
];


export const MOCK_ORDERS = [
    {
        _id: "ORD001",
        orderNumber: "ANT-7721-09",
        createdAt: "2026-04-10T10:30:00Z",
        totalAmount: 184.99,
        orderStatus: "delivered",
        items: [
            { name: "Classic Leather Jacket", quantity: 1, price: 129.99, size: "L", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200" },
            { name: "Summer Dress", quantity: 1, price: 55, size: "M", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=200" }
        ]
    },
    {
        _id: "ORD002",
        orderNumber: "ANT-8823-14",
        createdAt: "2026-04-15T14:20:00Z",
        totalAmount: 79.99,
        orderStatus: "processing",
        items: [
            { name: "Running Shoes", quantity: 1, price: 79.99, size: "9", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200" }
        ]
    }
];

export const getStatusColor = (status: string) => {
    switch (status) {
        case "placed":
            return "bg-yellow-50 text-yellow-900";
        case "processing":
            return "bg-indigo-50 text-indigo-900";
        case "shipped":
            return "bg-purple-50 text-purple-900";
        case "delivered":
            return "bg-green-50 text-green-900 font-bold";
        case "cancelled":
            return "bg-red-50 text-red-900 font-bold";
        default:
            return "bg-gray-50 text-gray-900";
    }
};
