import React, {memo} from 'react';
import _ from 'lodash';
import {Text} from 'react-native';
import {useTheme} from '../../Theme/ThemeContext';

type FontSize = 'headline' | 'title' | 'caption' | 'caption2';

type FontWeight = 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

export interface LabelProps {
  children: React.ReactNode;
  size?: FontSize;
  weight?: FontWeight;
  color?: string;
  style?: object;
}

const Label = memo((props: LabelProps) => {
  const {children, style, ..._props} = props;
  const {colors} = useTheme();

  const customSizeMap = {
    default: {
      fontSize: 17,
    },
    headline: {
      fontSize: 24,
    },
    title: {
      fontSize: 19,
    },
    caption: {
      fontSize: 15,
    },
    caption2: {
      fontSize: 13,
    },
  };

  const customWeightMap = {
    thin: {
      fontWeight: '200',
    },
    light: {
      fontWeight: '300',
    },
    regular: {
      fontWeight: '400',
    },
    medium: {
      fontWeight: '500',
    },
    semibold: {
      fontWeight: '600',
    },
    bold: {
      fontWeight: '700',
    },
  };

  return (
    <Text
      {..._props}
      style={[
        {
          fontFamily: `SF Pro Display ${
            _.capitalize(props.weight) || 'Regular'
          }`,
          color: props.color ? props.color : colors.black,
        },
        customSizeMap[props.size || 'default'] || {},
        customWeightMap[props.weight || 'regular'] || {},
        style,
      ]}>
      {children}
    </Text>
  );
});

export default Label;
