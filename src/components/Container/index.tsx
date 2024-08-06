import React from 'react';
import {ViewProps, ViewStyle, StyleProp, SafeAreaView} from 'react-native';
import {useTheme} from '../../Theme/ThemeContext';

interface Props extends ViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  flex?: boolean;
}

export default function Container(props: Props) {
  const {colors} = useTheme();

  const style = [
    props.style,
    props.flex ? {flex: 1} : {},
    {
      backgroundColor: colors.white,
    },
  ];

  return (
    <SafeAreaView {...props} style={style}>
      {props.children}
    </SafeAreaView>
  );
}
