import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import { COLORS } from '@/constants';
import Toast from 'react-native-toast-message';

export default function Checkout() {
    const { cart, totalAmount, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    const shippingFee = 10;
    const tax = totalAmount * 0.08;
    const grandTotal = totalAmount + shippingFee + tax;

    const handlePlaceOrder = () => {
        setStep(3);
        clearCart();
        Toast.show({
            type: 'success',
            text1: 'Order Placed!',
            text2: 'Your order has been successfully placed.',
        });
    };

    if (step === 3) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center px-10">
                <View className="bg-green-50 p-10 rounded-full mb-8">
                    <Ionicons name="checkmark-circle" size={100} color="#10B981" />
                </View>
                <Text className="text-3xl font-black text-gray-900 mb-4 text-center">Thank You!</Text>
                <Text className="text-gray-500 text-center mb-10 leading-6">
                    Your order #ANT-9923 has been placed and is being processed. You will receive an email confirmation shortly.
                </Text>
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)')}
                    className="w-full bg-black py-5 rounded-3xl items-center shadow-lg"
                    style={{ backgroundColor: COLORS.primary }}
                >
                    <Text className="text-white font-black uppercase tracking-widest">Continue Shopping</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.push('/screen/My_Orders')}
                    className="mt-6"
                >
                    <Text className="text-gray-900 font-black uppercase tracking-widest underline">Track My Order</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <Header showBack title="Checkout" />
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
                {/* Progress Bar */}
                <View className="flex-row items-center justify-between mb-10">
                    <View className="items-center">
                        <View className={`w-10 h-10 rounded-full items-center justify-center ${step >= 1 ? 'bg-black' : 'bg-gray-100'}`}>
                            <Text className={`font-black ${step >= 1 ? 'text-white' : 'text-gray-400'}`}>1</Text>
                        </View>
                        <Text className="text-[9px] font-black uppercase tracking-widest mt-2">Shipping</Text>
                    </View>
                    <View className="flex-1 h-[2px] bg-gray-100 mx-4" />
                    <View className="items-center">
                        <View className={`w-10 h-10 rounded-full items-center justify-center ${step >= 2 ? 'bg-black' : 'bg-gray-100'}`}>
                            <Text className={`font-black ${step >= 2 ? 'text-white' : 'text-gray-400'}`}>2</Text>
                        </View>
                        <Text className="text-[9px] font-black uppercase tracking-widest mt-2">Payment</Text>
                    </View>
                </View>

                {step === 1 ? (
                    <View>
                        <Text className="text-xl font-black text-gray-900 mb-6">Shipping Address</Text>
                        <View className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-4">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="font-black text-gray-900 uppercase text-[10px] tracking-widest">Home Address</Text>
                                <Ionicons name="location" size={18} color="black" />
                            </View>
                            <Text className="font-bold text-gray-800">Yuvraj Singh</Text>
                            <Text className="text-gray-500 mt-2 leading-5">
                                4598 Market Street, Suite 210{"\n"}
                                San Francisco, CA 94103{"\n"}
                                United States
                            </Text>
                        </View>
                        <TouchableOpacity className="flex-row items-center justify-center py-4 rounded-2xl border-2 border-dashed border-gray-200">
                            <Ionicons name="add" size={20} color="gray" />
                            <Text className="ml-2 text-gray-400 font-bold">Add New Address</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text className="text-xl font-black text-gray-900 mb-6">Payment Method</Text>
                        <View className="bg-black p-6 rounded-3xl mb-4 shadow-xl">
                            <View className="flex-row justify-between items-center mb-10">
                                <Ionicons name="card" size={32} color="white" />
                                <Text className="text-white font-black italic tracking-tighter">VISA</Text>
                            </View>
                            <Text className="text-white text-xl font-black tracking-[4px] mb-6">**** **** **** 4598</Text>
                            <View className="flex-row justify-between">
                                <View>
                                    <Text className="text-gray-400 text-[10px] uppercase font-black">Card Holder</Text>
                                    <Text className="text-white font-bold uppercase">Yuvraj Singh</Text>
                                </View>
                                <View className="items-end">
                                    <Text className="text-gray-400 text-[10px] uppercase font-black">Expires</Text>
                                    <Text className="text-white font-bold">12/28</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity className="flex-row items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <Ionicons name="logo-apple" size={20} color="black" />
                            <Text className="ml-4 font-black text-gray-900">Apple Pay</Text>
                            <Ionicons name="checkmark-circle" size={20} color="#10B981" className="ml-auto" style={{ marginLeft: 'auto' }} />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Order Summary */}
                <View className="mt-10">
                    <Text className="text-xl font-black text-gray-900 mb-6">Order Summary</Text>
                    <View className="gap-4">
                        <View className="flex-row justify-between">
                            <Text className="text-gray-500 font-medium">Subtotal</Text>
                            <Text className="text-gray-900 font-black">${totalAmount.toFixed(2)}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-500 font-medium">Shipping Fee</Text>
                            <Text className="text-gray-900 font-black">${shippingFee.toFixed(2)}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-500 font-medium">Tax (8%)</Text>
                            <Text className="text-gray-900 font-black">${tax.toFixed(2)}</Text>
                        </View>
                        <View className="h-[1px] bg-gray-100 my-2" />
                        <View className="flex-row justify-between">
                            <Text className="text-lg font-black text-gray-900">Total</Text>
                            <Text className="text-2xl font-black text-gray-900">${grandTotal.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-50">
                <TouchableOpacity
                    onPress={() => step === 1 ? setStep(2) : handlePlaceOrder()}
                    className="w-full bg-black py-5 rounded-3xl items-center shadow-lg active:scale-95"
                    style={{ backgroundColor: COLORS.primary }}
                >
                    <Text className="text-white font-black uppercase tracking-widest">
                        {step === 1 ? 'Continue to Payment' : 'Place Order'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
