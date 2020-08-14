import React from 'react';

export const CoordsContext = React.createContext({
  lat: 0.0,
  setLat: () => {},
  long: 0.0,
  setLong: () => {},
  city: '',
  setCity: () => {},
});
