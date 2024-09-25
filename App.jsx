import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsScreen from './components/NewsScreen';
import NewsContent from './components/NewsContent';
const Stack = createNativeStackNavigator();

export default function App() {
  const date = new Date().toLocaleString('en-US', { year: 'numeric',
    month: 'short',day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  console.log(date);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NewsScreen">
          <Stack.Screen 
          name="NewsScreen"
          component={NewsScreen}
          options={{ title: `${date} (Today)` }} 
          />
          <Stack.Screen 
          name="NewsContent"
          component={NewsContent}
          options={{ title: `${date} (Today)` }} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
