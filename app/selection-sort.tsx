import { Dimensions, StyleSheet, useColorScheme } from 'react-native'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { Colors } from '@/constants/Colors'
import { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import Animated, {
  EntryAnimationsValues,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import { LayoutAnimationsValues } from 'react-native-reanimated'
import { ThemedPress } from '@/components/ThemedPress'
import { defaultCompare, delay, swap } from '@/utils/helpers'

const { width } = Dimensions.get('window')

interface Selection {
  data: number[]
  min: number
}

const initialData = [4, 7, 3, 1, 8, 6, 2]

export default function SelectionSort() {
  const isDark = useColorScheme() === 'dark'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [indexToCompare, setIndexToCompare] = useState(0)
  const [isSorting, setIsSorting] = useState(false)
  const [selection, setSelection] = useState<Selection>({
    data: initialData,
    min: 0,
  })
  const translateArrowUpX = useSharedValue(0)
  const translateArrowDownX = useSharedValue(0)
  const translateSmallerTextX = useSharedValue(0)

  const selectionSort = async () => {
    setIsSorting(true)

    await delay(1000)
    const { data } = selection
    let minIndex = 0
    for (let i = 0; i < data.length; i++) {
      setCurrentIndex(i)
      translateArrowDownX.value = withTiming(i * 1.07 * 45, { duration: 800 })
      translateArrowUpX.value = withTiming(i * 1.07 * 45, { duration: 800 })
      translateSmallerTextX.value = withTiming(i * 1.07 * 45, { duration: 800 })

      minIndex = i
      for (let j = i + 1; j < data.length; j++) {
        translateArrowDownX.value = withTiming(j * 1.07 * 45, { duration: 800 })
        setIndexToCompare(j)
        if (defaultCompare(data[minIndex], data[j]) === 1) {
          minIndex = j
          translateSmallerTextX.value = withTiming(j * 1.07 * 45, { duration: 800 })
          setSelection({ ...selection, min: minIndex })
        }
        await delay(2000)
      }
      if (minIndex !== i) {
        const dataToSort = swap(data, i, minIndex)
        setSelection({ ...selection, data: dataToSort })
        translateSmallerTextX.value = withDelay(700, withTiming(i * 1.07 * 45, { duration: 2000 }))
        translateArrowUpX.value = withDelay(700, withTiming((i + 1) * 1.07 * 45, { duration: 2000 }))
        await delay(2500)
      }
    }
  }

  const handleStartSorting = () => {
    selectionSort().then(() => {
      setIsSorting(false)
    })
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIndexToCompare(0)
    setSelection({ min: 0, data: initialData })
    translateArrowUpX.value = 0
    translateArrowDownX.value = 0
    translateSmallerTextX.value = 0
  }

  const translateArrowUpAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: translateArrowUpX.value }],
    opacity: withTiming(isSorting ? 1 : 0, { duration: 500 }),
  }))

  const translateArrowDownAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: translateArrowDownX.value }],
    opacity: withTiming(isSorting ? 1 : 0, { duration: 500 }),
  }))

  const translateSmallerTextAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: translateSmallerTextX.value }],
    opacity: withTiming(isSorting ? 1 : 0, { duration: 500 }),
  }))

  const entering = (targetValues: EntryAnimationsValues) => {
    'worklet'

    const animations = {
      originX: withTiming(targetValues.targetOriginX, { duration: 1000 }),
      opacity: withTiming(1, { duration: 500 }),
    }
    const initialValues = {
      originX: 200,
      opacity: 0,
    }

    return {
      initialValues,
      animations,
    }
  }

  const layout = (values: LayoutAnimationsValues) => {
    'worklet'

    const animations = {
      originX: withDelay(
        700,
        withTiming(values.targetOriginX, { duration: isSorting ? 2000 : 700 })
      ),
      originY: withDelay(
        700,
        withTiming(values.targetOriginY, { duration: isSorting ? 2000 : 700 })
      ),
    }
    const initialValues = {
      originX: values.currentOriginX,
      originY: values.currentOriginY,
    }

    return {
      animations,
      initialValues,
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <MaterialCommunityIcons
          size={310}
          style={styles.headerImage}
          name="sort-reverse-variant"
        />
      }
    >
      <ThemedText type="title">Selection Sort</ThemedText>

      <ThemedView style={styles.boxContainer}>
        <ThemedView style={styles.iconContainer}>
          <Animated.View style={[translateArrowUpAnimation, styles.animatedContainer]}>
            <ThemedText type="subtitle">i</ThemedText>
            <FontAwesome6 name="arrow-down-long" size={24} color={isDark ? 'white' : 'black'} />
          </Animated.View>
          <Animated.View style={[translateSmallerTextAnimation, styles.animatedText]}>
            <ThemedText style={{ fontSize: 10 }}>smaller</ThemedText>
          </Animated.View>
        </ThemedView>

        {selection?.data?.map((item, index) => {
          const indexCompare = currentIndex === index && isSorting
          const indexToCompareAtual = indexToCompare === index && isSorting
          const backgroundColor = indexCompare
            ? Colors.light.progressSelected
            : indexToCompareAtual
            ? Colors.light.progress
            : Colors.light.button

          return (
            <Animated.View
              key={item}
              layout={layout}
              entering={entering}
              style={[{ width: 40, backgroundColor }, styles.boxContent]}
            >
              <ThemedText type="button">{item}</ThemedText>
            </Animated.View>
          )
        })}

        <ThemedView style={styles.iconDownContainer}>
          <Animated.View style={[translateArrowDownAnimation, styles.animatedContainer]}>
            <FontAwesome6 name="arrow-up-long" size={24} color={isDark ? 'white' : 'black'} />
            <ThemedText type="subtitle">j</ThemedText>
          </Animated.View>
        </ThemedView>
      </ThemedView>


      <ThemedPress onPress={handleStartSorting}>
        <ThemedText type="button">Start Sorting</ThemedText>
      </ThemedPress>

      <ThemedPress onPress={handleReset}>
        <ThemedText type="button">Reset</ThemedText>
      </ThemedPress>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    left: -40,
    bottom: -60,
    position: 'absolute',
    color: Colors.dark.icon,
  },
  boxContainer: {
    width: width * 0.9,
    gap: width * 0.02,
    zIndex: 1000,
    height: 60,
    marginVertical: 50,
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: Colors.dark.button,
  },
  boxContent: {
    height: 40,
    zIndex: 1000,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    gap: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    left: 0,
    bottom: 75,
    width: width * 0.9,
    zIndex: 1000,
    position: 'absolute',
  },
  iconDownContainer: {
    left: 0,
    top: 70,
    width: width * 0.9,
    position: 'absolute',
  },
  animatedContainer: {
    width: 40,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  animatedText: {
    width: 40,
    bottom: -20,
    alignItems: 'center',
    position: 'absolute',
    marginHorizontal: 10,
  },
})
