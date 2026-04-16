import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import CartItem from '@/components/CartItem';
import { COLORS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Cart() {
  const { cart, totalAmount, updateQuantity, removeFromCart, itemCount } = useCart();
  const router = useRouter();

  const renderEmptyCart = () => (
    <View className="flex-1 items-center justify-center p-10">
      <View className="h-40 w-40 items-center justify-center rounded-full bg-gray-50 mb-6">
        <Ionicons name="cart-outline" size={80} color="#CBD5E1" />
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</Text>
      <Text className="text-center text-gray-500 mb-8">
        Looks like you haven't added anything to your cart yet.
      </Text>
      <TouchableOpacity
        onPress={() => router.push('/(tabs)')}
        className="w-full bg-primary py-4 rounded-2xl items-center"
        style={{ backgroundColor: COLORS.primary }}
      >
        <Text className="text-white font-bold text-lg">Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]" edges={['top']}>
      <Header title="My Cart" showBack />

      {cart.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => `${item.product._id}-${item.size}`}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            )}
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />

          {/* Checkout Summary */}
          <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4 shadow-xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-gray-500 text-base">Total ({itemCount} items)</Text>
              <Text className="text-2xl font-bold text-gray-800">${totalAmount.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/screen/Checkout' as any)}
              className="w-full py-5 rounded-3xl flex-row items-center justify-center shadow-lg active:scale-95 transition-all"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Text className="text-white font-black uppercase tracking-widest mr-2">Proceed to Checkout</Text>
              <Ionicons name="arrow-forward" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}