import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Octicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function StackDataStructureScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={<Octicons size={250} name="stack" style={styles.headerImage} />}
        >
            <ThemedText type="title">Data Structure: Stack</ThemedText>

            <ThemedView>

            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -60,
        left: 0,
        position: 'absolute',
    },
});
