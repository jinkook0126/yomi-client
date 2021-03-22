import React from 'react';
import {Text,View,TextInput,SafeAreaView,Image} from 'react-native'
import { useDispatch } from 'react-redux';
import {loginRequest} from '../reducers/auth';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const doLogin = () => {
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
        <SafeAreaView style={{backgroundColor:"#FFFFFF",flex:1}}>
            <View style={{backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
                <Image source={require("../img/login_yomi.png")}/>
            </View>
            <View style={{paddingHorizontal:20,marginTop:10}}>
                <TextInput placeholder={"이메일"} style={{flex:1,height:30,alignItems:"stretch",paddingVertical:0,backgroundColor:'yellow'}} placeholderTextColor={"#9E9E9E"}></TextInput>
            </View>
        </SafeAreaView>
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#00ff66' }}>
        //     <Text>로그인 화면 입니당 ㅎㅎ</Text>
        //     <Button title="로그인 하기" onPress={() => {
        //         doLogin();
        //     }} color={"red"}/>
        //     <Button title="회원가입 하러가기" onPress={() => {navigation.navigate("SignUp")}} />
        // </View>
    )
}