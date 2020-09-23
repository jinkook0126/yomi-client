import * as React from 'react';
import { Text, View,Button } from 'react-native';
import { useDispatch } from 'react-redux';
import {closeModal} from '../reducers/modal';

export default ()=>{
    const dispatch = useDispatch();

    return (
        <View style={{paddingHorizontal:12, paddingVertical:8,backgroundColor:'white'}}>
            <Text>1234</Text>
            <Text>ABCD</Text>
            <Text>가나다라</Text>
            <Button title="MDOAL CLOSE!!" onPress={()=>dispatch(closeModal())}></Button>
        </View>
    )
}