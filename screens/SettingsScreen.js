import React, {useRef, useContext} from 'react';
import {StyleSheet, Text, View, Pressable, Animated} from 'react-native';
import {Switch} from 'react-native-paper';

import Colors from '../constanst/Colors';
import {SettingsContext, settings} from '../data/SettingsContext';

const AnimationsSwitcher = () => {
  const {animationSpeed, setAnimationSpeed} = useContext(SettingsContext);

  return (
    <Switch
      value={animationSpeed == 1 ? true : false}
      trackColor={{false: '#767577', true: Colors.primaryColor}}
      thumbColor={animationSpeed == 1 ? Colors.primaryDarkColor : '#f4f3f4'}
      ios_backgroundColor={Colors.primaryDarkColor}
      onValueChange={(newValue) => {
        setAnimationSpeed(
          newValue ? settings.animations.enable : settings.animations.disable,
        );
      }}
    />
  );
};

const SettingsScreen = (props) => {
  const {setDegreesScale} = useContext(SettingsContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const togglePressed = (value) => {
    Animated.timing(fadeAnim, {
      toValue: value,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.switchContainer}>
        <View style={styles.grayBox}>
          <Animated.View
            style={[
              styles.pressedOption,
              {
                transform: [{translateY: fadeAnim}],
              },
            ]}></Animated.View>
          <Pressable
            onPress={() => {
              setDegreesScale(settings.degreesScale.fahrenheit);
              togglePressed(0);
            }}>
            <Text style={styles.bigLetter}>°F</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDegreesScale(settings.degreesScale.celsius);
              togglePressed(55);
            }}>
            <Text style={styles.bigLetter}>°C</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <Text style={styles.label}>Enable icons automation</Text>
        <AnimationsSwitcher />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  grayBox: {
    backgroundColor: Colors.primaryLightColor,
    width: 70,
    height: 125,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderTopColor: '#ccc',
    paddingHorizontal: 10,
  },
  label: {
    color: Colors.primaryColor,
  },
  bigLetter: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.primaryDarkColor,
  },
  pressedOption: {
    width: '90%',
    borderRadius: 5,
    //paddingHorizontal: 5,
    marginTop: 10,
    backgroundColor: 'white',
    height: 50,
    position: 'absolute',
  },
});

export default SettingsScreen;
