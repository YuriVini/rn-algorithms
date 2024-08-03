import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  ref?: React.LegacyRef<View> | undefined
};

export function ThemedView({ ref, style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View ref={ref} style={[{ backgroundColor }, style]} {...otherProps} />;
}
