import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, ScrollView } from 'react-native'
import Header from '@/components/Header'
import { dummyProducts } from '@/assets/assets'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import SlideShow from '@/components/SlideShow'

export default function Home() {
  const { addToCart } = useCart();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header showMenu showCart showLogo />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <SlideShow />

        <View className="px-4">
          <Text className="text-2xl font-bold my-4 text-gray-800">New Arrivals</Text>

          {/* Responsive Flexbox Grid (since native grid support varies) */}
          <View className="flex-row flex-wrap justify-between">
            {dummyProducts.map((item) => (
              <View 
                key={item._id} 
                className="w-[48%] sm:w-[32%] lg:w-[23.5%] mb-4"
              >
                <ProductCard
                  item={item}
                  onAddToCart={addToCart}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}