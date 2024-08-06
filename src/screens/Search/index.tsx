import React from 'react';
import Container from '../../components/Container';
import {Image, StyleSheet, TextInput, View} from 'react-native';
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

export type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

function Search({navigation}: {navigation: SearchScreenNavigationProp}) {
  const {colors} = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState([]);

  const rehydrateSearchResults = React.useRef(
    _.throttle(
      async ({query}) => {
        try {
          setLoading(true);
          const {data} = (await dataApi.search({
            query: query,
            size: 20,
          })) as any;
          setData(data);
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

  React.useEffect(() => {
    rehydrateSearchResults.current({query: search});
  }, [search]);

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
          {data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={({item}: any) => (
                <ImageItem
                  item={item}
                  key={item.id}
                  search
                  navigation={navigation}
                />
              )}
              keyExtractor={(item: any, index) => item.id + index}
              bounces={false}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
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
    paddingTop: heightPercentageToDP(1),
  },
  inputWrapper: {
    borderWidth: 1,
    padding: widthPercentageToDP(3),
    borderRadius: GLOBAL_THEME.radius.medium,
    flexDirection: 'row',
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
