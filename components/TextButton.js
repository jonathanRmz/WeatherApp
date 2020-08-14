import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constanst/Colors';

const TextButton = (props) => {
  return (
    <TouchableOpacity style={styles.textButton} onPress={props.onPress}>
      <Text style={styles.btnText}>{props.text}</Text>
      <MaterialCommunityIcons
        name="arrow-right"
        color={Colors.accentLightColor}
        style={{justifyContent: 'flex-end', paddingLeft: 5}}
        size={20}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButton: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnText: {
    color: Colors.accentLightColor,
  },
});

export default TextButton;
