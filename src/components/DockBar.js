import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyRoomScreen from '../screen/Dock/MyRoomScreen';
import CollectionSreen from '../screen/Dock/CollectionSreen';
import CalendarSreen from '../screen/Dock/CalendarScreen';
import TabNavigator from './TabNavigator'
import MenuSreen from '../screen/Dock/MenuSreen';


const Dock = createBottomTabNavigator();
export default ()=>{
    return (
        <>
        <Dock.Navigator>
            <Dock.Screen name="MyRoom" component={MyRoomScreen} options={{title:"내 방"}}/>
            <Dock.Screen name="Collection" component={CollectionSreen} options={{title:"컬렉션"}}/>
            {/* <Dock.Screen name="TabScreen" component={TabNavigator} options={{title:"기록"}}/> */}
            <Dock.Screen name="CalendarSreen" component={CalendarSreen} options={{title:"기록"}}/>
            <Dock.Screen name="Menu" component={MenuSreen} options={{title:"메뉴"}}/>
        </Dock.Navigator>
        </>
        
    )
}