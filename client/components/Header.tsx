import { TouchableOpacity, View, Image, Text, Modal, Pressable, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import { HeaderProps } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, CATEGORIES, PROFILE_MENU, PAGES } from "@/constants";
import { useRouter } from "expo-router";
import { useCart } from "@/context/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { SlideInLeft, SlideOutLeft, SlideInRight, SlideOutRight, FadeIn, FadeOut } from "react-native-reanimated";

export default function Header({
  title,
  showBack,
  showSearch,
  showCart,
  showMenu,
  showLogo,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const { itemCount, cart, totalAmount, updateQuantity, removeFromCart } = useCart();

  const handleNavigation = (route: string) => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    router.push(route as any);
  };

  return (
    <>
      <View className="h-16 flex-row items-center justify-between bg-white px-4 border-b border-gray-100 z-50">
        {/* section: Back button or Menu */}
        <View className="flex-row items-center z-10">
          {showBack && (
            <TouchableOpacity className="p-2" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          {showMenu && (
            <TouchableOpacity className="p-2" onPress={() => setIsMenuOpen(true)}>
              <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center section: Logo or Title */}
        <View className="absolute inset-0 items-center justify-center z-0" pointerEvents="box-none">
          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            {showLogo ? (
              <Image
                source={require("../assets/images/logo.png")}
                className="w-32 h-9"
                resizeMode="contain"
              />
            ) : title && (
              <Text className="text-lg font-black text-gray-900">{title}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Right section: Search and Cart */}
        <View className="flex-row items-center gap-2 absolute right-4">
          {showSearch && (
            <TouchableOpacity className="p-2" onPress={() => router.push('/screen/Search' as any)}>
              <Ionicons name="search-outline" size={28} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          {showCart && (
            <TouchableOpacity onPress={() => setIsCartOpen(true)} className="p-2">
              <View>
                <Ionicons name="cart-outline" size={28} color={COLORS.primary} />
                {itemCount > 0 && (
                  <View className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-red-500 items-center justify-center">
                    <Text className="text-white text-[9px] font-black">{itemCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Menu Sidebar (Left) */}
      <Modal
        visible={isMenuOpen}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <View className="flex-1">
          <Animated.View entering={FadeIn} exiting={FadeOut} className="absolute inset-0 bg-black/50">
            <Pressable className="flex-1" onPress={() => setIsMenuOpen(false)} />
          </Animated.View>

          <Animated.View
            entering={SlideInLeft.duration(300)}
            exiting={SlideOutLeft.duration(300)}
            className="absolute left-0 top-0 bottom-0 w-[60%] bg-white shadow-xl elevation-5"
          >
            <SafeAreaView className="flex-1">
              <View className="p-6 border-b border-gray-100 flex-row items-center justify-between">
                <Text className="text-xl font-black">Menu</Text>
                <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                  <Ionicons name="close" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="p-6">
                  <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Pages</Text>
                  {PAGES.map((page) => (
                    <TouchableOpacity
                      key={page.id}
                      className="flex-row items-center py-2.5 border-b border-gray-50 mb-1"
                      onPress={() => handleNavigation(page.route)}
                    >
                      <Ionicons name={page.icon as any} size={22} color={COLORS.secondary} />
                      <Text className="ml-4 text-gray-700 font-bold">{page.name}</Text>
                    </TouchableOpacity>
                  ))}

                  <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-8 mb-4">Account</Text>
                  {PROFILE_MENU.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      className="flex-row items-center py-2.5 border-b border-gray-50 mb-1"
                      onPress={() => handleNavigation(item.route)}
                    >
                      <Ionicons name={item.icon as any} size={22} color={COLORS.secondary} />
                      <Text className="ml-4 text-gray-700 font-bold">{item.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>

      {/* Cart Sidebar (Right) */}
      <Modal
        visible={isCartOpen}
        animationType="none"
        transparent={true}
        onRequestClose={() => setIsCartOpen(false)}
      >
        <View className="flex-1">
          <Animated.View entering={FadeIn} exiting={FadeOut} className="absolute inset-0 bg-black/50">
            <Pressable className="flex-1" onPress={() => setIsCartOpen(false)} />
          </Animated.View>

          <Animated.View
            entering={SlideInRight.duration(300)}
            exiting={SlideOutRight.duration(300)}
            className="absolute right-0 top-0 bottom-0 w-[80%] bg-white shadow-xl elevation-5"
          >
            <SafeAreaView className="flex-1">
              <View className="p-6 border-b border-gray-100 flex-row items-center justify-between">
                <Text className="text-xl font-black">Shopping Cart</Text>
                <TouchableOpacity onPress={() => setIsCartOpen(false)}>
                  <Ionicons name="close" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              {cart.length === 0 ? (
                <View className="flex-1 items-center justify-center p-6">
                  <Ionicons name="cart-outline" size={80} color="#E5E7EB" />
                  <Text className="text-lg font-black text-gray-400 mt-4">Your cart is empty</Text>
                  <TouchableOpacity
                    onPress={() => setIsCartOpen(false)}
                    className="mt-6 bg-black px-8 py-3 rounded-full"
                  >
                    <Text className="text-white font-black">Start Shopping</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    <View className="p-4">
                      {cart.map((item) => (
                        <View key={`${item.product._id}-${item.size}`} className="flex-row items-center mb-4 bg-gray-50 p-3 rounded-2xl">
                          <Image source={{ uri: item.product.images?.[0] }} className="w-16 h-16 rounded-xl bg-white" />
                          <View className="flex-1 ml-3">
                            <Text className="font-extrabold text-gray-900" numberOfLines={1}>{item.product.name}</Text>
                            <Text className="font-bold text-[10px] text-gray-400">Size: {item.size}</Text>
                            <Text className="font-bold text-[10px] text-gray-400">Price: ${item.product.price.toFixed(2)}</Text>
                            <View className="flex-row items-center mt-2">
                              <View className="flex-row items-center">
                                <TouchableOpacity
                                  onPress={() => updateQuantity(item.product._id, item.size, item.quantity - 1)}
                                  className="h-6 w-6 rounded-full border border-gray-200 items-center justify-center"
                                >
                                  <Ionicons name="remove" size={14} color="#666" />
                                </TouchableOpacity>
                                <Text className="mx-3 font-black">{item.quantity}</Text>
                                <TouchableOpacity
                                  onPress={() => updateQuantity(item.product._id, item.size, item.quantity + 1)}
                                  className="h-6 w-6 rounded-full border border-gray-200 items-center justify-center"
                                >
                                  <Ionicons name="add" size={14} color="#666" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                          <View className="flex flex-col gap-1 justify-center items-center">
                            <TouchableOpacity onPress={() => removeFromCart(item.product._id, item.size)} className="p-1">
                              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                            </TouchableOpacity>
                            <Text className="font-black text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </ScrollView>

                  <View className="p-6 border-t border-gray-100 bg-white">
                    <View className="flex-row justify-between mb-4">
                      <Text className="text-lg text-gray-400">Total</Text>
                      <Text className="text-2xl font-black">${totalAmount.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleNavigation('/(tabs)/cart')}
                      className="bg-black py-4 rounded-2xl items-center"
                    >
                      <Text className="text-white font-black text-lg">Checkout Now</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
