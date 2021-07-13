import React,{useState,useEffect} from 'react';
import { Image,TouchableOpacity } from 'react-native';


export default ({chk,onValueChange,style,disabled})=>{
    const [check,setCheck] = useState(null);
    useEffect(()=>{
        setCheck(chk);
    },[chk])
    return (
        <TouchableOpacity 
            style={[style]}
            disabled={disabled}
            onPress={()=>{
            setCheck(!check);
            onValueChange(!check);
        }}>
            {
                check?
                <Image source={require('../../img/common/check_true.png')}/> 
                : 
                <Image source={require('../../img/common/check_false.png')}/>
            }
        </TouchableOpacity>
    )
}