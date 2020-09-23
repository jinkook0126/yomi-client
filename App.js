import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators,createStackNavigator } from '@react-navigation/stack';
import DockBar from './src/components/DockBar';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers';

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} mode='card'>
          <Stack.Screen name="Dock" component={DockBar}/>
        </Stack.Navigator> 
      </NavigationContainer>
    </Provider>
  );
}