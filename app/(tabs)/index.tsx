import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExternalLink } from '@/components/ExternalLink';

const BOOK_LINK = "https://www.amazon.com.br/Learning-JavaScript-Data-Structures-Algorithms-ebook/dp/B077NB5H6Y?ref_=ast_author_dp&dib=eyJ2IjoiMSJ9._iTWrbUeja0r4TnqDperOWZ4sxH6lndNS3DaHw0aCf0ApvTLDe0PdpqkUZelvSaX_YFUH9rp7iAh_7Ibb_iIqT8o33PRO2AN5Fhz9yxgsOAYM0mmfy8d6uuxjRMU1rZt367-iCyypU2JS602crtqdVvyjOOS81pDi7tR1bDnqiQ.xFL4of0y4jyQBwlkdbN9MRuh0oRVpoAAYn-MAIMjI5A&dib_tag=AUTHOR"

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">About me:</ThemedText>
        <ThemedText>
          I'm <ThemedText type='defaultSemiBold'>Yuri</ThemedText>, Senior Software Engineer. This project was developed for a study propose to learn more about algorithms and data structures
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">References: </ThemedText>
        <ThemedText>
          All the main logic for algorithms and data structures is based in one of the best books I've ever read {'-->'} <ExternalLink href={BOOK_LINK}><ThemedText type='link'>Learning JavaScript Data Structures and Algorithms</ThemedText></ExternalLink>
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
