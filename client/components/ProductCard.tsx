import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants";
import { Product } from "@/constants/types";
import { useWishlist } from "@/context/WishlistContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ProductCardProps {
  item: Product;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
}

export default function ProductCard({ item, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0] || "S");
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(item._id);
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/screen/ProductDetail" as any,
      params: { id: item._id }
    });
  };

  return (
    <View className="mb-4 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex-1">
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress} className="bg-gray-100">
        <Image
          source={{ uri: item.images[0] }}
          className="h-60 w-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => toggleWishlist(item)}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md z-10"
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={18}
            color={isFavorite ? COLORS.accent : "#333"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View className="px-4 py-4 flex-1 flex-col justify-between">
        <TouchableOpacity onPress={handlePress}>
          <View style={{ minHeight: 52 }} className="justify-center">
            <Text className="text-[14px] font-black text-gray-900 leading-tight" numberOfLines={2}>
              {item.name}
            </Text>
            <Text className="text-[14px] text-gray-400 font-bold mt-1">${item.price}</Text>
          </View>
        </TouchableOpacity>

        {/* size selection chips */}
        <View className="flex-row flex-wrap gap-2 my-4">
          {item.sizes?.slice(0, 3).map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              className={`px-3.5 py-1.5 rounded-xl border ${selectedSize === size ? "bg-black border-black" : "bg-white border-gray-100"
                }`}
            >
              <Text className={`text-[11px] font-black ${selectedSize === size ? "text-white" : "text-gray-500"}`}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => onAddToCart(item, 1, selectedSize)}
          className="rounded-2xl items-center py-3.5 active:opacity-80 mt-2 shadow-sm"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Text className="text-[10px] text-white font-black uppercase tracking-[2px]">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

