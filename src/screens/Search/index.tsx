import React, {useState, useEffect, useRef, useCallback} from 'react';
import Container from '../../components/Container';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {GLOBAL_THEME, RootStackParamList} from '../../lib/constants';
import {useTheme} from '../../Theme/ThemeContext';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from '../../components/Icon';
import _ from 'lodash';
import {dataApi} from '../../lib/api/data';
import {FlatList} from 'react-native-gesture-handler';
import ImageItem from '../../components/ImageItem';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {Data} from '../../lib/redux/actions/shared';

export type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

function Search({navigation}: {navigation: SearchScreenNavigationProp}) {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const rehydrateSearchResults = useRef(
    _.throttle(
      async ({query, page, reset = false}) => {
        try {
          setLoading(true);
          const {data: newData} = (await dataApi.search({
            query: query,
            size: 20,
            page: page,
          })) as any;
          if (newData.length === 0) {
            setHasMore(false);
          }
          setData(prevData => (reset ? newData : [...prevData, ...newData]));
        } catch (e) {
          console.log(e, `Error`);
        } finally {
          setLoading(false);
        }
      },
      1000,
      {trailing: true, leading: false},
    ),
  );

  useEffect(() => {
    rehydrateSearchResults.current({query: search, page: 0, reset: true});
    setOffset(1);
    setHasMore(true);
  }, [search]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      rehydrateSearchResults.current({query: search, page: offset});
      setOffset(prevOffset => prevOffset + 1);
    }
  }, [loading, hasMore, offset, search]);

  return (
    <Container flex>
      <View style={styles.container}>
        <View style={[styles.inputWrapper, {borderColor: colors.lightGary}]}>
          <Icon.Feather name="search" size={20} color={colors.lightGary} />
          <TextInput
            placeholder="Search"
            style={styles.input}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <View style={styles.data}>
          {loading ? (
            <ActivityIndicator size={'large'} color={colors.primary} />
          ) : data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={({item}: {item: Data}) => (
                <ImageItem item={item} search navigation={navigation} />
              )}
              keyExtractor={(item: Data, index) => item.id + index}
              bounces={false}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && hasMore ? (
                  <ActivityIndicator size="large" color={colors.primary} />
                ) : null
              }
            />
          ) : (
            <Image
              source={require('../../assets/images/search.png')}
              style={styles.image}
            />
          )}
        </View>
      </View>
    </Container>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GLOBAL_THEME.container,
    paddingTop: heightPercentageToDP(2.5),
  },
  inputWrapper: {
    borderWidth: 1,
    paddingHorizontal: widthPercentageToDP(3),
    borderRadius: GLOBAL_THEME.radius.medium,
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPercentageToDP(5.5),
  },
  input: {
    marginLeft: widthPercentageToDP(2),
  },
  image: {
    width: widthPercentageToDP(50),
    resizeMode: 'contain',
  },
  data: {
    paddingTop: heightPercentageToDP(2),
    height: '93.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
