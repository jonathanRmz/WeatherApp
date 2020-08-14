import React, {useContext, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import WeatherIcons from '../constanst/WeatherIcons';
import {SettingsContext} from '../data/SettingsContext';

const LottieIcon = (props) => {
  const {animationSpeed} = useContext(SettingsContext);
  const [path, setPath] = useState();

  const FindingIcon = useCallback(() => {
    let weatherIcon = WeatherIcons.filter((icon) => {
      return icon.name == props.icon;
    })[0];

    if (!weatherIcon)
      weatherIcon = {path: require('../assets/src/clear-day.json')};

    return weatherIcon.path;
  });

  useEffect(() => {
    setPath(FindingIcon());
  }, [FindingIcon]);

  return (
    <LottieView
      source={path ?? require('../assets/src/clear-day.json')}
      style={{...props.style, ...styles.imgAnimate}}
      resizeMode="cover"
      speed={animationSpeed}
      autoPlay={true}
      loop
    />
  );
};

const styles = StyleSheet.create({
  imgAnimate: {
    maxHeight: 150,
    width: 150,
  },
});

export default LottieIcon;
