import React from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {GLOBAL_THEME} from '../../lib/constants';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Icon from '../Icon';
import Label from '../Label';
import {useTheme} from '../../Theme/ThemeContext';
import {truncate} from 'lodash';
import {Data, sharedRedux} from '../../lib/redux/actions/shared';
import {useDispatch, useSelector} from 'react-redux';

const ImageItem = React.memo(
  ({
    item,
    navigation,
    search,
  }: {
    item: Data;
    navigation?: any;
    search?: boolean;
  }) => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const {favorites} = useSelector((state: {Shared: any}) => state.Shared);
    const width = widthPercentageToDP(45);
    const height =
      (Number(item.images.downsized.height) /
        Number(item.images.downsized.width)) *
      width;
    const isFavorite = favorites.find(
      (favorite: Data) => favorite.id === item.id,
    );

    const navigateToDetails = () => {
      navigation.navigate('Details', {item: item});
    };

    const handleFavorites = (item: Data) => {
      const isFavorite = favorites.find(
        (favorite: Data) => favorite.id === item.id,
      );
      if (isFavorite) {
        const filteredFavorites = favorites.filter(
          (favorite: Data) => favorite.id !== item.id,
        );
        sharedRedux.setFavorites(filteredFavorites)(dispatch);
      } else {
        sharedRedux.setFavorites([...favorites, item])(dispatch);
      }
    };

    return (
      <View style={styles.container} key={item.id}>
        <Pressable onPress={navigateToDetails}>
          <ImageBackground
            imageStyle={[
              styles.backgroundImage,
              {height: search ? widthPercentageToDP(45) : height},
            ]}
            source={{uri: item.images.downsized.url}}
            style={[
              styles.image,
              {height: search ? widthPercentageToDP(45) : height},
            ]}>
            <View style={styles.favorite}>
              <Pressable onPress={() => handleFavorites(item)}>
                <Icon.Octicons
                  name={isFavorite ? 'heart-fill' : 'heart'}
                  size={22}
                  color={colors.primary}
                />
              </Pressable>
            </View>
            <ImageBackground
              imageStyle={styles.shadowImage}
              style={styles.shadow}
              source={require('../../assets/images/shadow.png')}>
              <View style={styles.info}>
                <Label size="caption" weight="bold" color={colors.white}>
                  {item.title}
                </Label>
                {item?.user?.description && (
                  <Label size="caption2" color={colors.background}>
                    {truncate(item?.user?.description, {
                      omission: '..',
                      length: 24,
                    })}
                  </Label>
                )}
              </View>
            </ImageBackground>
          </ImageBackground>
        </Pressable>
      </View>
    );
  },
);

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    marginRight: widthPercentageToDP(2),
    marginBottom: widthPercentageToDP(2),
  },
  image: {
    borderRadius: GLOBAL_THEME.radius.small,
    width: widthPercentageToDP(45),
    justifyContent: 'space-between',
  },
  favorite: {
    alignItems: 'flex-end',
    padding: widthPercentageToDP(3),
  },
  backgroundImage: {
    resizeMode: 'cover',
    borderRadius: GLOBAL_THEME.radius.small,
  },
  shadow: {
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
  },
  shadowImage: {
    borderBottomLeftRadius: GLOBAL_THEME.radius.small,
    borderBottomRightRadius: GLOBAL_THEME.radius.small,
    height: '100%',
  },
  info: {
    padding: widthPercentageToDP(3),
  },
});
