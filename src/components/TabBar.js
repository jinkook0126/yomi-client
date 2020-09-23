import * as React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Animated from 'react-native-reanimated';
export default ({ state, descriptors, navigation, position })=>{
    return (
      <View style={{alignItems:"center"}}>
        <View style={{ flexDirection: 'row', marginVertical:20,backgroundColor:"transparent",borderRadius:10,width:'80%',borderColor:"#ffb8b8",borderWidth:1,overflow:"hidden"}}>
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
            // modify inputRange for custom behavior
            const inputRange = state.routes.map((_, i) => i);
            const opacity = Animated.interpolate(position, {
              inputRange,
              outputRange: inputRange.map(i => (i === index ? 1 : 0)),
            });
            const tabBg = isFocused ? {backgroundColor:"#ffb8b8",borderRadius:10} : null
            const tabColor = isFocused ? {color:"white"} : {color:"#ffb8b8"}
            return (
              <TouchableHighlight
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                key={index}
                onLongPress={onLongPress}
                style={[tabBg,{ height:60,flex: 1, justifyContent:"center",alignItems:"center"}]}
              >
                <Text style={[tabColor,{ fontWeight:"bold"}]}>{label}</Text>
              </TouchableHighlight>
            );
          })}
        </View>
      </View>
    )
}