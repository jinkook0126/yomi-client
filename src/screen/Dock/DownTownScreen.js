import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView,ImageBackground,TouchableWithoutFeedback,Image,View } from 'react-native';
import StyleText from '../../components/UI/StyleText';


export default()=>{
    const coin = useSelector(state => state.auth.userInfo.coin);
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../img/downtown/downtown-bg.png")} style={{width: '100%', height: '100%'}}>
                <View style={{flexDirection:"row",alignItems:'center',position: 'absolute',top:"2%",right: '5%'}}>
                    <Image source={require("../../img/common/coin.png")} style={{width: 41,height:34,marginRight:10}}/>
                    <StyleText type='bold' style={{fontSize:20}}>{coin}</StyleText>
                </View>
                <TouchableWithoutFeedback onPress={()=>alert(123)}>
                    <ImageBackground source={require("../../img/downtown/electro-shop.png")} 
                        style={{position:"absolute",right:'10%',bottom:"26%",width: 137,height: 115}}>
                    </ImageBackground>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>alert(123)}>
                    <ImageBackground source={require("../../img/downtown/furniture-shop.png")} 
                        style={{position:"absolute",left:'10%',bottom:"26%",width: 137,height: 127}}>
                    </ImageBackground>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </SafeAreaView>
    )
}