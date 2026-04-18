import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';
import { COLORS, PROFILE_MENU } from '@/constants';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
            <Header title="My Profile" showCart={true} showMenu={true} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Profile Header */}
                <View className="items-center py-10 px-5">
                    <View className="relative">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
                            className="w-28 h-28 rounded-full border-4 border-gray-50"
                        />
                        <TouchableOpacity
                            className="absolute bottom-0 right-0 bg-black p-2 rounded-full border-4 border-white shadow-lg"
                        >
                            <Ionicons name="camera" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-2xl font-black text-gray-900 mt-5">Yuvraj Singh</Text>
                    <Text className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Premium Member</Text>
                </View>

                {/* Account Menu Section */}
                <View className="px-5">
                    <Text className="text-[11px] font-black text-gray-600 uppercase tracking-[2px] mb-4 ml-1">
                        Account Settings
                    </Text>

                    <View className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                        {PROFILE_MENU.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => router.push(item.route as any)}
                                className={`flex-row items-center justify-between py-3.5 px-5 active:bg-gray-100 ${index !== PROFILE_MENU.length - 1 ? 'border-b border-gray-100' : ''}`}
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="bg-white p-2.5 rounded-xl shadow-sm">
                                        <Ionicons name={item.icon as any} size={20} color="#111" />
                                    </View>
                                    <Text className="text-gray-900 font-bold text-sm">{item.title}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color="#888" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* More Options Section */}
                <View className="px-5 mt-8">
                    <Text className="text-[11px] font-black text-gray-600 uppercase tracking-[2px] mb-4 ml-1">
                        Preferences
                    </Text>

                    <View className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                        <TouchableOpacity className="flex-row items-center justify-between py-3.5 px-5 border-b border-gray-100 active:bg-gray-100">
                            <View className="flex-row items-center gap-4">
                                <View className="bg-white p-2.5 rounded-xl shadow-sm">
                                    <Ionicons name="notifications-outline" size={20} color="#111" />
                                </View>
                                <Text className="text-gray-900 font-bold text-sm">Notifications</Text>
                            </View>
                            <View className="bg-green-500 px-2 py-0.5 rounded-full">
                                <Text className="text-[8px] font-black text-white">ON</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center justify-between py-3.5 px-5 active:bg-gray-100">
                            <View className="flex-row items-center gap-4">
                                <View className="bg-white p-2.5 rounded-xl shadow-sm">
                                    <Ionicons name="shield-checkmark-outline" size={20} color="#111" />
                                </View>
                                <Text className="text-gray-900 font-bold text-sm">Privacy & Security</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#888" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    className="mx-5 mt-14 items-center justify-center py-5 rounded-3xl border-2 border-red-50 bg-red-50/20 active:bg-red-50/40"
                >
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
                        <Text className="text-red-500 font-black text-[13px] uppercase tracking-widest">Logout Account</Text>
                    </View>
                </TouchableOpacity>

                {/* App Version Info */}
                <Text className="text-center text-gray-500 font-extrabold text-[9px] mt-10 uppercase tracking-widest leading-loose">
                    Antigravity E-Commerce • Version 1.0.4{"\n"}
                    Made with ❤️ in California
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}