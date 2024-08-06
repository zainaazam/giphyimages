import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {DimensionValue} from 'react-native';
import {useTheme} from '../../Theme/ThemeContext';
import Label from '../Label';

type ButtonType = 'primary' | 'secondary' | 'disabled' | 'cancel';

interface CustomButtonProps {
  type?: ButtonType;
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  width?: Width;
  borderRadius?: BorderRadius;
  children?: React.ReactNode;
  style?: any;
  textColor?: string;
  backgroundColor?: string;
  textStyle?: any;
}

type Width = 'full' | 'half' | 'quarters';
type BorderRadius = 'full' | 'medium';

const Button = ({
  type = 'primary',
  title,
  onPress,
  disabled = false,
  width = 'full',
  borderRadius = 'full',
  children,
  style,
  textColor,
  backgroundColor,
  textStyle,
}: CustomButtonProps) => {
  const {colors} = useTheme();
  const borderColor = type === 'secondary' ? colors.primary : 'transparent';
  const borderWidth = type === 'secondary' ? 1 : 0;

  const getWidth = (width: Width): DimensionValue => {
    return width === 'half' ? '48%' : width === 'quarters' ? '80%' : '100%';
  };

  const getBorderRadius = (borderRadius: BorderRadius): number => {
    return borderRadius === 'full' ? 100 : 8;
  };

  const buttonStyles = {
    backgroundColor: backgroundColor
      ? backgroundColor
      : getBackgroundColor(type, disabled),
    borderRadius: getBorderRadius(borderRadius),
    width: getWidth(width),
    borderColor,
    borderWidth,
  };

  const textStyles = {
    color: textColor ? textColor : getTextColor(type, disabled),
  };

  return (
    <Pressable
      style={[styles.button, buttonStyles, style]}
      onPress={onPress}
      disabled={disabled}>
      {title ? (
        <Label weight={'medium'} style={[styles.text, textStyles, textStyle]}>
          {title}
        </Label>
      ) : (
        children
      )}
    </Pressable>
  );
};

const getBackgroundColor = (type: ButtonType, disabled: boolean): string => {
  const {colors} = useTheme();
  if (disabled) {
    return colors.gray;
  }

  switch (type) {
    case 'secondary':
      return 'transparent';
    case 'cancel':
      return colors.red;
    default:
      return colors.primary;
  }
};

const getTextColor = (type: ButtonType, disabled: boolean): string => {
  const {colors} = useTheme();

  if (disabled) {
    return colors.gray;
  }

  switch (type) {
    case 'secondary':
      return colors.primary;
    default:
      return colors.white;
  }
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Button;
