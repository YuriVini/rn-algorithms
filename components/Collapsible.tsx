import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useCollapsible } from '@/hooks/useCollapsible';
import Animated, { runOnUI, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const theme = useColorScheme() ?? 'light';
  const { setHeight, isOpenned, animatedRef, animatedHeightStyle } = useCollapsible()

  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: withTiming(`${isOpenned.value ? 90 : 0}deg`, {
          duration: 400,
        }),
      },
    ],
  }));

  return (
    <ThemedView style={{ overflow: 'hidden' }} collapsable={false}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.heading}
        onPress={() => runOnUI(setHeight)()}
      >
        <Animated.View style={animatedChevronStyle}>
          <Ionicons
            size={18}
            name='chevron-forward-outline'
            color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          />
        </Animated.View>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      <Animated.View style={animatedHeightStyle} >
        <View style={{ position: 'absolute', top: 0, left: 0 }}>
          <View ref={animatedRef} collapsable={false}  >{children}</View>
        </View>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
