import { View, Image, Text, Dimensions, FlatList, TouchableOpacity, StyleSheet } from "react-native";
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
        <View style={styles.container}>
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
                    <View style={styles.slide}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.card}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <View style={styles.overlay} />
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
                            {
                                backgroundColor: index === activeIndex ? 'white' : 'rgba(255,255,255,0.4)',
                                width: index === activeIndex ? 20 : 8
                            }
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
        height: 500,
        marginBottom: 10,
    },
    slide: {
        width: width,
        height: 500,
    },
    card: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: 0.85,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    textContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        marginTop: 4,
        opacity: 0.9,
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    indicator: {
        height: 8,
        borderRadius: 4,
    }
});