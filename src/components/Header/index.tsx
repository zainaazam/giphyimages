import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Label from '../Label';
import {useTheme} from '../../Theme/ThemeContext';
import {GLOBAL_THEME} from '../../lib/constants';
import Icon from '../Icon';
import {sharedRedux} from '../../lib/redux/actions/shared';
import {useDispatch} from 'react-redux';

interface Props {
  home?: boolean;
  title?: string;
  favorites?: boolean;
  details?: boolean;
  isFavorite?: boolean;
  handleFavorites?: () => void;
  onGoBack?: () => void;
}

function Header(props: Props) {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const removeAll = () => {
    sharedRedux.setFavorites([])(dispatch);
  };

  return (
    <View style={styles.container}>
      {props.home && (
        <View style={styles.wrapper}>
          <View>
            <Label weight="semibold" color={colors.primary}>
              Hi, Zaina
            </Label>
            <Label size="headline" weight="semibold">
              What are you looking for?
            </Label>
          </View>
          <View
            style={[
              styles.notifications,
              {backgroundColor: colors.background},
            ]}>
            <Icon.Custom
              name={require('../../assets/icons/notifications.png')}
              size={22}
            />
          </View>
        </View>
      )}
      {props.favorites && (
        <View>
          <View style={styles.wrapper}>
            <Label size="headline" weight="semibold">
              {props.title}
            </Label>
            <Pressable
              onPress={removeAll}
              style={[styles.removeAll, {backgroundColor: colors.pink}]}>
              <Icon.Feather
                style={styles.remove}
                name="trash-2"
                size={18}
                color={colors.primary}
              />
              <Label weight="medium" color={colors.primary} size="caption2">
                Remove All
              </Label>
            </Pressable>
          </View>
          <View style={[styles.divider, {backgroundColor: colors.lightGary}]} />
        </View>
      )}
      {props.details && (
        <View
          style={[
            styles.wrapper,
            {
              paddingBottom: heightPercentageToDP(1),
            },
          ]}>
          <Pressable onPress={props.onGoBack}>
            <Icon.Ionicons name={'arrow-back'} size={22} />
          </Pressable>
          <View>
            <Label size="title">{props.title}</Label>
          </View>
          <Pressable onPress={props.handleFavorites}>
            <Icon.Octicons
              name={props.isFavorite ? 'heart-fill' : 'heart'}
              size={22}
              color={colors.primary}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: GLOBAL_THEME.container,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  notifications: {
    padding: widthPercentageToDP(2.5),
    borderRadius: 10,
  },
  removeAll: {
    padding: widthPercentageToDP(2),
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  remove: {
    marginRight: widthPercentageToDP(2),
  },
  divider: {
    height: 1,
    marginVertical: heightPercentageToDP(1.5),
  },
});
