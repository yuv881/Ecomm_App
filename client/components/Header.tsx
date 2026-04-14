import { TouchableOpacity, View, Image, Text, Modal, Pressable, ScrollView, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { HeaderProps } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, CATEGORIES, PROFILE_MENU, PAGES } from "@/constants";
import { useRouter } from "expo-router";
import { useCart } from "@/context/CartContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { SlideInLeft, SlideOutLeft, SlideInRight, SlideOutRight, FadeIn, FadeOut } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
      <View style={styles.header}>
        {/* section: Back button or Menu */}
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          {showMenu && (
            <TouchableOpacity style={styles.iconBtn} onPress={() => setIsMenuOpen(true)}>
              <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center section: Logo or Title */}
        <View style={[styles.centerSection, { pointerEvents: 'box-none' }]}>
          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            {showLogo ? (
              <Image
                source={require("../assets/images/logo.png")}
                style={{ width: 120, height: 35 }}
                resizeMode="contain"
              />
            ) : title && (
              <Text style={styles.titleText}>{title}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Right section: Search and Cart */}
        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="search-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          {showCart && (
            <TouchableOpacity onPress={() => setIsCartOpen(true)} style={styles.iconBtn}>
              <View>
                <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
                {itemCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{itemCount}</Text>
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
        <View style={styles.modalContainer}>
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.backdrop}>
            <Pressable style={{ flex: 1 }} onPress={() => setIsMenuOpen(false)} />
          </Animated.View>

          <Animated.View
            entering={SlideInLeft.duration(300)}
            exiting={SlideOutLeft.duration(300)}
            style={styles.leftSidebar}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>Menu</Text>
                <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                  <Ionicons name="close" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: 24 }}>
                  <Text style={styles.sectionLabel}>Pages</Text>
                  {PAGES.map((page) => (
                    <TouchableOpacity
                      key={page.id}
                      style={styles.menuItem}
                      onPress={() => handleNavigation(page.route)}
                    >
                      <Ionicons name={page.icon as any} size={22} color={COLORS.secondary} />
                      <Text style={styles.menuItemText}>{page.name}</Text>
                    </TouchableOpacity>
                  ))}

                  <Text style={[styles.sectionLabel, { marginTop: 32 }]}>Account</Text>
                  {PROFILE_MENU.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.menuItem}
                      onPress={() => handleNavigation(item.route)}
                    >
                      <Ionicons name={item.icon as any} size={22} color={COLORS.secondary} />
                      <Text style={styles.menuItemText}>{item.title}</Text>
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
        <View style={styles.modalContainer}>
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.backdrop}>
            <Pressable style={{ flex: 1 }} onPress={() => setIsCartOpen(false)} />
          </Animated.View>

          <Animated.View
            entering={SlideInRight.duration(300)}
            exiting={SlideOutRight.duration(300)}
            style={styles.rightSidebar}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>Shopping Cart</Text>
                <TouchableOpacity onPress={() => setIsCartOpen(false)}>
                  <Ionicons name="close" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>

              {cart.length === 0 ? (
                <View style={styles.emptyCart}>
                  <Ionicons name="cart-outline" size={80} color="#E5E7EB" />
                  <Text style={styles.emptyText}>Your cart is empty</Text>
                  <TouchableOpacity
                    onPress={() => setIsCartOpen(false)}
                    style={styles.emptyBtn}
                  >
                    <Text style={styles.emptyBtnText}>Start Shopping</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 16 }}>
                      {cart.map((item) => (
                        <View key={`${item.product._id}-${item.size}`} style={styles.cartItem}>
                          <Image source={{ uri: item.product.images?.[0] }} style={styles.itemImg} />
                          <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.itemName} numberOfLines={1}>{item.product.name}</Text>
                            <Text className="font-semibold text-xs">Size: <Text style={styles.itemMeta}>{item.size}</Text></Text>
                            <Text className="font-semibold text-xs">Price: <Text style={styles.itemMeta}>${item.product.price.toFixed(2)}</Text></Text>
                            <View style={styles.quantityRow}>
                              <View style={styles.qtyControls}>
                                <TouchableOpacity
                                  onPress={() => updateQuantity(item.product._id, item.size, item.quantity - 1)}
                                  style={styles.qtyBtn}
                                >
                                  <Ionicons name="remove" size={14} color="#666" />
                                </TouchableOpacity>
                                <Text style={styles.qtyText}>{item.quantity}</Text>
                                <TouchableOpacity
                                  onPress={() => updateQuantity(item.product._id, item.size, item.quantity + 1)}
                                  style={styles.qtyBtn}
                                >
                                  <Ionicons name="add" size={14} color="#666" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                          <View className="flex flex-col gap-1 justify-center items-center">
                            <TouchableOpacity onPress={() => removeFromCart(item.product._id, item.size)} style={{ padding: 4 }}>
                              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                            </TouchableOpacity>
                            <Text style={styles.itemSubtotal}>${(item.product.price * item.quantity).toFixed(2)}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </ScrollView>

                  <View style={styles.footer}>
                    <View style={styles.totalRow}>
                      <Text style={styles.totalLabel}>Total</Text>
                      <Text style={styles.totalVal}>${totalAmount.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleNavigation('/(tabs)/cart')}
                      style={styles.checkoutBtn}
                    >
                      <Text style={styles.checkoutText}>Checkout Now</Text>
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

const styles = StyleSheet.create({
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 50,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  centerSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    right: 16,
  },
  iconBtn: {
    padding: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  leftSidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    boxShadow: '2px 0 10px rgba(0,0,0,0.25)',
  },
  rightSidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    boxShadow: '-2px 0 10px rgba(0,0,0,0.25)',
  },
  sidebarHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  menuItemText: {
    marginLeft: 16,
    color: '#374151',
    fontWeight: '500',
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginTop: 16,
  },
  emptyBtn: {
    marginTop: 24,
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptyBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 16,
  },
  itemImg: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  itemName: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  itemMeta: {
    fontSize: 10,
    color: '#6B7280',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    marginHorizontal: 12,
    fontWeight: 'bold',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemSubtotal: {
    fontWeight: 'bold',
    color: '#111111',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: '#6B7280',
  },
  totalVal: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  }
});
