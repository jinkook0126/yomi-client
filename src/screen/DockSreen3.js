import * as React from 'react';
import { Text, View,Button } from 'react-native';
import { useDispatch } from 'react-redux';
import {logoutRequest} from '../reducers/auth';
export default ({navigation})=>{
    const dispatch = useDispatch();
    const doLogOut = () => {
        dispatch(logoutRequest()).then(({result}) => {
            if(result){
                navigation.reset({
                    index:0,
                    routes:[{name:"Login"}]
                });
            }
        });
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fcc0fd' }}>
            <Text>Dock Screen 3 입니다!!!</Text>
            <Button title="로그아웃" onPress={doLogOut}/>
        </View>
    )
}