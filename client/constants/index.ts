export const COLORS = {
    primary: "#111111",
    secondary: "#666666",
    background: "#FFFFFF",
    surface: "#F7F7F7",
    accent: "#FF4C3B",
    border: "#EEEEEE",
    error: "#FF4444",
};

export const CATEGORIES = [
    { id: 1, name: "Men", icon: "man-outline" },
    { id: 2, name: "Women", icon: "woman-outline" },
    { id: 3, name: "Kids", icon: "happy-outline" },
    { id: 4, name: "Shoes", icon: "footsteps-outline" },
    { id: 5, name: "Bag", icon: "briefcase-outline" },
    { id: 6, name: "Other", icon: "grid-outline" },
];

export const PROFILE_MENU = [
    { id: 1, title: "My Orders", icon: "receipt-outline", route: "/orders" },
    { id: 2, title: "Shipping Addresses", icon: "location-outline", route: "/addresses" },
    { id: 4, title: "My Reviews", icon: "star-outline", route: "/" },
    { id: 5, title: "Settings", icon: "settings-outline", route: "/" },
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
        description: "Comfortable and stylish skinny jeans for everyday wear.",
        price: 49.99,
        images: ["https://images.unsplash.com/photo-1541099649105-f6d8c35c816e?w=500"],
        category: "Women",
        sizes: ["S", "M", "L", "XL"],
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
            return "bg-green-50 text-green-900";
        case "cancelled":
            return "bg-red-50 text-red-900";
        default:
            return "bg-gray-50 text-gray-900";
    }
};
