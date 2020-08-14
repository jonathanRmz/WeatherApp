import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import * as Location from 'expo-location';

import Navigator from './navigation/Navigator';

import {CoordsContext} from './data/CoordsContext';

const App = () => {
  const [long, setLong] = useState(0.0);
  const [lat, setLat] = useState(0.0);
  const [city, setCity] = useState();
  const coordsValue = {lat, setLat, long, setLong, city, setCity};
  const [errorMsg, setErrorMsg] = useState(null);

  const saveCoordsInfo = useCallback(
    (location, city) => {
      setLat(location.latitude);
      setLong(location.longitude);
      console.log(city);
      if (city !== undefined) setCity(`${city?.city}, ${city?.isoCountryCode}`);
    },
    [setLat, setLong, setCity],
  );

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      let locationInfo = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      let city = await Location.reverseGeocodeAsync(locationInfo);
      city = city.map((item) => item)[0];

      saveCoordsInfo(locationInfo, city);
    })();
  }, [lat, long, city]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (lat && long) {
    text = lat + ', ' + long;
  }

  return (
    <CoordsContext.Provider value={coordsValue}>
      <Navigator />
    </CoordsContext.Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
