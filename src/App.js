import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { AppNavigation } from './navigation/AppNavigation';
import React, { useEffect } from 'react';
import configureAxios from './utils/axios.util';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HomeDrawerNavigator } from './navigation/HomeNavigator';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => configureAxios(), []);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <HomeDrawerNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
