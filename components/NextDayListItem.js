import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import LottieIcon from '../components/LottieIcon';

const NextDayListItem = (props) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.verticalText}>
        <Text style={styles.boldText}>{props.day}</Text>
        <Text style={styles.lightText}>{props.shortDate}</Text>
      </View>
      <View style={styles.imgContainer}>
        <LottieIcon style={styles.imgAnimate} icon={props.icon} />
      </View>
      <View style={styles.temperature}>
        <Text style={styles.boldText}>{props.max}°</Text>
        <Text style={styles.lightText}>/{props.min}°</Text>
      </View>
      <View style={styles.flatText}>
        <Text style={{textTransform: 'capitalize'}}>{props.desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 60,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  verticalText: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imgContainer: {
    paddingHorizontal: 10,
  },
  imgAnimate: {
    height: 40,
    width: 40,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  lightText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#666',
  },
  temperature: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  flatText: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
});

export default NextDayListItem;
