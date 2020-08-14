import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import NextDayItem from '../components/NextDayItem';

const NextDaysList = (props) => {
  const renderHourlyItem = (itemData) => {
    return (
      <NextDayItem
        icon={itemData.item.icon}
        time={itemData.item.time}
        temp={itemData.item.temp}
      />
    );
  };

  return (
    <FlatList
      data={props.hourly}
      horizontal={true}
      keyExtractor={(item, index) => item.time}
      renderItem={renderHourlyItem}
      style={styles.days}
    />
  );
};

const styles = StyleSheet.create({
  days: {
    height: 40,
    width: '100%',
  },
});

export default NextDaysList;
