import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import admob from '@invertase/react-native-google-ads';
import configureAxios from './utils/axios.util';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RootNavigator } from './navigation/RootNavigation';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    configureAxios();
    admob().initialize().then(adapterStatuses => console.log("ads => ", adapterStatuses));
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
