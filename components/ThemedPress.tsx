import { StyleSheet, TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';

import { PropsWithChildren } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type ThemedPressProps = PropsWithChildren & TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    style?: StyleProp<ViewStyle>
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedPress({
    children,
    style,
    type = 'default',
    ...rest
}: ThemedPressProps) {
    const isPressed = useSharedValue(false)

    const buttonColor = useThemeColor({}, 'button');


    const animatedButtonScaleStyle = useAnimatedStyle(() => ({
        flex: 1,
        opacity: withTiming(isPressed.value ? 0.7 : 1, {
            duration: 400,
        }),
        transform: [
            {
                scale: withTiming(isPressed.value ? 0.95 : 1, {
                    duration: 400,
                }),

            },
        ],
    }));

    return (
        <Animated.View style={[animatedButtonScaleStyle, style]}>
            <TouchableOpacity
                onPressIn={() => { isPressed.value = true }}
                onPressOut={() => { isPressed.value = false }}
                activeOpacity={1}
                style={[

                    { backgroundColor: buttonColor },
                    type === 'default' ? styles.default : undefined,
                    style,
                ]}
                {...rest}
            >
                {children}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    default: {
        flex: 1,
        height: 38,
        borderRadius: 8,

        alignItems: 'center',
        justifyContent: 'center',
    },
});
