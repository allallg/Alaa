import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';

interface WeatherScreenProps {
  onBack: () => void;
}

const { width } = Dimensions.get('window');

const WeatherScreen: React.FC<WeatherScreenProps> = ({ onBack }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [currentWeather, setCurrentWeather] = useState({
    location: 'תל אביב',
    temperature: 26,
    condition: 'חמים וצלול',
    icon: '☀️',
    humidity: 65,
    windSpeed: 12,
    feelsLike: 28,
  });

  const forecast = [
    { day: 'יום ראשון', temp: 28, icon: '🌞' },
    { day: 'יום שני', temp: 24, icon: '⛅' },
    { day: 'יום שלישי', temp: 22, icon: '🌦️' },
    { day: 'יום רביעי', temp: 25, icon: '🌤️' },
    { day: 'יום חמישי', temp: 27, icon: '☀️' },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      setCurrentWeather(prev => ({
        ...prev,
        temperature: prev.temperature + Math.floor(Math.random() * 3) - 1,
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  const refreshWeather = () => {
    setCurrentWeather(prev => ({
      ...prev,
      temperature: 20 + Math.floor(Math.random() * 15),
      humidity: 40 + Math.floor(Math.random() * 40),
      windSpeed: 5 + Math.floor(Math.random() * 20),
    }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#87ceeb' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← חזור</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
          מזג אוויר
        </Text>
        <TouchableOpacity onPress={refreshWeather} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>🔄</Text>
        </TouchableOpacity>
      </View>

      <Animated.View 
        style={[
          styles.currentWeather,
          {
            backgroundColor: isDarkMode ? '#2c3e50' : '#fff',
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={[styles.location, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
          {currentWeather.location}
        </Text>
        <Text style={styles.weatherIcon}>{currentWeather.icon}</Text>
        <Text style={[styles.temperature, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
          {currentWeather.temperature}°C
        </Text>
        <Text style={[styles.condition, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
          {currentWeather.condition}
        </Text>
        <Text style={[styles.feelsLike, { color: isDarkMode ? '#95a5a6' : '#95a5a6' }]}>
          מרגיש כמו {currentWeather.feelsLike}°C
        </Text>
      </Animated.View>

      <View style={styles.detailsContainer}>
        <View style={[styles.detailItem, { backgroundColor: isDarkMode ? '#34495e' : '#fff' }]}>
          <Text style={styles.detailIcon}>💧</Text>
          <Text style={[styles.detailLabel, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
            לחות
          </Text>
          <Text style={[styles.detailValue, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
            {currentWeather.humidity}%
          </Text>
        </View>
        <View style={[styles.detailItem, { backgroundColor: isDarkMode ? '#34495e' : '#fff' }]}>
          <Text style={styles.detailIcon}>💨</Text>
          <Text style={[styles.detailLabel, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
            רוח
          </Text>
          <Text style={[styles.detailValue, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
            {currentWeather.windSpeed} קמ״ש
          </Text>
        </View>
      </View>

      <View style={styles.forecastContainer}>
        <Text style={[styles.forecastTitle, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
          תחזית ל-5 ימים
        </Text>
        {forecast.map((day, index) => (
          <View 
            key={index} 
            style={[styles.forecastItem, { backgroundColor: isDarkMode ? '#34495e' : '#fff' }]}
          >
            <Text style={[styles.forecastDay, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
              {day.day}
            </Text>
            <Text style={styles.forecastIcon}>{day.icon}</Text>
            <Text style={[styles.forecastTemp, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
              {day.temp}°C
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 10,
  },
  refreshButtonText: {
    fontSize: 20,
  },
  currentWeather: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherIcon: {
    fontSize: 80,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  condition: {
    fontSize: 18,
    marginBottom: 5,
  },
  feelsLike: {
    fontSize: 14,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  forecastContainer: {
    marginTop: 10,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  forecastDay: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  forecastIcon: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeatherScreen;