import React from 'react';
import {SafeAreaView,View,TouchableOpacity,ScrollView} from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import StyleText from '../components/UI/StyleText';

const Notice = ({navigation})=>{
    return (
        <SafeAreaView style={{backgroundColor:"#FFFFFF",flex:1}}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <StyleText style={{paddingLeft:50,fontSize:20}} type="bold">공지사항</StyleText>
                <TouchableOpacity style={{position: 'absolute',height:50,width:50,justifyContent:'center',alignItems:"center"}} onPress={()=>{
                    navigation.goBack();
                }}>
                    <WithLocalSvg width={8} height={16} asset={require('../img/menu/ico_back.svg')} />
                </TouchableOpacity>
            </View>
            <View style={{height:2,backgroundColor:'#ECECEC',width:'100%'}}/>
            <ScrollView style={{marginTop:6,paddingHorizontal:20}}>
                <View style={{marginTop:20,display:"flex",flexDirection:"row",justifyContent:'space-between',alignItems:'flex-start',paddingBottom:20,borderBottomWidth:1,borderBottomColor:"#ECECEC"}}>
                    <View>
                        <StyleText style={{fontFamily:"Namu_Bold"}}>버그관련 공지사항</StyleText>
                        <StyleText style={{fontFamily:"Namu_Bold",fontSize:12,marginTop:8}}>2021.07.12</StyleText>
                    </View>
                    <TouchableOpacity>
                        <View style={{height:50,width:28,justifyContent:'flex-start',alignItems:"flex-end",paddingRight:16,paddingTop:10}}>
                            <WithLocalSvg width={8} height={16} asset={require('../img/menu/ico_next.svg')} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notice;