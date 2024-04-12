import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ATMBottomTabs from './src/atoms/ATMBottomTabs/ATMBottomTabs';

type Props = {};

const App = (props: Props) => {
  return (
    <View>
      <Text>
        <ATMBottomTabs />
      </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
