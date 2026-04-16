import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

export default function Settings() {
    const router = useRouter();
    
    const settingsOptions = [
        { title: 'Push Notifications', icon: 'notifications-outline', value: 'On' },
        { title: 'Email Updates', icon: 'mail-outline', value: 'Off' },
        { title: 'Dark Mode', icon: 'moon-outline', value: 'System' },
        { title: 'Currency', icon: 'cash-outline', value: 'USD' },
        { title: 'Language', icon: 'globe-outline', value: 'English' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Header showBack title="Settings" />
            <ScrollView className="p-6">
                <View className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                    {settingsOptions.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            className={`flex-row items-center justify-between p-5 ${index !== settingsOptions.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                            <View className="flex-row items-center gap-4">
                                <View className="bg-white p-2 rounded-xl">
                                    <Ionicons name={item.icon as any} size={20} color="black" />
                                </View>
                                <Text className="font-bold text-gray-900">{item.title}</Text>
                            </View>
                            <Text className="text-gray-400 font-bold text-xs uppercase tracking-widest">{item.value}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity className="mt-10 bg-red-50 p-5 rounded-3xl border border-red-100 items-center">
                    <Text className="text-red-500 font-black uppercase tracking-widest text-xs">Delete Account</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
