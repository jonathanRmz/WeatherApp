import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL, {
  MapView,
  Camera,
  RasterSource,
  RasterLayer,
} from '@react-native-mapbox-gl/maps';

import {CoordsContext} from '../data/CoordsContext';

const MapScreen = (props) => {
  const {lat, long} = useContext(CoordsContext);
  const customStyleURL =
    'mapbox://styles/rjonathan89/ckduxzdj50m5q1ary9zoj4a5b';
  const rasterSourceProps = {
    id: 'openweatherCloudinessSource',
    tileUrlTemplates: [
      'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=3964ff2840f6023d39ccb57ae56cdbe6',
    ],
    tileSize: 256,
  };

  MapboxGL.setAccessToken(
    'pk.eyJ1IjoicmpvbmF0aGFuODkiLCJhIjoiY2tkcXBhanNsMHFhNTM0anpnMzRpaTdrMCJ9.ovebayuKSFpVUHVr0EG8uw',
  );
  MapboxGL.setConnected(true);
  MapboxGL.setTelemetryEnabled(false);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <MapView style={styles.map} styleURL={customStyleURL}>
          <Camera zoomLevel={5} centerCoordinate={[long, lat]} />
          <RasterSource {...rasterSourceProps}>
            <RasterLayer
              id="openweatherCloudinessLayer"
              sourceID="openweatherCloudinessSource"
              style={{
                rasterOpacity: 0.6,
              }}
            />
          </RasterSource>
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
    backgroundColor: 'black',
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
