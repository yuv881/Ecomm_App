import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import Header from '@/components/Header'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import SlideShow from '@/components/SlideShow'
import { MOCK_PRODUCTS, CATEGORIES, COLORS } from '@/constants'
import { useRouter } from 'expo-router'

export default function Home() {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header showMenu showCart showLogo />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <SlideShow />

        {/* Categories Section */}
        <View className="mt-8">
            <View className="px-5 flex-row justify-between items-end mb-5">
                <View>
                    <Text className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-1">Explore</Text>
                    <Text className="text-2xl font-black text-gray-900">Categories</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/screen/Product')}>
                    <Text className="text-black font-black text-[10px] uppercase tracking-widest border-b border-black pb-0.5">View All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 15 }}
            >
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity 
                        key={cat.id} 
                        onPress={() => router.push('/screen/Product')}
                        className="items-center"
                    >
                        <View className="w-16 h-16 bg-gray-50 rounded-2xl items-center justify-center border border-gray-100 shadow-sm mb-3">
                            <Image 
                                source={{ uri: `https://img.icons8.com/ios-filled/50/000000/${cat.name.toLowerCase()}.png` }} 
                                className="w-8 h-8 opacity-80"
                                style={{ tintColor: COLORS.primary }}
                                onError={(e) => {}}
                            />
                        </View>
                        <Text className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

        {/* Featured Section */}
        <View className="px-5 mt-12 mb-6">
            <View className="flex-row justify-between items-end mb-6">
                <View>
                    <Text className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-1">New Collection</Text>
                    <Text className="text-2xl font-black text-gray-900">Fresh Arrivals</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/screen/Product')}>
                    <Text className="text-black font-black text-[10px] uppercase tracking-widest border-b border-black pb-0.5">See All</Text>
                </TouchableOpacity>
            </View>

            {/* Responsive Flexbox Grid */}
            <View className="flex-row flex-wrap justify-between">
                {MOCK_PRODUCTS.map((item) => (
                    <View
                        key={item._id}
                        className="w-[48%] mb-6"
                    >
                        <ProductCard
                            item={item}
                            onAddToCart={addToCart}
                        />
                    </View>
                ))}
            </View>
        </View>

        {/* Brand Story or Promo */}
        <View className="mx-5 mb-10 bg-black rounded-3xl p-8 relative overflow-hidden">
            <View className="z-10">
                <Text className="text-white text-[10px] font-black uppercase tracking-[4px] mb-3 opacity-60">Exclusive Offer</Text>
                <Text className="text-white text-3xl font-black mb-6 leading-tight">Join Antigravity{"\n"}& Get 20% Off</Text>
                <TouchableOpacity className="bg-white px-6 py-3.5 rounded-2xl self-start">
                    <Text className="text-black font-black text-[10px] uppercase tracking-widest">Sign Up Now</Text>
                </TouchableOpacity>
            </View>
            <View className="absolute -right-10 -bottom-10 opacity-20">
                <Text className="text-white text-[120px] font-black italic">A</Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}