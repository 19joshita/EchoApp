import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import theme from '../../defaultCss/Theme';

type Props = {
  title: string;
  handleSubmit?: () => void;
  loading?: boolean;
};

const ATMButton = ({title, handleSubmit, loading}: Props) => {
  return (
    <TouchableOpacity
      style={styles.buttonBackgroundColor}
      onPress={handleSubmit}>
      <Text style={styles.title}>
        {' '}
        {loading ? <ActivityIndicator size="small" color={'red'} /> : title}
      </Text>
    </TouchableOpacity>
  );
};

export default ATMButton;

const styles = StyleSheet.create({
  buttonBackgroundColor: {
    backgroundColor: theme.colors.darkYellowGreen,
    padding: 8,
    borderRadius: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: theme.colors.white,
  },
});
