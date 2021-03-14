import React from 'react';
import { CardStyleInterpolators,createStackNavigator } from '@react-navigation/stack';
import DockBar from '../components/DockBar';
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import BookCaseMain from '../screen/BookCase/BookCaseMain';
import BookSearch from '../screen/BookCase/BookSearch';
import Diary from '../screen/Diary/Diary';
import { useSelector } from 'react-redux';
const Stack = createStackNavigator();
export default ()=> {
    const initScreen = useSelector(state => state.auth.login.stat) ? "Dock" : "Login"
    
    return (
        <Stack.Navigator initialRouteName={initScreen} screenOptions={{headerShown:false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} mode='card'>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Dock" component={DockBar}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="BookMain" component={BookCaseMain}/>
            <Stack.Screen name="BookSearch" component={BookSearch}/>
            <Stack.Screen name="Diary" component={Diary}/>
        </Stack.Navigator> 
    );
  }