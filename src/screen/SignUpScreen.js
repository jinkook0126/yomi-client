import React from 'react';
import {Text,View,SafeAreaView,TextInput,TouchableOpacity,StyleSheet} from 'react-native'
import { useDispatch } from 'react-redux';
import {loginRequest} from '../reducers/auth';
export default ({navigation})=>{
    const dispatch = useDispatch();
    const signUpRequest = () => {
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
        <SafeAreaView style={{backgroundColor:'#FFFFFF',flex:1}}>
            <View style={{paddingTop:18,paddingHorizontal:20}}>
                <View style={{justifyContent:'center',alignItems:"center"}}>
                    <Text style={{fontWeight:'bold',fontSize:16,color:"#2B2B2B"}}>회원가입</Text>
                </View>
                <View style={{marginTop:50}}> 
                    <View style={[styles.inputWrap,{marginTop:0}]}>
                        <TextInput placeholder={"이름"} style={styles.input} placeholderTextColor={"#9E9E9E"}></TextInput>
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput placeholder={"이메일"} style={styles.input} placeholderTextColor={"#9E9E9E"}></TextInput>
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput placeholder={"비밀번호"} secureTextEntry={true} style={styles.input} placeholderTextColor={"#9E9E9E"}></TextInput>
                    </View>
                    <View style={styles.inputWrap}>
                        <TextInput placeholder={"비밀번호 확인"} secureTextEntry={true} style={styles.input} placeholderTextColor={"#9E9E9E"}></TextInput>
                    </View>
                    <TouchableOpacity onPress={signUpRequest}>
                        <View style={{marginTop:28,backgroundColor:"#8C6C51",height:40,justifyContent:'center',alignItems:"center",borderRadius:6}}>
                            <Text style={{color:"#FFFFFF",fontSize:15,fontWeight:'bold'}}>회원가입</Text>
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