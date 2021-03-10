import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers';
import StackNavigator from './src/components/StackNavigator';
import ModalLayout from './src/modal/ModalLayout'

const store = createStore(rootReducer, applyMiddleware(thunk));
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <ModalLayout/>
    </Provider>
  );
}