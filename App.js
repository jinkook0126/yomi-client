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
import { SnackbarProvider } from '@dooboo-ui/snackbar';

const AppProvider = ({ contexts, children }) => contexts.reduce(
  (prev, context) => React.createElement(context, {
    children: prev
  }), 
  children
);

const ReduxProvider = ({children}) =>(
  <Provider store={store}>
    {children}
  </Provider>
)

const SnackProvider = ({children}) => (
  <SnackbarProvider 
    defaultContent={{ 
      containerStyle: { backgroundColor:"#8C6C51",bottom:60,padding:0 }, 
      messageStyle:{color:"#FFFFFF",fontFamily:"Namu_Bold",fontSize:20,padding:0}
    }}
  >
    {children}
  </SnackbarProvider>
)

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
    <AppProvider contexts={[ReduxProvider, SnackProvider]}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <ModalLayout/>        
    </AppProvider>
  );
}