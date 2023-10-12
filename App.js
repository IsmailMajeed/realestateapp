import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Components/Navigation';
import { StatusBar } from 'react-native';
import { ThemeContext, ThemeProvider } from './Context/ThemeContext';
import { FilterProvider } from './Context/FiltersContext';
import { UserProvider } from './Context/UserContext';
import axios from 'axios';

export default function App() {
  axios.defaults.baseURL = 'https://graanaserver-a8941da6f6d3.herokuapp.com/';

  return (
    <UserProvider>
      <FilterProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </FilterProvider>
    </UserProvider>
  );
}

function AppContent() {
  const { isDarkMode, theme } = useContext(ThemeContext); // This is where you should use the useContext hook
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </>
  );
}