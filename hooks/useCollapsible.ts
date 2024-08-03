import { type View } from "react-native";
import {
    measure,
    withTiming,
    useAnimatedRef,
    useSharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

export const useCollapsible = () => {
    const animatedRef = useAnimatedRef<View>();
    const isOpenned = useSharedValue(false);
    const height = useSharedValue(0);
    const animatedHeightStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isOpenned?.value ? 1 : 0, { duration: 900 }),
        height: withTiming(height.value, { duration: 600 }),
    }));

    const setHeight = () => {
        "worklet";

        height.value = !height.value ? Number(measure(animatedRef)?.height ?? 0) : 0;
        isOpenned.value = !isOpenned.value;
    };

    return {
        isOpenned,
        setHeight,
        animatedRef,
        animatedHeightStyle,
    };
};