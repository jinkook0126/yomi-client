import React, { useEffect } from 'react';
import { CardStyleInterpolators,createStackNavigator } from '@react-navigation/stack';
import DockBar from '../components/DockBar';
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import { useSelector } from 'react-redux';
const Stack = createStackNavigator();
export default ()=> {
    const stat = useSelector(state => state.auth.login.stat)
    return (
        <Stack.Navigator screenOptions={{headerShown:false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} mode='card'>
            {stat ?
                <Stack.Screen name="Dock" component={DockBar}/>
                :
                <Stack.Screen name="Login" component={LoginScreen}/>
            }
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
        </Stack.Navigator> 
    );
  }