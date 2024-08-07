import React from 'react';
import {
  ViewProps,
  ViewStyle,
  StyleProp,
  SafeAreaView,
  View,
} from 'react-native';
import {useTheme} from '../../Theme/ThemeContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends ViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  flex?: boolean;
  details?: boolean;
}

export default function Container(props: Props) {
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();

  const style = [
    props.style,
    props.flex ? {flex: 1} : {},
    {
      backgroundColor: colors.white,
      paddingTop: props.details ? top : 0,
    },
  ];

  return (
    <>
      {props.details ? (
        <View {...props} style={style}>
          {props.children}
        </View>
      ) : (
        <SafeAreaView {...props} style={style}>
          {props.children}
        </SafeAreaView>
      )}
    </>
  );
}
