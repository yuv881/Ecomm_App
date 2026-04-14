import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants";
import { Product } from "@/constants/types";

interface ProductCardProps {
  item: Product;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
}

export default function ProductCard({ item, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0] || "S");

  return (
    <View className="mb-4 bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <Image
        source={{ uri: item.images[0] }}
        className="h-40 w-full"
        resizeMode="cover"
      />
      <View className="p-2">
        <Text className="text-xs font-bold text-gray-800" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-xs text-gray-500 mb-2">${item.price}</Text>

        {/* Size Selection Chips */}
        <View className="flex-row flex-wrap gap-1 mb-3">
          {item.sizes?.map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              className={`px-4 py-2 w-max items-center justify-center rounded-full border ${selectedSize === size
                ? "bg-black border-black"
                : "bg-white border-gray-200"
                }`}
            >
              <Text
                className={`text-[9px] font-bold ${selectedSize === size ? "text-white" : "text-gray-600"
                  }`}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => onAddToCart(item, 1, selectedSize)}
          className="rounded-lg items-center py-2"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Text className="text-[10px] text-white font-bold">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
