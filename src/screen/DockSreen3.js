import * as React from 'react';
import { Text, View,Button } from 'react-native';
import { useDispatch } from 'react-redux';
import {logoutSuccess} from '../reducers/auth';

export default ()=>{
    const dispatch = useDispatch();
    const doLogOut = () => {
        dispatch(logoutSuccess());
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fcc0fd' }}>
            <Text>Dock Screen 3 입니다!!!</Text>
            <Button title="로그아웃" onPress={doLogOut}/>
        </View>
    )
}