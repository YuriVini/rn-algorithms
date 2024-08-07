import { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { Alert, Dimensions, StyleSheet } from "react-native";
import Animated, { ExitAnimationsValues, EntryAnimationsValues, LayoutAnimationsValues, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

import Queue from "@/data-structure/queue";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedPress } from "@/components/ThemedPress";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const ANGLE = 10
const TIME = 100

export default function QueueDataStructureScreen() {
    const { width, height } = Dimensions.get("window");

    const currentIndex = useSharedValue(1)
    const [queue] = useState(new Queue<number>([1]))
    const [top, setTop] = useState("");
    const [size, setSize] = useState(0);

    const entering = (targetValues: EntryAnimationsValues) => {
        'worklet';

        const animations = {
            originX: withTiming(targetValues.targetOriginX, { duration: 1000 }),
            opacity: withTiming(1, { duration: 500 }),
        };
        const initialValues = {
            originX: (width / currentIndex.value),
            opacity: 0,
        };

        return {
            initialValues,
            animations,
        };
    };

    const layout = (values: LayoutAnimationsValues) => {
        'worklet';

        const animations = {
            originX: withDelay(700, withTiming(values.targetOriginX, { duration: 2000 })),
            originY: withDelay(
                700,
                withTiming(values.targetOriginY, { duration: 2000 })
            ),
        }
        const initialValues = {
            originX: values.currentOriginX,
            originY: values.currentOriginY,
        }

        return {
            animations,
            initialValues,
        };
    }

    const exiting = (targetValues: ExitAnimationsValues) => {
        'worklet';

        const animations = {
            originY: withDelay(600, withTiming(height, { duration: 1000 })),
            transform: [
                {
                    rotateZ: withSequence(
                        withTiming(-ANGLE, { duration: TIME / 2 }),
                        withRepeat(withTiming(ANGLE, { duration: TIME }), 7, true),
                        withTiming(0, { duration: TIME / 2, })
                    )
                }
            ],
            backgroundColor: interpolateColor(
                progress.value,
                [0, 1],
                ['red', Colors.dark.button],
            ),

        };
        const initialValues = {
            backgroundColor: Colors.dark.button,
            originY: targetValues.currentOriginY,
            transform: [
                { rotateZ: '0deg' },
            ],
        };

        return {
            initialValues,
            animations,
        };
    };

    const enqueue = () => {
        if (queue.size() > 4) return Alert.alert("You can't push more than 5 items to stack")

        const newItem = Math.random() * 100
        queue.enqueue(parseInt(newItem?.toString()))
        setTop(queue.peek());
        setSize(queue.size());
    }

    const dequeue = () => {
        if (queue.size() <= 1) return Alert.alert("You can't pop less than 1 item to stack")

        queue.dequeue()
        setTop(queue.peek());
        setSize(queue.size());

    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={<Octicons size={250} name="stack" style={styles.headerImage} />}
        >
            <ThemedText type="title">Data Structure: Queue</ThemedText>

            <ThemedView style={[{ width: width * 0.9, gap: width * 0.02, zIndex: 1000 }, styles.boxContainer]}>
                {queue?.items?.map((item) => (
                    <Animated.View key={item} layout={layout} entering={entering} exiting={exiting as any}>
                        <ThemedView style={[{ width: width / 6.5 }, styles.boxContent]}>
                            <Animated.View>
                                <ThemedText type="defaultSemiBold">{item}</ThemedText>
                            </Animated.View>
                        </ThemedView>
                    </Animated.View>
                ))}
            </ThemedView>

            <ThemedView style={styles.buttonsContainer}>
                <ThemedPress onPress={enqueue}>
                    <ThemedText type="defaultSemiBold">Enqueue</ThemedText>
                </ThemedPress>
                <ThemedPress onPress={dequeue}>
                    <ThemedText type="defaultSemiBold">Dequeue</ThemedText>
                </ThemedPress>
            </ThemedView>

            <ThemedText type="defaultSemiBold">Top: {top}</ThemedText>
            <ThemedText type="defaultSemiBold">Size: {size}</ThemedText>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        left: 0,
        bottom: -60,
        position: 'absolute',
        color: Colors.dark.icon,
    },
    boxContainer: {
        height: 60,
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderColor: Colors.dark.button,
    },
    boxContent: {
        height: 50,
        zIndex: 1000,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark.button,
    },
    buttonsContainer: {
        gap: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
