import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedPress } from '@/components/ThemedPress';
import { router } from 'expo-router';

export default function ExploreScreen() {
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
                        A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle.
                        It allows adding and removing elements from one end called the top.
                        The basic operations include push (add an element to the top), pop (remove an element from the top), and peek (view the top element).
                    </ThemedText>
                    <ThemedPress onPress={() => router.navigate("/explore/stack")}>
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
