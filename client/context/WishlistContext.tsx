import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/constants/types';

interface WishlistContextType {
    wishlist: Product[];
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load wishlist on mount
    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = async () => {
        try {
            const savedWishlist = await AsyncStorage.getItem('wishlist');
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        } catch (error) {
            console.error('Error loading wishlist:', error);
        }
    };

    const saveWishlist = async (newWishlist: Product[]) => {
        try {
            await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
        } catch (error) {
            console.error('Error saving wishlist:', error);
        }
    };

    const toggleWishlist = (product: Product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item._id === product._id);
            let next;
            if (exists) {
                next = prev.filter(item => item._id !== product._id);
            } else {
                next = [...prev, product];
            }
            saveWishlist(next);
            return next;
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some(item => item._id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
        AsyncStorage.removeItem('wishlist');
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
