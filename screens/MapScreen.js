import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  MapView,
  Camera,
  RasterSource,
  RasterLayer,
} from '@react-native-mapbox-gl/maps';

import {CoordsContext} from '../data/CoordsContext';

const MapScreen = (props) => {
  const {lat, long} = useContext(CoordsContext);

  // MapboxGL.setAccessToken(
  //   'pk.eyJ1IjoicmpvbmF0aGFuODkiLCJhIjoiY2tkcXBhanNsMHFhNTM0anpnMzRpaTdrMCJ9.ovebayuKSFpVUHVr0EG8uw',
  // );
  // MapboxGL.setConnected(true);
  // MapboxGL.setTelemetryEnabled(false);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <MapView style={styles.map}>
          <Camera zoomLevel={8} centerCoordinate={[long, lat]} />
        </MapView>
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
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
