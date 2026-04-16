import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';

export default function Reviews() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Header showBack title="My Reviews" />
            <ScrollView className="p-6">
                <View className="mb-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <View className="flex-row items-center mb-4">
                        <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200' }} 
                            className="w-16 h-16 rounded-2xl" 
                        />
                        <View className="ml-4 flex-1">
                            <Text className="font-black text-gray-900" numberOfLines={1}>Classic Leather Jacket</Text>
                            <View className="flex-row mt-1">
                                {[1,2,3,4,5].map(i => <Ionicons key={i} name="star" size={12} color="#F59E0B" />)}
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-600 font-medium leading-5 italic">
                        "Amazing quality! The leather feels premium and the fit is perfect. Highly recommend."
                    </Text>
                    <Text className="text-[10px] text-gray-400 font-black mt-4 uppercase tracking-widest">Reviewed on April 12, 2026</Text>
                </View>

                <View className="items-center justify-center opacity-20 mt-10">
                    <Ionicons name="star-outline" size={60} color="#E5E7EB" />
                    <Text className="text-gray-400 font-black mt-4 uppercase tracking-widest text-xs">No more reviews</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
