import React from 'react';
import {Text,View,Button} from 'react-native'
import { useDispatch } from 'react-redux';
import {loginRequest} from '../reducers/auth';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const doLogin = () => {
        dispatch(loginRequest()).then((params) => {
            if(params) navigation.navigate("Dock")
        })
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#00ff66' }}>
            <Text>로그인 화면 입니당 ㅎㅎ</Text>
            <Button title="로그인 하기" onPress={() => {
                doLogin();
            }} color={"red"}/>
            <Button title="회원가입 하러가기" onPress={() => {navigation.navigate("SignUp")}} />
        </View>
    )
}