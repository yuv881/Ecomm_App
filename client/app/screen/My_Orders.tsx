import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'

export default function My_Orders() {
    return (
        <SafeAreaView>
            <Header showMenu showCart showSearch title="My Orders" />
            <Text>My_Orders</Text>
        </SafeAreaView>
    )
}