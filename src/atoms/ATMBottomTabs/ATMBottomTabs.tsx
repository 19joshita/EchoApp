import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {};

const ATMBottomTabs = (props: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>xcvx</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ATMBottomTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
  },
});
