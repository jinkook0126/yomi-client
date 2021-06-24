import React,{useEffect} from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers';
import StackNavigator from './src/components/StackNavigator';
import ModalLayout from './src/modal/ModalLayout'

const GOOGLE_WEB_CLIENT_ID = "883543506489-vjg7aiquk0l23b1d04fra3n75unhu0ml.apps.googleusercontent.com"
const store = createStore(rootReducer, applyMiddleware(thunk));
export default function App() {
  useEffect(()=>{
    const socialGoogleConfigure = async () => {
      await GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID
      });
    };
    socialGoogleConfigure();
  },[])
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <ModalLayout/>
    </Provider>
  );
}