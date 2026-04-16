import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { dummyProducts } from '@/assets/assets';
import { COLORS } from '@/constants';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Toast from 'react-native-toast-message';

export default function ProductDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { width } = useWindowDimensions();

    const product = dummyProducts.find(p => p._id === id);
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'S');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    if (!product) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <Text className="text-gray-500 font-bold">Product not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4">
                    <Text className="text-black font-black uppercase tracking-widest underline">Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedSize);
        Toast.show({
            type: 'success',
            text1: 'Added to Cart',
            text2: `${product.name} (${selectedSize}) added to your cart`,
        });
    };

    const isFavorite = isInWishlist(product._id);

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Header showBack showCart title="Product Details" />
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Image Gallery */}
                <View className="relative">
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(e) => {
                            const slide = Math.round(e.nativeEvent.contentOffset.x / width);
                            if (slide !== activeImage) setActiveImage(slide);
                        }}
                    >
                        {product.images.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={{ width, height: 450 }}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>
                    
                    {/* Image Indicators */}
                    {product.images.length > 1 && (
                        <View className="absolute bottom-6 w-full flex-row justify-center gap-2">
                            {product.images.map((_, index) => (
                                <View
                                    key={index}
                                    className={`h-1.5 rounded-full ${activeImage === index ? 'w-8 bg-black' : 'w-1.5 bg-gray-300'}`}
                                />
                            ))}
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => toggleWishlist(product)}
                        className="absolute bottom-6 right-6 bg-white p-4 rounded-full shadow-xl"
                    >
                        <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={24}
                            color={isFavorite ? COLORS.accent : "#333"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Product Info */}
                <View className="px-6 py-8">
                    <View className="flex-row justify-between items-start mb-2">
                        <View className="flex-1 mr-4">
                            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-2">
                                {typeof product.category === 'string' ? product.category : product.category.name}
                            </Text>
                            <Text className="text-3xl font-black text-gray-900 leading-tight">
                                {product.name}
                            </Text>
                        </View>
                        <Text className="text-2xl font-black text-gray-900">${product.price}</Text>
                    </View>

                    <View className="flex-row items-center mb-6">
                        <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            <Ionicons name="star" size={14} color="#F59E0B" />
                            <Text className="ml-1 text-yellow-900 font-bold text-xs">{product.ratings.average}</Text>
                        </View>
                        <Text className="ml-3 text-gray-400 font-bold text-xs">({product.ratings.count} Reviews)</Text>
                    </View>

                    <Text className="text-gray-500 leading-7 font-medium mb-10">
                        {product.description}
                    </Text>

                    {/* Size Selection */}
                    <View className="mb-8">
                        <Text className="text-[11px] font-black text-gray-900 uppercase tracking-[2px] mb-4">
                            Select Size
                        </Text>
                        <View className="flex-row flex-wrap gap-3">
                            {product.sizes?.map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    onPress={() => setSelectedSize(size)}
                                    className={`w-14 h-14 items-center justify-center rounded-2xl border-2 ${
                                        selectedSize === size ? "bg-black border-black" : "bg-white border-gray-100"
                                    }`}
                                >
                                    <Text className={`font-black ${selectedSize === size ? "text-white" : "text-gray-500"}`}>
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Quantity Selector */}
                    <View className="mb-10">
                        <Text className="text-[11px] font-black text-gray-900 uppercase tracking-[2px] mb-4">
                            Quantity
                        </Text>
                        <View className="flex-row items-center bg-gray-50 self-start p-2 rounded-2xl border border-gray-100">
                            <TouchableOpacity
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 items-center justify-center bg-white rounded-xl shadow-sm"
                            >
                                <Ionicons name="remove" size={20} color="black" />
                            </TouchableOpacity>
                            <Text className="mx-6 font-black text-lg">{quantity}</Text>
                            <TouchableOpacity
                                onPress={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 items-center justify-center bg-white rounded-xl shadow-sm"
                            >
                                <Ionicons name="add" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Add to Cart Section */}
            <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-6 border-t border-gray-50 flex-row gap-4 items-center shadow-2xl">
                <TouchableOpacity
                    onPress={handleAddToCart}
                    className="flex-1 bg-black py-5 rounded-3xl flex-row items-center justify-center shadow-lg active:scale-95 transition-all"
                    style={{ backgroundColor: COLORS.primary }}
                >
                    <Ionicons name="cart-outline" size={20} color="white" className="mr-2" />
                    <Text className="text-white font-black uppercase tracking-widest ml-2">Add to Cart</Text>
                </TouchableOpacity>
                <View className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
                    <Ionicons name="chatbubble-outline" size={20} color="black" />
                </View>
            </View>
        </SafeAreaView>
    );
}
