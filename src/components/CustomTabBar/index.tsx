import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Platform, View} from 'react-native';
import TabBarComponent from '../TabBarComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useTheme} from '../../Theme/ThemeContext';

const CustomTabBar = (props: BottomTabBarProps) => {
  const {state, descriptors, navigation} = props;
  const {bottom} = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: bottom + heightPercentageToDP(2),
        paddingVertical: heightPercentageToDP(2),
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: colors.white,
      }}>
      {state?.routes.map((route, index) => {
        const active = index === state.index;
        const {options} = descriptors[route.key];

        return (
          <TabBarComponent
            key={route.key}
            active={active}
            options={options}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </View>
  );
};

export default CustomTabBar;
