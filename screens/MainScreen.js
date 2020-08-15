import React, {
  useCallback,
  useEffect,
  useContext,
  useState,
  useLayoutEffect,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import TextButton from '../components/TextButton';
import Colors from '../constanst/Colors';
import LottieIcon from '../components/LottieIcon';
import NextDaysList from '../components/NextDaysList';
import Loader from '../components/Loader';

import {CoordsContext} from '../data/CoordsContext';
import {SettingsContext, settings} from '../data/SettingsContext';

const MainScreen = (props) => {
  const {lat, long, city} = useContext(CoordsContext);

  const {degreesScale} = useContext(SettingsContext);
  const [currentWeather, setCurrentWeather] = useState();
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getWeatherData = useCallback(async () => {
    try {
      var unit =
        degreesScale === settings.degreesScale.celsius ? 'metric' : 'imperial';

      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=${unit}&appid=3964ff2840f6023d39ccb57ae56cdbe6`,
        {
          cache: 'force-cache',
        },
      );
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  }, [lat, long, degreesScale]);

  const getTime = (unix_timestamp, isFormatTime) => {
    const date = new Date(unix_timestamp * 1000);

    const day = date.toString().split(' ')[0];
    const dayNumber = date.getDate();
    const month = date.getMonth();
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();

    if (isFormatTime) return hours.substr(-2) + ':' + minutes.substr(-2);
    else return {day: day.toUpperCase(), shortDate: month + '/' + dayNumber};
  };

  useEffect(() => {
    getWeatherData().then((response) => {
      const resp = response.current?.weather[0];
      const hourly = response.hourly;
      const daily = response.daily;

      const weather = {
        description: resp?.description,
        icon: resp?.icon,
        temp: response.current?.temp.toFixed(0),
        feelsLike: response.current?.feels_like.toFixed(0),
      };

      let hourlyList = hourly.slice(0, 12).map((hour) => {
        return {
          icon: hour.weather[0].icon,
          time: getTime(hour.dt, true),
          temp: hour.temp.toFixed(0),
        };
      });

      let dailyList = daily.slice(1, 8).map((day) => {
        return {
          icon: day.weather[0].icon,
          tempMax: day.temp.max.toFixed(0),
          tempMin: day.temp.min.toFixed(0),
          description: day.weather[0].description,
          date: getTime(day.dt, false),
        };
      });

      setCurrentWeather(weather);
      setHourly(hourlyList);
      setDaily(dailyList);
      setIsLoading(false);
    });
  }, [getWeatherData]);

  return (
    <View style={styles.screen}>
      <Loader loading={isLoading} />
      <Text style={styles.bigTitle}>{city ?? 'city'}</Text>
      <Text style={styles.subTitle}>{currentWeather?.description}</Text>
      <View style={styles.imgContainer}>
        <LottieIcon icon={currentWeather?.icon} />
      </View>
      <View style={styles.weatherContainer}>
        <Text style={styles.bigNumber}>{currentWeather?.temp}°</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>
            Feels like {currentWeather?.feelsLike}°
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.horizontalTitle}>
          <Text style={styles.smallTitle}>Today</Text>
          <TextButton
            text="Next 7 days"
            onPress={() => {
              props.navigation.navigate({
                name: 'NextDays',
                params: {
                  dailyList: JSON.stringify(daily),
                },
              });
            }}
          />
        </View>
        <NextDaysList hourly={hourly} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: 'white',
  },
  bigTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.primaryColor,
  },
  subTitle: {
    fontSize: 18,
    color: Colors.accentLightColor,
    textTransform: 'capitalize',
  },
  img: {
    width: 250,
    height: 100,
    resizeMode: 'stretch',
  },
  imgContainer: {
    flex: 1,
  },
  bigNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
  },
  badgeContainer: {
    backgroundColor: Colors.primaryLightColor,
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: Colors.accentColor,
  },
  footer: {
    flex: 1,
    width: '100%',
  },
  horizontalTitle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    height: 40,
  },
  smallTitle: {
    color: Colors.primaryDarkColor,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingRight: 15,
  },
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MainScreen;
