import { View, Image, Text, Dimensions, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { BANNERS } from "@/assets/assets";
import { useState, useRef, useEffect } from "react";

const { width, height } = Dimensions.get("window");
const BANNER_HEIGHT = height * 0.5;

export default function SlideShow() {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

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
            setActiveIndex(nextIndex);
        }, 4000);

        return () => clearInterval(timer);
    }, [activeIndex]);

    const onScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setActiveIndex(roundIndex);
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={BANNERS}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onScroll}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.card}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.subtitle}>{item.subtitle}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Indicators */}
            <View style={styles.indicatorContainer}>
                {BANNERS.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            { backgroundColor: index === activeIndex ? 'white' : 'rgba(255,255,255,0.4)' }
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: BANNER_HEIGHT,
        marginBottom: 20,
        marginTop: 10,
    },
    slide: {
        width: width,
        height: BANNER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    card: {
        width: width - 32,
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 10,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    subtitle: {
        color: 'white',
        fontSize: 14,
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    indicator: {
        height: 8,
        width: 8,
        borderRadius: 4,
    }
});