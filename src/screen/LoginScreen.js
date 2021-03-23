import React from 'react';
import {Text,View,TextInput,SafeAreaView,Image,TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux';
import {loginRequest} from '../reducers/auth';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const onLogin = () => {
        dispatch(loginRequest()).then(({result}) => {
            if(result){
                navigation.reset({
                    index:0,
                    routes:[{name:"Dock"}]
                });
            }
        })
    }
    return (
        <SafeAreaView style={{backgroundColor:"#FFFFFF",flex:1,justifyContent:"space-between"}}>
            <View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("../img/login_yomi.png")}/>
                </View>
                <View style={{paddingHorizontal:20,marginTop:10}}>
                    <View style={{borderBottomWidth:1,borderBottomColor:"#EEEEEE",height:40}}>
                        <TextInput placeholder={"이메일"} style={{flex:1,height:30,alignItems:"stretch",paddingVertical:0}} placeholderTextColor={"#9E9E9E"}></TextInput>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:"#EEEEEE",height:40,marginTop:16}}>
                        <TextInput placeholder={"비밀번호"} style={{flex:1,height:30,alignItems:"stretch",paddingVertical:0}} placeholderTextColor={"#9E9E9E"}></TextInput>
                    </View>
                    <TouchableOpacity onPress={onLogin}>
                        <View style={{marginTop:16,backgroundColor:'#8C6C51',justifyContent:'center',alignItems:"center",height:40,borderRadius:6}}>
                            <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:"bold"}}>로그인</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{marginTop:10}}>
                        <Text style={{fontSize:13,fontWeight:"bold",paddingBottom:2,color:"#2B2B2B",borderBottomWidth:1,alignSelf:"flex-start",borderBottomColor:"#2B2B2B"}}>비밀번호를 잊어버리셨나요?</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
                        <View style={{borderBottomWidth:1,borderBottomColor:"#ECECEC",height:1,flex:1}} />
                        <View style={{marginHorizontal:14}}>
                            <Text style={{fontSize:14,fontWeight:"bold",color:"#2B2B2B"}}>계정으로 로그인</Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:"#ECECEC",height:1,flex:1}} />
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:14}}>
                        <Image source={require('../img/ico_google.png')}/>
                        <Image source={require('../img/ico_kakao.png')} style={{marginLeft:4}}/>
                    </View>
                </View>
            </View>
            <View style={{marginBottom:26,justifyContent:'center',alignItems:"center"}}>
                <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
                    <Text style={{fontSize:14,fontWeight:"bold",color:"#2B2B2B",borderBottomWidth:1,borderBottomColor:'#2B2B2B',paddingBottom:2}}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}