import React from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {useTheme} from '../../Theme/ThemeContext';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Label from '../Label';
import Icon from '../Icon';

interface Props {
  style?: any;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  password?: boolean;
  isError?: boolean | string;
  error?: string;
}

function Input(props: Props) {
  const {colors} = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <View
        style={[
          props.style,
          styles.container,
          {backgroundColor: colors.background},
        ]}>
        <TextInput
          placeholder={props.placeholder}
          secureTextEntry={!showPassword && props.password}
          value={props.value}
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
          style={{
            flex: 1,
          }}
        />
        {props.password && (
          <Pressable
            onPress={() => {
              setShowPassword(!showPassword);
            }}>
            <Icon.Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={colors.primary}
            />
          </Pressable>
        )}
      </View>

      {props.isError && (
        <Label
          style={{
            marginLeft: widthPercentageToDP(2),
            marginTop: widthPercentageToDP(0.5),
          }}
          size="caption2"
          color={colors.red}>
          {props.error}
        </Label>
      )}
    </>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    borderRadius: widthPercentageToDP(2),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: heightPercentageToDP(7),
    paddingHorizontal: widthPercentageToDP(3),
    alignItems: 'center',
  },
});
