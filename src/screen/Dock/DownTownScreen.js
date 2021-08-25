import React from 'react';
import { SafeAreaView,ImageBackground,TouchableOpacity,Image } from 'react-native';

export default({navigation})=>{
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../img/downtown/downtown-bg.png")} style={{width: '100%', height: '100%'}}>
                <TouchableOpacity onPress={()=>alert(123)} style={{position:"absolute",left:'10%',bottom:"26%"}}>
                    <Image source={require("../../img/downtown/furniture-shop.png")}  style={{width: 137,height: 127}}/>
                </TouchableOpacity>
            </ImageBackground>
            <TouchableOpacity onPress={()=>navigation.navigate("ElectroShop")} style={{position:"absolute",right:'10%',bottom:"26%"}}>
                <Image source={require("../../img/downtown/electro-shop.png")} style={{width: 137,height: 115}}>
                </Image>
            </TouchableOpacity>
        </SafeAreaView>
    )
}