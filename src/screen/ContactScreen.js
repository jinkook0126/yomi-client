import React from 'react';
import {SafeAreaView,View,TouchableOpacity,Image} from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import StyleText from '../components/UI/StyleText';
import StyleInput from '../components/UI/StyleInput';

const Contact = ({navigation})=>{
    return (
        <SafeAreaView style={{backgroundColor:"#FFFFFF",flex:1 }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack();
                }}>
                    <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                        <WithLocalSvg width={8} height={16} asset={require('../img/menu/ico_back.svg')} />
                    </View>
                </TouchableOpacity>
                <StyleText style={{paddingLeft:20,fontSize:20}} type="bold">문의하기</StyleText>
            </View>        
            <View style={{height:2,backgroundColor:'#ECECEC',width:'100%'}}/>
            <View style={{paddingTop:4,paddingHorizontal:20}}>
                <View style={{marginTop:16,borderWidth:1,borderColor:"#DBDBDB",height:40,paddingHorizontal:16,paddingVertical:10}}>
                    <StyleInput style={{flex:1,alignItems:"stretch",paddingVertical:0}}
                        placeholder={'제목'}/>
                </View>
                <View style={{marginTop:16,borderWidth:1,borderColor:"#DBDBDB",height:260,paddingHorizontal:16,paddingVertical:10}}>
                    <StyleInput multiline={true}
                        placeholder={'내용'}/>
                </View>
                <View style={{marginTop:16,display:'flex',flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={{borderWidth:1,borderColor:"#DBDBDB",height:40,alignItems:"center",paddingLeft:16,flex:1,marginRight:16,justifyContent:"center",alignItems:"flex-start"}}>
                        <StyleText style={{fontFamily:"Namu_Regular",color:"#9E9E9E"}}>첨부파일(파일명)</StyleText>
                    </View>
                    <View style={{width:100,height:40,backgroundColor:"#DBDBDB",justifyContent:'center',alignItems:"center"}}>
                        <StyleText style={{fontFamily:"Namu_Regular",color:"#757575"}}>첨부하기</StyleText>
                    </View>
                </View>
                <TouchableOpacity>
                    <View style={{marginTop:16,display:'flex',justifyContent:"center",alignItems:"center",backgroundColor:"#8C6C51",height:40}}>
                        <StyleText style={{fontFamily:"Namu_Regular",color:"#FFFFFF"}}>보내기</StyleText>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Contact;