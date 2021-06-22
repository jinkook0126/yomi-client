import React,{useState} from 'react';
import {Text,View,TextInput,SafeAreaView,Image,TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux';
import {loginRequest} from '../reducers/auth';

import {login,getProfile} from '@react-native-seoul/kakao-login'

export default ({navigation})=>{
    const dispatch = useDispatch();
    const [mail,setMail] = useState("");
    const [pw,setPw] = useState("");
    const onLogin = () => {
        dispatch(loginRequest(mail,pw)).then(({login}) => {
            if(!login) {
                alert("회원정보가 일치하지 않습니다.")
            }
        }).catch(error=>{
            alert(error.response.data.message)
        })
    }

    const kakaoLogin = async()=>{
        const token = await login();
        console.log(token);
        const profile = await getProfile();
        console.log(profile)

    }

    return (
        <SafeAreaView style={{backgroundColor:"#FFFFFF",flex:1,justifyContent:"space-between"}}>
            <View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("../img/login_yomi.png")}/>
                </View>
                <View style={{paddingHorizontal:20,marginTop:10}}>
                    <View style={{borderBottomWidth:1,borderBottomColor:"#EEEEEE",height:40}}>
                        <TextInput placeholder={"이메일"} style={{flex:1,height:30,alignItems:"stretch",paddingVertical:0}} placeholderTextColor={"#9E9E9E"}
                            onChangeText={value=>setMail(value)}
                        ></TextInput>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:"#EEEEEE",height:40,marginTop:16}}>
                        <TextInput placeholder={"비밀번호"} style={{flex:1,height:30,alignItems:"stretch",paddingVertical:0}} placeholderTextColor={"#9E9E9E"}
                            secureTextEntry={true}
                            onChangeText={value=>setPw(value)}
                        ></TextInput>
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
                        <TouchableOpacity onPress={kakaoLogin}>
                            <Image source={require('../img/ico_kakao.png')} style={{marginLeft:4}}/>
                        </TouchableOpacity>
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