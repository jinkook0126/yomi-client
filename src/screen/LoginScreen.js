import React,{useState} from 'react';
import { View,SafeAreaView,Image,TouchableOpacity,ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux';
import {loginRequest, loginSuccess} from '../reducers/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {login,getProfile} from '@react-native-seoul/kakao-login'
import send from '../modules/send';
import { GoogleSignin } from "@react-native-community/google-signin";
import StyleText from '../components/UI/StyleText';
import StyleInput from '../components/UI/StyleInput';
import { useSnackbarContext } from '@dooboo-ui/snackbar';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const snackbar = useSnackbarContext();
    const [mail,setMail] = useState("");
    const [pw,setPw] = useState("");
    const onLogin = () => {
        dispatch(loginRequest(mail,pw)).then(({login}) => {
            if(!login) {
                snackbar.show({text:"회원정보가 일치하지 않습니다."});
            }
        }).catch(error=>{
            snackbar.show({text:error.response.data.message});
        })
    }

    const requestKakao = async()=>{
        try {
            const token = await login();
            const userInfo = await getProfile();
            if(token && userInfo) requstSocial({...userInfo,...{social:"KAKAO"}})
        } catch(e) {
            snackbar.show({text:'카카오 로그인 에러'});
        }
    }

    const requestGoogle = async()=>{
        try {
            await GoogleSignin.hasPlayServices();
            const {user} = await GoogleSignin.signIn();
            if(user) requstSocial({...user,...{social:"GOOGLE"}})
        } catch(e) {
            snackbar.show({text:'구글 로그인 에러'});
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
            dispatch(loginSuccess(name||nickname,id,thumbnailImageUrl || photo));
            navigation.reset({
                index:0,
                routes:[{name:"WelcomeScreen"}]
            });
        } else {
            snackbar.show({text:message});
        }
    }
    return (
        <SafeAreaView style={{backgroundColor:"#FFFFFF",flex:1,justifyContent:"space-between"}}>
            <View>
                <View style={{justifyContent:'center',alignItems:'center',marginVertical:62}}>
                    <Image source={require("../img/login_dust.png")}/>
                </View>
                <View style={{paddingHorizontal:20}}>
                    <View style={{height:40}}>
                        <StyleInput placeholder={"이메일"} style={{flex:1,height:30,alignItems:"stretch",paddingVertical:0,fontSize:16}} placeholderTextColor={"#9E9E9E"}
                            onChangeText={value=>setMail(value)}
                        ></StyleInput>
                        <Image source={require('../img/login/input-dash01.png')} style={{width:'100%'}}/>
                    </View>
                    <View style={{height:40,marginTop:16}}>
                        <StyleInput placeholder={"비밀번호"} style={{flex:1,height:30,alignItems:"stretch",paddingVertical:0,fontSize:16}} placeholderTextColor={"#9E9E9E"}
                            secureTextEntry={true}
                            onChangeText={value=>setPw(value)}
                        ></StyleInput>
                        <Image source={require('../img/login/input-dash02.png')} style={{width:'100%'}}/>
                    </View>
                    <TouchableOpacity onPress={onLogin}>
                        <ImageBackground resizeMode="stretch" source={require('../img/common/long_btn.png')} style={{marginTop:16,justifyContent:'center',alignItems:"center",height:40}}>
                            <StyleText style={{color:"#FFFFFF",fontSize:18}} type='bold'>로그인</StyleText>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{marginTop:10}}>
                        <StyleText style={{fontSize:14,paddingBottom:2,borderBottomWidth:1,alignSelf:"flex-start",borderBottomColor:"#2B2B2B"}}>비밀번호를 잊어버리셨나요?</StyleText>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
                        <Image source={require('../img/login/dash01.png')} style={{flex:1}}/>
                        <View style={{marginHorizontal:14}}>
                            <StyleText style={{fontSize:16}}>계정으로 로그인</StyleText>
                        </View>
                        <Image source={require('../img/login/dash02.png')} style={{flex:1}}/>
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
                    <StyleText style={{borderBottomWidth:1,borderBottomColor:'#2B2B2B',paddingBottom:2,fontSize:16}}>회원가입</StyleText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}