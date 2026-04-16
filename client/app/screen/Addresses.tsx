import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';

export default function Addresses() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Header showBack title="My Addresses" />
            <ScrollView className="p-6">
                <View className="bg-gray-50 p-6 rounded-3xl border border-black mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="bg-black px-3 py-1 rounded-full">
                            <Text className="text-white text-[8px] font-black uppercase tracking-widest">Default</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="create-outline" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text className="font-black text-gray-900 text-lg">Work Office</Text>
                    <Text className="text-gray-500 mt-2 leading-5 font-medium">
                        4598 Market Street, Suite 210{"\n"}
                        San Francisco, CA 94103{"\n"}
                        United States
                    </Text>
                </View>

                <TouchableOpacity className="flex-row items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-3xl">
                    <Ionicons name="add" size={24} color="gray" />
                    <Text className="ml-2 text-gray-400 font-bold uppercase tracking-widest text-xs">Add New Address</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
