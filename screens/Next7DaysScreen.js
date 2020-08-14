import React from 'react';
import {StyleSheet, FlatList} from 'react-native';

import NextDayListItem from '../components/NextDayListItem';

const Next7DaysScreen = (props) => {
  const dailyList = JSON.parse(props.route.params?.dailyList);

  const renderDailyItem = (itemData) => {
    return (
      <NextDayListItem
        day={itemData.item.date.day}
        shortDate={itemData.item.date.shortDate}
        icon={itemData.item.icon}
        max={itemData.item.tempMax}
        min={itemData.item.tempMin}
        desc={itemData.item.description}
      />
    );
  };

  return (
    <FlatList
      data={dailyList}
      keyExtractor={(item, index) => item.date.shortDate}
      renderItem={renderDailyItem}
      style={styles.screen}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
});

export default Next7DaysScreen;
