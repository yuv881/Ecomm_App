import { View, Image, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { BANNERS } from "@/assets/assets";
import { useState, useRef, useEffect } from "react";

const { width } = Dimensions.get("window");

export default function SlideShow() {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    // Auto-scroll logic
    useEffect(() => {
        if (BANNERS.length <= 1) return;

        const timer = setInterval(() => {
            let nextIndex = activeIndex + 1;
            if (nextIndex >= BANNERS.length) {
                nextIndex = 0;
            }

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
        }, 4000);

        return () => clearInterval(timer);
    }, [activeIndex]);

    const onScroll = (event: any) => {
        const scrollOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollOffset / width);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    const getItemLayout = (_: any, index: number) => ({
        length: width,
        offset: width * index,
        index,
    });

    return (
        <View className="w-full h-[500px] mb-2.5">
            <FlatList
                ref={flatListRef}
                data={BANNERS}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                getItemLayout={getItemLayout}
                snapToAlignment="start"
                decelerationRate="fast"
                snapToInterval={width}
                renderItem={({ item }) => (
                    <View className="h-[500px]" style={{ width }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            className="w-full h-full overflow-hidden bg-black"
                        >
                            <Image
                                source={{ uri: item.image }}
                                className="w-full h-full opacity-80"
                                resizeMode="cover"
                            />
                            <View className="absolute inset-0 bg-black/10" />
                            <View className="absolute bottom-10 left-5 right-5">
                                <Text className="text-white font-black text-3xl shadow-lg">
                                    {item.title}
                                </Text>
                                <Text className="text-white text-base mt-1 opacity-90 font-bold">
                                    {item.subtitle}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Indicators */}
            <View className="absolute bottom-4 w-full flex-row justify-center items-center gap-1.5">
                {BANNERS.map((_, index) => (
                    <View
                        key={index}
                        className={`h-2 rounded-full ${
                            index === activeIndex ? 'w-5 bg-white' : 'w-2 bg-white/40'
                        }`}
                    />
                ))}
            </View>
        </View>
    );
}