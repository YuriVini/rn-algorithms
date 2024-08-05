import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedPress } from "@/components/ThemedPress";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Octicons } from "@expo/vector-icons";
import { Reducer, useReducer, } from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";

enum STACK_ACTIONS {
    PUSH = "push",
    POP = "pop",
    PEEK = "peek"
}

type IStackItems = {
    count: number;
    items: number[];
}

type IStackActions = {
    type: STACK_ACTIONS
    payload?: any;
}


export default function StackDataStructureScreen() {
    const { width } = Dimensions.get("window");

    const reducer = (state: IStackItems, action: IStackActions) => {
        switch (action.type) {
            case STACK_ACTIONS.PUSH: {
                return {
                    count: state.count + 1,
                    items: [...state.items, state.items.push(state.count + 1)]
                }
            }
            case STACK_ACTIONS.POP: {
                return {
                    count: state.count - 1,
                    items: state.items.slice(0, state.count - 1)
                }
            }
            default:
                return { ...state }
        }
    }

    const [stack, dispatch] = useReducer<Reducer<IStackItems, IStackActions>>(reducer, { count: 1, items: [1] })

    const push = () => {
        if (stack?.count > 4) Alert.alert("You can't push more than 5 items to stack")
        else dispatch({ type: STACK_ACTIONS.PUSH })
    }

    const pop = () => {
        if (stack?.count <= 1) return Alert.alert("You can't pop less than 1 item to stack")
        dispatch({ type: STACK_ACTIONS.POP })

    }

    const peek = () => {

    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={<Octicons size={250} name="stack" style={styles.headerImage} />}
        >
            <ThemedText type="title">Data Structure: Stack</ThemedText>

            <ThemedView style={[{ width: width * 0.9, gap: width * 0.02, }, styles.boxContainer]}>
                {stack?.items?.map((item) => (
                    <ThemedView key={item} style={[{ width: width / 6.5 }, styles.boxContent]}>
                        <ThemedText type="defaultSemiBold">{item}</ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>

            <ThemedView style={styles.buttonsContainer}>
                <ThemedPress onPress={push}>
                    <ThemedText type="defaultSemiBold">Push</ThemedText>
                </ThemedPress>
                <ThemedPress onPress={pop}>
                    <ThemedText type="defaultSemiBold">Pop</ThemedText>
                </ThemedPress>
                <ThemedPress onPress={peek}>
                    <ThemedText type="defaultSemiBold">Peek</ThemedText>
                </ThemedPress>
            </ThemedView>
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
        width: '100%',
        marginBottom: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    }
});
