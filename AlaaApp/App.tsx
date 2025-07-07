/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';

// Screen Components
import HomeScreen from './src/screens/HomeScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import TodoScreen from './src/screens/TodoScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import StepCounterScreen from './src/screens/StepCounterScreen';

type Screen = 'home' | 'weather' | 'todo' | 'gallery' | 'stepcounter';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const isDarkMode = useColorScheme() === 'dark';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'weather':
        return <WeatherScreen onBack={() => setCurrentScreen('home')} />;
      case 'todo':
        return <TodoScreen onBack={() => setCurrentScreen('home')} />;
      case 'gallery':
        return <GalleryScreen onBack={() => setCurrentScreen('home')} />;
      case 'stepcounter':
        return <StepCounterScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
