import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTabBar from '../components/TabBar';
import TabScreen1 from "../screen/Tab/TabScreen1"
import TabScreen2 from "../screen/Tab/TabScreen2"
import TabScreen3 from "../screen/Tab/TabScreen3"

const Tab = createMaterialTopTabNavigator();

export default ()=>{
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Tab1" component={TabScreen1} />
            <Tab.Screen name="Tab2" component={TabScreen2} />
            <Tab.Screen name="Tab3" component={TabScreen3} />
        </Tab.Navigator>
    )
}