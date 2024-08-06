import React from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';
import {FlatList, View} from 'react-native';
import {Data} from '../../lib/redux/actions/shared';
import ImageItem from '../../components/ImageItem';
import {StyleSheet} from 'react-native';
import {GLOBAL_THEME, RootStackParamList} from '../../lib/constants';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';

export type FavoritesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

function Favorites({navigation}: {navigation: FavoritesScreenNavigationProp}) {
  const {favorites} = useSelector((state: {Shared: any}) => state.Shared);

  const column1 = favorites.filter((_: Data, index: number) => index % 2 === 0);
  const column2 = favorites.filter((_: Data, index: number) => index % 2 !== 0);

  return (
    <Container flex>
      <Header favorites title={`${favorites.length} Liked Items`} />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[{key: '1'}]}
          renderItem={() => (
            <View style={styles.masonryContainer}>
              <View>
                {column1.map((item: Data) => (
                  <ImageItem
                    key={item.id}
                    item={item}
                    navigation={navigation}
                  />
                ))}
              </View>
              <View>
                {column2.map((item: Data) => (
                  <ImageItem
                    key={item.id}
                    item={item}
                    navigation={navigation}
                  />
                ))}
              </View>
            </View>
          )}
          keyExtractor={item => item.key}
        />
      </View>
    </Container>
  );
}

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: GLOBAL_THEME.container,
    paddingTop: GLOBAL_THEME.container,
  },
  masonryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
