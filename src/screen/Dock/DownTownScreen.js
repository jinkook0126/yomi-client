import React from 'react';
import { SafeAreaView,ImageBackground,TouchableWithoutFeedback,Image } from 'react-native';

export default({navigation})=>{
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../img/downtown/downtown-bg.png")} style={{width: '100%', height: '100%'}}>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate("FurnitureShop")}>
                    <Image source={require("../../img/downtown/fitness-shop.png")}  style={{width: 136,height: 114,position:"absolute",left:'10%',top:"23%"}}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate("ElectroShop")} >
                    <Image source={require("../../img/downtown/variety-shop.png")} style={{width: 144,height: 119,position:"absolute",right:'7%',top:"25%"}} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate("FurnitureShop")}>
                    <Image source={require("../../img/downtown/furniture-shop.png")}  style={{width: 137,height: 127,position:"absolute",left:'10%',bottom:"19%"}}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate("ElectroShop")} >
                    <Image source={require("../../img/downtown/electro-shop.png")} style={{width: 137,height: 115,position:"absolute",right:'10%',bottom:"19%"}} />
                </TouchableWithoutFeedback>
            </ImageBackground>
        </SafeAreaView>
    )
}