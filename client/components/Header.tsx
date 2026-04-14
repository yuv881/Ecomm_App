import { TouchableOpacity, View, Image, Text } from "react-native";
import React from "react";
import { HeaderProps } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { useRouter } from "expo-router";
import { useCart } from "@/context/CartContext";

export default function Header({
  title,
  showBack,
  showSearch,
  showCart,
  showMenu,
  showLogo,
}: HeaderProps) {

  const router = useRouter();
  const { itemCount } = useCart();

  return (
    <View className="relative flex h-16 flex-row items-center justify-between bg-white px-4">
      {/* section: Back button or Menu */}
      <View className="z-10 flex-row items-center">
        {showBack && (
          <TouchableOpacity className="mr-3" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        {showMenu && (
          <TouchableOpacity className="mr-3">
            <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center section: Logo or Title */}
      <View className="absolute inset-x-0 items-center justify-center" pointerEvents="none">
        {showLogo ? (
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 150, height: 40 }}
            resizeMode="contain"
          />
        ) : title && (
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
        )}
      </View>

      {/* Right section: Search and Cart */}
      <View className="z-10 flex-row items-center gap-2">
        {showSearch && (
          <TouchableOpacity className="p-2">
            <Ionicons name="search-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        {showCart && (
          <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} className="p-2">
            <View className="relative">
              <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
              <View className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full bg-red-500">
                <Text className="text-[10px] font-bold text-white">{itemCount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
