import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTheme} from '../../Theme/ThemeContext';

type TabBarComponentProps = {
  active: boolean;
  options: BottomTabNavigationOptions;
  onLayout?: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

const TabBarComponent = React.memo(
  ({active, options, onPress}: TabBarComponentProps) => {
    const {colors} = useTheme();

    return (
      <Pressable onPress={onPress}>
        <View style={styles.iconContainer}>
          {options.tabBarIcon ? (
            options.tabBarIcon({
              focused: active,
              color: colors.primary,
              size: 26,
            })
          ) : (
            <Text>?</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

export default TabBarComponent;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
