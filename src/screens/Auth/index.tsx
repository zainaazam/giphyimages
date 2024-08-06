import React from 'react';
import Container from '../../components/Container';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';
import Label from '../../components/Label';
import {useTheme} from '../../Theme/ThemeContext';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {userRedux} from '../../lib/redux/actions/user';
import {useDispatch} from 'react-redux';
import {GLOBAL_THEME} from '../../lib/constants';

function Login() {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: validationSchema,
    onSubmit: values => {
      setLoading(true);
      userRedux.setIsLoggedIn(true)(dispatch);
      userRedux.setEmail(values.email.toLowerCase())(dispatch);
    },
  });

  return (
    <Container flex>
      <View style={styles.container}>
        <Icon.Custom name={require('../../assets/images/logo.png')} size={60} />
        <View style={styles.inputs}>
          <Input
            placeholder="Email Address"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            error={formik.errors.email}
            isError={formik.touched.email && formik.errors.email}
          />
          <Input
            placeholder="Password"
            style={{
              marginTop: heightPercentageToDP(2),
            }}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            password
            error={formik.errors.password}
            isError={formik.touched.password && formik.errors.password}
          />
        </View>
        <Button
          title={loading ? '' : 'Login'}
          onPress={formik.handleSubmit}
          style={{
            marginTop: heightPercentageToDP(2),
          }}>
          {loading && <ActivityIndicator size="small" color={colors.white} />}
        </Button>
        <Label
          size="caption"
          color={colors.text}
          style={{
            marginTop: heightPercentageToDP(1),
          }}>
          Forgot password?
        </Label>
      </View>
      <View style={styles.register}>
        <Button type="secondary" title="Create new account" />
      </View>
    </Container>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: GLOBAL_THEME.container,
    height: heightPercentageToDP(80),
  },
  inputs: {
    width: '100%',
    marginTop: heightPercentageToDP(15),
  },
  register: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: GLOBAL_THEME.container,
  },
});
