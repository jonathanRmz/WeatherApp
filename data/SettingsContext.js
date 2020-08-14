import React from 'react';

export const settings = {
  animations: {
    enable: 1,
    disable: 0,
  },
  degreesScale: {
    celsius: 'C',
    fahrenheit: 'F',
  },
};

export const SettingsContext = React.createContext({
  animationSpeed: settings.animations.enable,
  setAnimationSpeed: () => {},
  degreesScale: settings.degreesScale.celsius,
  setDegreesScale: () => {},
});
