import { useState } from 'react'
import { Octicons } from '@expo/vector-icons'
import { Alert, Dimensions, StyleSheet } from 'react-native'
import Animated, {
  EntryAnimationsValues,
  ExitAnimationsValues,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { ThemedPress } from '@/components/ThemedPress'
import ParallaxScrollView from '@/components/ParallaxScrollView'

export default function StackDataStructureScreen() {
  const { width } = Dimensions.get('window')

  const currentIndex = useSharedValue(1)
  const [stack, setStack] = useState<number[]>([1])

  const entering = (targetValues: EntryAnimationsValues) => {
    'worklet'

    const animations = {
      originX: withTiming(targetValues.targetOriginX, { duration: 1000 }),
      opacity: withTiming(1, { duration: 500 }),
    }
    const initialValues = {
      originX: width - width / currentIndex.value,
      opacity: 0,
    }
    return {
      initialValues,
      animations,
    }
  }

  const exiting = (values: ExitAnimationsValues) => {
    'worklet'

    const animations = {
      originY: withTiming(-230, { duration: 1000 }),
      originX: withTiming(width, { duration: 1900 }),
      opacity: withTiming(0.5, { duration: 2000 }),
      transform: [
        { rotate: withTiming('720deg', { duration: 1500 }) },
        { scale: withSequence(withTiming(0.5), withTiming(0.7)) },
      ],
    }
    const initialValues = {
      originY: values.currentOriginY,
      originX: values.currentOriginX,
      opacity: 1,
      transform: [{ rotate: '0deg' }, { scale: 1 }],
    }
    return {
      initialValues,
      animations,
    }
  }

  const push = () => {
    if (stack?.length > 4)
      return Alert.alert("You can't push more than 5 items to stack")

    currentIndex.value++
    setStack((prev) => [...prev, prev.push(prev.length + 1)])
  }

  const pop = () => {
    if (stack?.length <= 1)
      return Alert.alert("You can't pop less than 1 item to stack")

    currentIndex.value--
    setStack((prev) => prev.slice(0, prev?.length - 1))
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Octicons size={250} name='stack' style={styles.headerImage} />
      }
    >
      <ThemedText type='title'>Data Structure: Stack</ThemedText>

      <ThemedView
        style={[{ width: width * 0.9, gap: width * 0.02 }, styles.boxContainer]}
      >
        {stack?.map((item) => (
          <Animated.View
            key={item}
            style={{ zIndex: 1000 }}
            entering={entering}
            exiting={exiting}
          >
            <ThemedView style={[{ width: width / 6.5 }, styles.boxContent]}>
              <Animated.View>
                <ThemedText type='button'>{item}</ThemedText>
              </Animated.View>
            </ThemedView>
          </Animated.View>
        ))}
      </ThemedView>
      <ThemedView style={styles.buttonsContainer}>
        <ThemedPress onPress={push}>
          <ThemedText type='button'>Push</ThemedText>
        </ThemedPress>
        <ThemedPress onPress={pop}>
          <ThemedText type='button'>Pop</ThemedText>
        </ThemedPress>
      </ThemedView>
    </ParallaxScrollView>
  )
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
  },
})
