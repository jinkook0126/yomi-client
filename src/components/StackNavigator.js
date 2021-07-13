import React,{useEffect} from 'react';
import { CardStyleInterpolators,createStackNavigator } from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage';

import WelcomeScreen from '../screen/WelcomeScreen';
import SignUpScreen from '../screen/SignUpScreen';
import BookCaseMain from '../screen/BookCase/BookCaseMain';
import BookSearch from '../screen/BookCase/BookSearch';
import Diary from '../screen/Diary/Diary';
import Calorie from '../screen/Calorie/Calorie';
import CalorieSearch from '../screen/Calorie/CalorieSearch';
import NoticeScreen from '../screen/NoticeScreen';
import ContactScreen from '../screen/ContactScreen';
import QuestionScreen from '../screen/QuestionScreen';

import { useDispatch } from 'react-redux';
import {verifyRequest} from '../reducers/auth';
const Stack = createStackNavigator();
export default ()=> {
    const dispatch = useDispatch();
    useEffect(()=>{
        const appInit = async()=>{
            const token = await EncryptedStorage.getItem("jwt_token");
            if(token !== undefined && token !== null && token !== '') dispatch(verifyRequest())
        }
        appInit();
    },[])
    
    return (
        <Stack.Navigator screenOptions={{headerShown:false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} mode='card'>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="BookMain" component={BookCaseMain}/>
            <Stack.Screen name="BookSearch" component={BookSearch}/>
            <Stack.Screen name="Diary" component={Diary}/>
            <Stack.Screen name="Calorie" component={Calorie}/>
            <Stack.Screen name="CalorieSearch" component={CalorieSearch}/>
            <Stack.Screen name="Notice" component={NoticeScreen}/>
            <Stack.Screen name="Contact" component={ContactScreen}/>
            <Stack.Screen name="Question" component={QuestionScreen}/>
        </Stack.Navigator> 
    );
  }