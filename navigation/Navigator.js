import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Next7DaysScreen from '../screens/Next7DaysScreen';

import {SettingsContext, settings} from '../data/SettingsContext';

import Colors from '../constanst/Colors';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NextDays"
        component={Next7DaysScreen}
        options={{
          title: 'Next 7 days',
          headerShown: true,
          headerTintColor: Colors.primaryColor,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const [animationSpeed, setAnimationSpeed] = useState(
    settings.animations.enable,
  );
  const [degreesScale, setDegreesScale] = useState(
    settings.degreesScale.celsius,
  );

  const settingsValue = {
    animationSpeed,
    setAnimationSpeed,
    degreesScale,
    setDegreesScale,
  };

  return (
    <SettingsContext.Provider value={settingsValue}>
      <NavigationContainer>
        <Tab.Navigator barStyle={{backgroundColor: Colors.primaryDarkColor}}>
          <Tab.Screen
            name="Home"
            component={MainStackNavigator}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              tabBarLabel: 'Map',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="map" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
};

export default Navigator;
