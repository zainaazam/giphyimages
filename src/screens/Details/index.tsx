import React from 'react';
import Container from '../../components/Container';
import Label from '../../components/Label';
import Header from '../../components/Header';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {GLOBAL_THEME, RootStackParamList} from '../../lib/constants';
import {useDispatch, useSelector} from 'react-redux';
import {Data, sharedRedux} from '../../lib/redux/actions/shared';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {Image, Linking, Pressable, ScrollView, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';
import {useTheme} from '../../Theme/ThemeContext';
import {SharedElement} from 'react-navigation-shared-element';

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

const Details = ({
  route,
  navigation,
}: {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}) => {
  const {item, isHome} = route.params;
  const {favorites} = useSelector((state: {Shared: any}) => state.Shared);
  const isFavorite = favorites.find((favorite: any) => favorite.id === item.id);
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const width = widthPercentageToDP(92);
  const height =
    (Number(item.images.original.height) / Number(item.images.original.width)) *
    width;

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

  const DataInfo = ({
    name,
    value,
    url,
  }: {
    name: string;
    value: string;
    url?: boolean;
  }) => (
    <View style={styles.dataInfo}>
      <Label
        weight="bold"
        size="caption"
        style={{
          marginRight: widthPercentageToDP(1),
        }}>
        {name}:
      </Label>
      {url ? (
        <Pressable
          onPress={() => {
            Linking.openURL(value);
          }}>
          <Label
            size="caption"
            color={colors.primary}
            style={{
              textDecorationLine: 'underline',
              width: widthPercentageToDP(80),
            }}>
            {value}
          </Label>
        </Pressable>
      ) : (
        <Label
          style={{
            width: widthPercentageToDP(80),
          }}
          size="caption">
          {value}
        </Label>
      )}
    </View>
  );

  return (
    <Container flex details>
      <Header
        details
        title="Details"
        isFavorite={isFavorite}
        onGoBack={() => navigation.goBack()}
        handleFavorites={() => handleFavorites(item)}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <SharedElement id={`item.${item.id}.image`}>
          <FastImage
            source={{uri: item.images.original.url}}
            style={[styles.image, {height: height}]}
          />
        </SharedElement>
        <View style={styles.info}>
          {item?.user && (
            <View style={styles.user}>
              <Image
                source={{uri: item?.user?.avatar_url}}
                style={styles.avatar}
              />
              <View>
                <Label weight="bold" size="caption">
                  {item?.user?.display_name}
                </Label>
                <Label size="caption2" color={colors.text}>
                  @{item?.user?.username}
                </Label>
              </View>
            </View>
          )}
          <Label size="title" weight="bold">
            {item.title}
          </Label>
          {item?.user?.description && (
            <Label
              style={styles.description}
              size="caption"
              color={colors.text}>
              {item?.user?.description}
            </Label>
          )}
          <DataInfo name="URL" value={item.url} url />
          <DataInfo name="Type" value={item.type} />
          <DataInfo name="Slug" value={item.slug} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: GLOBAL_THEME.container,
  },
  image: {
    marginTop: heightPercentageToDP(1),
    borderRadius: GLOBAL_THEME.radius.medium,
  },
  info: {
    marginTop: heightPercentageToDP(2),
    paddingBottom: heightPercentageToDP(4),
  },
  description: {
    marginTop: heightPercentageToDP(1),
  },
  avatar: {
    width: heightPercentageToDP(5),
    height: heightPercentageToDP(5),
    borderRadius: GLOBAL_THEME.radius.full,
    marginRight: widthPercentageToDP(2),
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(2),
  },
  dataInfo: {
    flexDirection: 'row',
    marginTop: heightPercentageToDP(1),
  },
});
