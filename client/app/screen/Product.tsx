import { View, Text, FlatList, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { COLORS, CATEGORIES } from '@/constants';
import { dummyProducts } from '@/assets/assets';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function Product() {
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { width } = useWindowDimensions();

    // Responsive Grid Logic
    const numColumns = width < 640 ? 2 : width < 1024 ? 3 : 4;
    const itemWidth = `${(100 / numColumns) - 1.5}%`;

    const filteredProducts = selectedCategory === "All"
        ? dummyProducts
        : dummyProducts.filter(p => {
            const catName = typeof p.category === 'string' ? p.category : p.category.name;
            return catName === selectedCategory;
        });

    const uiCategories = [{ id: 'all', name: 'All' }, ...CATEGORIES];

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Header showMenu showCart showSearch title="Our Products" />

            <View className="flex-1">
                {/* Horizontal Category Filter */}
                <View className="py-2 border-b border-gray-50">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 10 }}
                    >
                        {uiCategories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => setSelectedCategory(cat.name)}
                                className={`px-6 py-3.5 rounded-2xl border shadow-sm ${selectedCategory === cat.name
                                    ? "bg-black border-black"
                                    : "bg-white border-gray-100"
                                    }`}
                            >
                                <Text className={`font-black text-[10px] uppercase tracking-[2px] ${selectedCategory === cat.name ? "text-white" : "text-gray-400"
                                    }`}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Product Stats & Header */}
                <View className="px-5 py-6 flex-row justify-between items-center">
                    <View className="flex-1">
                        <Text className="text-3xl font-black text-gray-900 leading-none">
                            {selectedCategory}
                        </Text>
                        <View className="flex-row items-center mt-2">
                            <View className="h-[3px] w-8 bg-black mr-3" />
                            <Text className="text-gray-400 font-extrabold text-[10px] uppercase tracking-[3px]">
                                {filteredProducts.length} Products
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity className="flex-row items-center bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl shadow-sm active:bg-gray-100">
                        <Ionicons name="options-outline" size={18} color={COLORS.primary} />
                        <Text className="ml-2 text-black font-black text-[11px] uppercase tracking-widest">Filter</Text>
                    </TouchableOpacity>
                </View>

                {/* Product Grid */}
                <FlatList
                    data={filteredProducts}
                    key={numColumns}
                    keyExtractor={(item) => item._id}
                    numColumns={numColumns}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12 }}
                    contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
                    showsVerticalScrollIndicator={true}
                    persistentScrollbar={true}
                    renderItem={({ item }) => (
                        <View style={{ width: itemWidth as any, marginBottom: 8 }}>
                            <ProductCard
                                item={item}
                                onAddToCart={(product, qty, size) => addToCart(product, qty, size)}
                            />
                        </View>
                    )}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center pt-20">
                            <Ionicons name="search-outline" size={60} color="#E5E7EB" />
                            <Text className="text-gray-400 font-bold mt-4">No products found in this category</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}