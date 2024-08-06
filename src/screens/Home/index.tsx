import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Container from '../../components/Container';
import Header from '../../components/Header';
import ImageItem from '../../components/ImageItem';
import {GLOBAL_DATA_SERVICE, useAppData} from '../../lib/hooks/useAppData';
import {Data} from '../../lib/redux/actions/shared';
import {useTheme} from '../../Theme/ThemeContext';
import {GLOBAL_THEME, RootStackParamList} from '../../lib/constants';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

function Home({navigation}: {navigation: HomeScreenNavigationProp}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [column1, setColumn1] = useState<Data[]>([]);
  const [column2, setColumn2] = useState<Data[]>([]);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<Data[]>([]);

  const dispatch = useDispatch();
  const {data: initialData} = useAppData();
  const {colors} = useTheme();

  const loadInitialData = useCallback((data: Data[]) => {
    const column1Data = data.filter((_, index) => index % 2 === 0);
    const column2Data = data.filter((_, index) => index % 2 !== 0);
    setColumn1(column1Data);
    setColumn2(column2Data);
  }, []);

  //   const renderItem = ({item}: any) => {
  //     return <ImageItem item={item} />;
  //   };

  const fetchData = async (reset = false) => {
    if (loading || error) return;
    setLoading(true);
    setError(null);
    try {
      const {data: newData} = (await GLOBAL_DATA_SERVICE.getHomeData(
        20,
        reset ? 0 : offset,
        dispatch,
      )) as any;
      if (reset) {
        setColumn1([]);
        setColumn2([]);
      }
      setData(prevData => (reset ? newData : [...prevData, ...newData]));
      setOffset(prevOffset => (reset ? 20 : prevOffset + 20));
      loadInitialData(reset ? newData : [...data, ...newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData.length > 0) {
      loadInitialData(initialData);
      setData(initialData);
    } else {
      fetchData(true);
    }
  }, [initialData]);

  return (
    <Container flex>
      <Header home />
      <View style={styles.container}>
        {error && (
          <View style={[styles.errorContainer, {backgroundColor: colors.red}]}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[{key: '1'}]}
          renderItem={() => (
            <View style={styles.masonryContainer}>
              <View>
                {column1.map((item: Data, index: number) => (
                  <ImageItem
                    key={index + item.id}
                    item={item}
                    navigation={navigation}
                  />
                ))}
              </View>
              <View>
                {column2.map((item: Data, index: number) => (
                  <ImageItem
                    key={index + item.id}
                    item={item}
                    navigation={navigation}
                  />
                ))}
              </View>
            </View>
          )}
          keyExtractor={item => item.key}
          onEndReached={() => fetchData(false)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : null
          }
        />
      </View>
    </Container>
  );
}

export default Home;

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
  errorContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
});
