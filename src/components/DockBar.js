import React from 'react';
import {Image,ImageBackground,Text,TouchableWithoutFeedback,View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyRoomScreen from '../screen/Dock/MyRoomScreen';
import CollectionSreen from '../screen/Dock/CollectionSreen';
import CalendarSreen from '../screen/Dock/CalendarScreen';
import TabNavigator from './TabNavigator'
import MenuSreen from '../screen/Dock/MenuSreen';


const ICO = {
    "room":require("../img/dockbar/dock_room.png"),
    "shop":require("../img/dockbar/dock_shop.png"),
    "calendar":require("../img/dockbar/dock_calendar.png"),
    "menu":require("../img/dockbar/dock_menu.png"),
}

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ width:"100%" , justifyContent: 'center', alignItems: 'center',position:'absolute',bottom:16 }}>
            <ImageBackground 
                imageStyle={{width:"100%"}}
                style={{ flexDirection: 'row', height:40,width:'90%',justifyContent:"space-around" }} resizeMode={'stretch'} source={require("../img/dockbar/dock_bg.png")}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;
                    const isFocused = state.index === index;
            
                    const onPress = () => {
                        const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        });
            
                        if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                        }
                    };
            
                    const onLongPress = () => {
                        navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                        });
                    };
            
                    return (
                        <TouchableWithoutFeedback
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                            key={label}
                            >
                                <View style={{width:60,height:60,bottom:10}}>
                                    <Image source={ICO[label]} />
                                </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ImageBackground>
        </View>
    );
  }
const Dock = createBottomTabNavigator();
export default ()=>{
    return (
        <>
            <Dock.Navigator
                tabBar={props => <MyTabBar {...props} />}
                tabBarOptions={{
                    showIcon: true,
                    showLabel: false,
                    lazyLoad: true,
                    labelStyle: {fontFamily:"Cafe24Oneprettynight"},
                    style: {
                        backgroundColor:'transparent',
                        borderTopWidth: 0,
                        position: 'absolute',
                        elevation: 0
                    }
                }}>
                <Dock.Screen name="MyRoom" component={MyRoomScreen} options={{icon:"room.png",title:"room",tabBarIcon:({focused})=>{
                    return (
                        <Image source={require('../img/dockbar/dock_room.png')}/>
                    )
                }}}
                />
                <Dock.Screen name="Collection" component={CollectionSreen} options={{icon:"shop.png",title:"shop",tabBarIcon:({focused})=>{
                    return (
                        <Image source={require('../img/dockbar/dock_shop.png')}/>
                    )
                }}}/>
                <Dock.Screen name="CalendarSreen" component={CalendarSreen} options={{icon:"calendar.png",title:"calendar",tabBarIcon:({focused})=>{
                    return (
                        <Image source={require('../img/dockbar/dock_calendar.png')}/>
                    )
                }}}/>
                <Dock.Screen name="Menu" component={MenuSreen} options={{icon:"menu.png",title:"menu",tabBarIcon:({focused})=>{
                    return (
                        <Image source={require('../img/dockbar/dock_menu.png')}/>
                    )
                }}}/>
            </Dock.Navigator>
        </>
        
    )
}