import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedPress } from '@/components/ThemedPress';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Data Structure</ThemedText>
      </ThemedView>
      <Collapsible title="Stack">
        <ThemedView style={styles.titleContainer}>
          <ThemedText>
            The stack is a ordered colections' list of items that follows the principle of LIFO (Last In First Out).
            This means that, the last item to enter is the first item to exit.
          </ThemedText>
          <ThemedPress>
            <ThemedText>See how it works</ThemedText>
          </ThemedPress>
        </ThemedView>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    paddingLeft: 24,
    gap: 8,
  },
  description: {
    paddingLeft: 24,
  },
});
