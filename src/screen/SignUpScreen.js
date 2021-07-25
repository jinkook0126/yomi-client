import React,{useState} from 'react';
import { View,SafeAreaView,TouchableOpacity,StyleSheet,Image,ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux';
import send from '../modules/send';
import StyleText from '../components/UI/StyleText'
import StyleInput from '../components/UI/StyleInput';
import { useSnackbarContext } from '@dooboo-ui/snackbar';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const snackbar = useSnackbarContext();
    const [name,setName] = useState("");
    const [mail,setMail] = useState("");
    const [pw,setPw] = useState("");
    const [pw2,setPw2] = useState("");

    const isMail = () =>{
        const mailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return mailRegExp.test(mail);
    }
    const validPw = ()=>{
        const pwRegExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/; 
        return pw===pw2 && pwRegExp.test(pw) && pwRegExp.test(pw2);
    }
    
    const signUpRequest = async() => {
        if(!name) {
            snackbar.show({text:"이름을 확인해주세요."});
        } else if(!isMail()){
            snackbar.show({text:"메일을 확인해 주세요."});
        } else if(!validPw()){
            snackbar.show({text:"비밀번호를 확인해주세요."});
        }else {
            try {
                const {exists} = await send.post("/users/sign-up",{name:name,pw:pw,mail:mail});
                if(!exists) {
                    snackbar.show({text:"가입이 완료되었습니다."});
                    navigation.reset({
                        index:0,
                        routes:[{name:"WelcomeScreen"}]
                    });
                } else {
                    snackbar.show({text:"이미 가입된 메일입니다."});
                }
            } catch(error) {
                snackbar.show({text:error.response.data.message});
            }
        }
    }
    return (
        <SafeAreaView style={{backgroundColor:'#FFFFFF',flex:1}}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <StyleText style={{paddingLeft:50,fontSize:16}}>회원가입</StyleText>
                <TouchableOpacity style={{position: 'absolute',height:50,width:50,justifyContent:'center',alignItems:"center"}} onPress={()=>{
                    navigation.goBack();
                }}>
                    <Image source={require('../img/common/ico_back.png')}  />
                </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal:20}}>
                <View style={{marginTop:26}}> 
                    <View style={[styles.inputWrap,{marginTop:0}]}>
                        <StyleInput placeholder={"이름"} style={styles.input} placeholderTextColor={"#9E9E9E"}
                            onChangeText={(value)=>setName(value)}></StyleInput>
                        <Image source={require('../img/login/input-dash01.png')} style={{width:'100%'}}/>
                    </View>
                    <View style={styles.inputWrap}>
                        <StyleInput placeholder={"이메일"} style={styles.input} placeholderTextColor={"#9E9E9E"}
                            onChangeText={(value)=>setMail(value)}></StyleInput>
                        <Image source={require('../img/login/input-dash02.png')} style={{width:'100%'}}/>
                    </View>
                    <View style={styles.inputWrap}>
                        <StyleInput placeholder={"비밀번호"} secureTextEntry={true} style={styles.input} placeholderTextColor={"#9E9E9E"}
                            onChangeText={(value)=>setPw(value)}></StyleInput>
                        <Image source={require('../img/login/input-dash01.png')} style={{width:'100%'}}/>
                    </View>
                    <View style={styles.inputWrap}>
                        <StyleInput placeholder={"비밀번호 확인"} secureTextEntry={true} style={styles.input} placeholderTextColor={"#9E9E9E"}
                            onChangeText={(value)=>setPw2(value)}></StyleInput>
                        <Image source={require('../img/login/input-dash02.png')} style={{width:'100%'}}/>
                    </View>
                    <TouchableOpacity onPress={signUpRequest}>
                        <ImageBackground source={require('../img/common/long_btn.png')} resizeMode='stretch' style={{marginTop:28,height:40,justifyContent:'center',alignItems:"center"}}>
                            <StyleText style={{color:"#FFFFFF",fontSize:15}}>회원가입</StyleText>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputWrap:{
        height:40,marginTop:26
    },
    input:{
        flex:1,height:30,alignItems:"stretch",paddingVertical:0
    }
})