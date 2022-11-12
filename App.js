import Home from './screens/Home';
import Login from './screens/Login';
import Form from './screens/Form';
import MainScreen from './screens/MainScreen';
import ForgotPassword from './screens/ForgotPassword';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserCtx from './userCtx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()
export default function App() {
  const [user, setUser] = useState({ email: '' })

  const getUserFromAsyncStorage = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('email')
      return userEmail !== null ? setUser(prev => ({ ...prev, email: userEmail })) : null
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const savedUser = getUserFromAsyncStorage()
    console.log(savedUser);
  }, [])
  return (

    <UserCtx.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>

          {user?.email ?
            <Stack.Screen name='MainScreen' component={MainScreen} options={{ title: 'CoinStart' }} />
            :
            <>
              <Stack.Screen name='Home' component={Home} options={{ title: 'Inicio' }} />
              <Stack.Screen name='Login' component={Login} options={{ title: 'Iniciar Sesión' }} />
              <Stack.Screen name='Form' component={Form} options={{ title: 'Formik & Yup' }} />
              <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ title: 'Recuperar cuenta' }} />
            </>
          }


        </Stack.Navigator>
      </NavigationContainer>
    </UserCtx.Provider>

  );
}

