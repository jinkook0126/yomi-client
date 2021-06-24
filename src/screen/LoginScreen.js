import React,{useState} from 'react';
import {Text,View,TextInput,SafeAreaView,Image,TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux';
import {loginRequest, loginSuccess} from '../reducers/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {login,getProfile} from '@react-native-seoul/kakao-login'
import send from '../modules/send';
import { GoogleSignin } from "@react-native-community/google-signin";


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

    const requestKakao = async()=>{
        try {
            const token = await login();
            const userInfo = await getProfile();
            if(token && userInfo) requstSocial({...userInfo,...{social:"KAKAO"}})
        } catch(e) {
            alert('카카오 로그인 에러');
            console.log(e)
        }
    }

    const requestGoogle = async()=>{
        try {
            await GoogleSignin.hasPlayServices();
            const {user} = await GoogleSignin.signIn();
            if(user) requstSocial({...user,...{social:"GOOGLE"}})
        } catch(e) {
            alert('구글 로그인 에러');
            console.log(e);
        }
    }

    const requstSocial = async ({email,id,nickname,name,thumbnailImageUrl,photo,social}) => {
        const {success,token,message} = await send.post("/users/sign-up/social",{
            name: name||nickname,
            id:id,
            thumb:thumbnailImageUrl || photo,
            mail:email,
            social:social
        });
        if(success) {
            EncryptedStorage.setItem(
                "jwt_token",
                JSON.stringify({token : token})
            );
            dispatch(loginSuccess(name||nickname,id));
            navigation.reset({
                index:0,
                routes:[{name:"WelcomeScreen"}]
            });
        } else {
            alert(message)
        }
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
                        <TouchableOpacity onPress={requestGoogle}>
                            <Image source={require('../img/ico_google.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={requestKakao}>
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