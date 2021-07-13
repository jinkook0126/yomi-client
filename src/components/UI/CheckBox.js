import React,{useState,useEffect} from 'react';
import { StyleSheet,Image,TouchableOpacity } from 'react-native';


export default ({chk,onValueChange})=>{
    const [check,setCheck] = useState(null);
    useEffect(()=>{
        setCheck(chk);
    },[chk])
    return (
        <TouchableOpacity onPress={()=>{
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
const styles = StyleSheet.create({
  default:{fontFamily:"Namu_Regular"}
})