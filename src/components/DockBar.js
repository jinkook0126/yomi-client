import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DockScreen1 from '../screen/DockSreen1';
import DockScreen2 from '../screen/DockSreen2';
import TabNavigator from './TabNavigator'
import DockScreen3 from '../screen/DockSreen3';

const Dock = createBottomTabNavigator();
export default ()=>{
    return (
        <Dock.Navigator>
            <Dock.Screen name="Dock1" component={DockScreen1} />
            <Dock.Screen name="Dock2" component={DockScreen2} />
            <Dock.Screen name="TabScreen" component={TabNavigator} />
            <Dock.Screen name="Dock3" component={DockScreen3} />
        </Dock.Navigator>
    )
}