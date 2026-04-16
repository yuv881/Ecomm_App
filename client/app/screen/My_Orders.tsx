import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { COLORS, MOCK_ORDERS, getStatusColor } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { formatDate } from '@/assets/assets'

export default function My_Orders() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Header showBack title="My Orders" />
            
            <FlatList
                data={MOCK_ORDERS}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View className="mb-6 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        {/* Order Header */}
                        <View className="px-5 py-4 bg-gray-50 flex-row justify-between items-center border-b border-gray-100">
                            <View>
                                <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</Text>
                                <Text className="font-black text-gray-900">{item.orderNumber}</Text>
                            </View>
                            <View className={`px-4 py-2 rounded-full ${getStatusColor(item.orderStatus)}`}>
                                <Text className="text-[9px] font-black uppercase tracking-widest">{item.orderStatus}</Text>
                            </View>
                        </View>

                        {/* Order Items Summary */}
                        <View className="p-5">
                            {item.items.map((prod, idx) => (
                                <View key={idx} className="flex-row items-center mb-4 last:mb-0">
                                    <Image source={{ uri: prod.image }} className="w-16 h-16 rounded-2xl bg-gray-50" />
                                    <View className="ml-4 flex-1">
                                        <Text className="font-bold text-gray-900" numberOfLines={1}>{prod.name}</Text>
                                        <Text className="text-gray-400 text-xs mt-1">Qty: {prod.quantity} • Size: {prod.size}</Text>
                                    </View>
                                    <Text className="font-black text-gray-900">${prod.price}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Order Footer */}
                        <View className="px-5 py-4 border-t border-gray-50 flex-row justify-between items-center">
                            <View>
                                <Text className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Ordered On</Text>
                                <Text className="text-gray-900 font-bold text-xs">{formatDate(item.createdAt)}</Text>
                            </View>
                            <View className="items-end">
                                <Text className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Total Amount</Text>
                                <Text className="text-xl font-black text-gray-900">${item.totalAmount}</Text>
                            </View>
                        </View>
                        
                        <TouchableOpacity className="mx-5 mb-5 py-4 bg-black rounded-2xl items-center justify-center">
                            <Text className="text-white text-[10px] font-black uppercase tracking-[2px]">View Details</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center pt-20">
                        <Ionicons name="receipt-outline" size={60} color="#E5E7EB" />
                        <Text className="text-gray-400 font-bold mt-4">You haven't placed any orders yet</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}