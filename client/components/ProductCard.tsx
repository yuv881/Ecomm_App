import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants";
import { Product } from "@/constants/types";
import { useWishlist } from "@/context/WishlistContext";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
  item: Product;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
}

export default function ProductCard({ item, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0] || "S");
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(item._id);

  return (
    <View className="mb-2 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <View>
        <Image
          source={{ uri: item.images[0] }}
          className="h-64 w-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => toggleWishlist(item)}
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md"
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={18}
            color={isFavorite ? COLORS.accent : "#333"}
          />
        </TouchableOpacity>
      </View>
      <View className="p-1.5 flex flex-col gap-1">
        <Text className="text-[16px] font-bold text-gray-900" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-[14px] text-gray-500 font-semibold">${item.price}</Text>

        {/* size selection chips */}
        <View className="flex-row flex-wrap gap-0.5 my-1">
          {item.sizes?.slice(0, 3).map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              className={`px-2 py-1 rounded-xl border ${selectedSize === size ? "bg-black border-black" : "bg-white border-gray-100"}`}
            >
              <Text className={` text-[12px] font-semibold ${selectedSize === size ? "text-white" : "text-gray-400"}`}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => onAddToCart(item, 1, selectedSize)}
          className="rounded-md items-center py-2"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Text className="text-[12px] text-white font-semibold uppercase">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
