import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import LottieIcon from '../components/LottieIcon';

const NextDayItem = (props) => {
  return (
    <View style={styles.item}>
      <LottieIcon style={styles.icon} icon={props.icon} />
      <Text style={styles.boldText}>{props.time}</Text>
      <Text style={styles.lightText}>{props.temp}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    height: 55,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  lightText: {
    fontSize: 12,
    color: 'grey',
  },
});

export default NextDayItem;
