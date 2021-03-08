import React from 'react';
import {Text,View,SafeAreaView,Image,ScrollView,StyleSheet} from 'react-native'
import { useDispatch } from 'react-redux';

export default ({navigation})=>{
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center',paddingHorizontal:20}}>
                <Image source={require('../../img/ico_back.png')}  />
                <Text style={[styles.commonColor,{paddingLeft:20,fontSize:16,fontWeight:'bold'}]}>책장</Text>
            </View>
            <ScrollView style={{paddingTop:16,paddingHorizontal:26}}>
                <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>현재 읽고 있는 책</Text>
                <View style={{backgroundColor:"red",flexWrap:'wrap',flexDirection:"row",justifyContent:'space-between'}}>
                    <View style={{width:90,height:116,backgroundColor:'blue'}}>
                    </View>
                    <View style={{width:90,height:116,backgroundColor:'black'}}>
                    </View>
                    <View style={{width:90,height:116,backgroundColor:'yellow'}}>
                    </View>
                    <View style={{width:90,height:116,backgroundColor:'green'}}>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    },
});