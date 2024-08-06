import React from 'react';
import Container from '../../components/Container';
import Label from '../../components/Label';
import {Image, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {GLOBAL_THEME} from '../../lib/constants';
import {StyleSheet} from 'react-native';
import {useTheme} from '../../Theme/ThemeContext';
import Icon from '../../components/Icon';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import {userRedux} from '../../lib/redux/actions/user';

function Profile() {
  const {colors} = useTheme();
  const {email} = useSelector((state: {User: any}) => state.User);
  const dispatch = useDispatch();

  const logout = () => {
    userRedux.setIsLoggedIn(false)(dispatch);
  };

  return (
    <Container flex>
      <View style={styles.container}>
        <View style={styles.user}>
          <View
            style={{
              position: 'relative',
            }}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.image}></Image>
            <Icon.Entypo
              name={'camera'}
              size={22}
              color={colors.primary}
              style={styles.camera}
            />
          </View>
          <Label weight="bold" style={styles.userData}>
            Monica Giller
          </Label>
          <Label size="caption" color={colors.text}>
            {email}
          </Label>
        </View>
        <View>
          <Button
            type="secondary"
            title="Edit Profile"
            style={styles.userData}></Button>
          <Button title="Logout" style={styles.logout} onPress={logout} />
        </View>
      </View>
    </Container>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GLOBAL_THEME.container,
    paddingTop: heightPercentageToDP(6),
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    width: heightPercentageToDP(15),
    height: heightPercentageToDP(15),
    borderRadius: heightPercentageToDP(10),
  },
  camera: {
    position: 'absolute',
    right: 15,
    bottom: 5,
  },
  userData: {
    marginTop: heightPercentageToDP(2),
  },
  logout: {
    marginVertical: heightPercentageToDP(2),
  },
  user: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
