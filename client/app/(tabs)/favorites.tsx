import { View, Text, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Favorites() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Responsive Grid Logic
  const numColumns = width < 640 ? 2 : width < 1024 ? 3 : 4;
  const itemWidth = `${(100 / numColumns) - 1.5}%`;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <Header showMenu showCart title="My Favorites" />

      {wishlist.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          <View className="bg-gray-50 p-10 rounded-full mb-6">
            <Ionicons name="heart-outline" size={80} color="#E5E7EB" />
          </View>
          <Text className="text-2xl font-black text-gray-900 text-center">Your wishlist is empty</Text>
          <Text className="text-gray-400 text-center mt-2 px-10">
            Explore our products and save your favorites to see them here later!
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/screen/Product')}
            className="mt-10 bg-black px-10 py-4 rounded-2xl shadow-xl"
          >
            <Text className="text-white font-black uppercase tracking-widest text-xs">Start Exploring</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1">
          <View className="px-5 py-6 flex-row justify-between items-end">
            <View>
              <Text className="text-3xl font-black text-gray-900 leading-tight">Favorites</Text>
              <Text className="text-gray-400 font-bold text-[11px] uppercase tracking-widest mt-1">
                {wishlist.length} Items Saved
              </Text>
            </View>
            <TouchableOpacity
              onPress={clearWishlist}
              className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100"
            >
              <Text className="text-gray-500 font-bold text-xs">Clear All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={wishlist}
            key={numColumns}
            keyExtractor={(item) => item._id}
            numColumns={numColumns}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 12 }}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 8 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width: itemWidth as any, marginBottom: 12 }}>
                <ProductCard
                  item={item}
                  onAddToCart={(product, qty, size) => addToCart(product, qty, size)}
                />
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}