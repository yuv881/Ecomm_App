import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants';
import { CartItem as CartItemType } from '@/constants/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemove: (productId: string, size: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity, size } = item;

  return (
    <View className="flex-row items-center bg-white p-4 mb-3 rounded-2xl shadow-sm">
      {/* Product Image */}
      <View className="h-20 w-20 bg-gray-100 rounded-xl overflow-hidden">
        <Image
          source={{ uri: product.images[0] }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      {/* Product Details */}
      <View className="flex-1 ml-4">
        <Text className="text-base font-bold text-gray-800" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-sm text-gray-500 mb-1">
          Size: {size}
        </Text>
        <Text className="text-lg font-bold text-primary" style={{ color: COLORS.primary }}>
          ${product.price.toFixed(2)}
        </Text>

        {/* Quantity Controls */}
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => onUpdateQuantity(product._id, size, quantity - 1)}
            className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
          >
            <Ionicons name="remove" size={18} color="black" />
          </TouchableOpacity>
          
          <Text className="mx-4 text-base font-bold">{quantity}</Text>

          <TouchableOpacity
            onPress={() => onUpdateQuantity(product._id, size, quantity + 1)}
            className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
          >
            <Ionicons name="add" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Remove Button */}
      <TouchableOpacity
        onPress={() => onRemove(product._id, size)}
        className="p-2"
      >
        <Ionicons name="trash-outline" size={24} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
}
