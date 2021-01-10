import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './src/RegisterScreen';
import LoginScreen from './src/LoginScreen';
import {AuthenticationScreen} from './src/AuthenticationScreen';
import {HomeScreen} from './src/HomeScreen';
import {InputOtpScreen} from './src/InputOtpScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InputOTP"
          component={InputOtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home', headerBackTitle: '', headerLeft: null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
