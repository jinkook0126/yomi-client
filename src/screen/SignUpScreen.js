import React from 'react';
import {Text,View,Button} from 'react-native'
import { useDispatch } from 'react-redux';
import {loginRequest} from '../reducers/auth';
export default ({navigation})=>{
    const dispatch = useDispatch();
    const signUpRequest = () => {
        dispatch(loginRequest()).then((params) => {
            if(params) navigation.navigate("Dock")
        })
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#babbbb' }}>
            <Text>회원가입 화면 입니당 ㅎㅎ</Text>
            <Button title="가입완료" onPress={signUpRequest}/>
        </View>
    )
}