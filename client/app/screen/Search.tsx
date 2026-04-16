import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { dummyProducts } from '@/assets/assets';
import { COLORS } from '@/constants';
import Header from '@/components/Header';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const filteredProducts = searchQuery.trim() === '' 
        ? [] 
        : dummyProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (typeof p.category === 'string' ? p.category : p.category.name).toLowerCase().includes(searchQuery.toLowerCase())
        );

    const trendingSearches = ['Hoodie', 'Leather Jacket', 'Running Shoes', 'Summer Dress', 'Denim'];

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View className="px-6 py-4 flex-row items-center gap-4 border-b border-gray-50">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View className="flex-1 bg-gray-50 flex-row items-center px-4 py-3 rounded-2xl border border-gray-100">
                    <Ionicons name="search-outline" size={20} color="gray" />
                    <TextInput
                        className="flex-1 ml-3 font-bold text-gray-900"
                        placeholder="Search products, brands..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={18} color="gray" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {searchQuery.trim() === '' ? (
                <View className="p-6">
                    <Text className="text-[11px] font-black text-gray-400 uppercase tracking-[2px] mb-6">Trending Searches</Text>
                    <View className="flex-row flex-wrap gap-3">
                        {trendingSearches.map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setSearchQuery(item)}
                                className="bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100"
                            >
                                <Text className="text-gray-900 font-bold text-xs">{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="mt-12 items-center justify-center opacity-30">
                        <Ionicons name="search" size={100} color="#E5E7EB" />
                        <Text className="text-gray-400 font-black mt-4 uppercase tracking-widest text-xs">Find your style</Text>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => router.push({ pathname: '/screen/ProductDetail' as any, params: { id: item._id } })}
                            className="flex-row items-center mb-6"
                        >
                            <Image source={{ uri: item.images[0] }} className="w-20 h-20 rounded-2xl bg-gray-50" />
                            <View className="ml-4 flex-1">
                                <Text className="font-black text-gray-900 text-base">{item.name}</Text>
                                <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                                    {typeof item.category === 'string' ? item.category : item.category.name}
                                </Text>
                                <Text className="text-black font-black mt-2">${item.price}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#E5E7EB" />
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center pt-20">
                            <Text className="text-gray-400 font-bold">No results found for "{searchQuery}"</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}
