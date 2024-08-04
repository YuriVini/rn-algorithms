import { Stack } from "expo-router"

export default function DataStructuresLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false, }} />
            <Stack.Screen name="stack" options={{ headerShown: false, }} />
        </Stack>
    );
}
