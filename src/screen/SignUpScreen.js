import React,{useState} from 'react';
import { View,SafeAreaView,TextInput,TouchableOpacity,StyleSheet,Alert } from 'react-native'
import { useDispatch } from 'react-redux';
import send from '../modules/send';
import StyleText from '../components/UI/StyleText'
export default ({navigation})=>{
    const dispatch = useDispatch();
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
            alert("이름을 확인해주세요.")
        } else if(!isMail()){
            alert("메일을 확인해 주세요.")
        } else if(!validPw()){
            alert("비밀번호를 확인해주세요.")
        }else {
            try {
                const {exists} = await send.post("/users/sign-up",{name:name,pw:pw,mail:mail});
                if(!exists) {
                    Alert.alert("알림","가입이 완료되었습니다.",[
                          {text: "확인",
                            onPress: () => {
                                navigation.reset({
                                    index:0,
                                    routes:[{name:"WelcomeScreen"}]
                                });
                            },
                          }
                        ]
                      );
                } else {
                    alert("이미 가입된 메일입니다.");
                }
            } catch(error) {
                alert(error.response.data.message);
            }
        }
    }
    return (
        <SafeAreaView style={{backgroundColor:'#FFFFFF',flex:1}}>
            <View style={{paddingTop:18,paddingHorizontal:20}}>
                <View style={{justifyContent:'center',alignItems:"center"}}>
                    <StyleText style={{fontSize:16}}>회원가입</StyleText>
                </View>
                <View style={{marginTop:50}}> 
                    <View style={[styles.inputWrap,{marginTop:0}]}>
                        <TextInput placeholder={"이름"} style={styles.input} placeholderTextColor={"#9E9E9E"}
                            onChangeText={(value)=>setName(value)}></TextInput>
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput placeholder={"이메일"} style={styles.input} placeholderTextColor={"#9E9E9E"}
                            onChangeText={(value)=>setMail(value)}></TextInput>
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput placeholder={"비밀번호"} secureTextEntry={true} style={styles.input} placeholderTextColor={"#9E9E9E"}
                            onChangeText={(value)=>setPw(value)}></TextInput>
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput placeholder={"비밀번호 확인"} secureTextEntry={true} style={styles.input} placeholderTextColor={"#9E9E9E"}
                            onChangeText={(value)=>setPw2(value)}></TextInput>
                    </View>
                    <TouchableOpacity onPress={signUpRequest}>
                        <View style={{marginTop:28,backgroundColor:"#8C6C51",height:40,justifyContent:'center',alignItems:"center",borderRadius:6}}>
                            <StyleText style={{color:"#FFFFFF",fontSize:15}}>회원가입</StyleText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputWrap:{
        borderBottomWidth:1,borderBottomColor:"#EEEEEE",height:40,marginTop:26
    },
    input:{
        flex:1,height:30,alignItems:"stretch",paddingVertical:0
    }
})