import React from 'react';
import {
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  View,
  Text,
} from 'react-native';
import theme from '../../defaultCss/Theme';

type TextInputProps = {
  value: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoComplete?: any;
  label: string;
  setValue: (value: string) => void;
  error?: string;
  touched?: boolean;
};

const ATMInput = ({
  label,
  value,
  setValue,
  placeholder,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoComplete,
  error,
  touched,
  ...rest
}: TextInputProps) => {
  const showError = error && touched;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.inputBox}
        value={value}
        autoCorrect={false}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChangeText={text => setValue(text)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        {...rest}
      />
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    backgroundColor: theme.colors.white,
    color: theme.colors.secondaryDark,
    borderRadius: 5,
    // borderColor: theme.colors.secondaryDark,
    // borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    marginTop: 2,
  },
  label: {
    fontWeight: '600',
    color: theme.colors.darkYellowGreen,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 5,
  },
});

export default ATMInput;
