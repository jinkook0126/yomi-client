import React,{useState} from 'react';
import { TextInput,Text,View,Image,StyleSheet,ImageBackground,TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Rating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';
import {closeModal} from '../reducers/modal';
export default ()=>{
    const dispatch = useDispatch();
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [memo,setMemo] = useState("");
    const handleClose=()=>{
        dispatch(closeModal());
    }
    const handleSave=()=>{
        alert("save!");
        dispatch(closeModal());
    }
    return (
        <View style={{width:320,padding:16,backgroundColor:'white',borderRadius:8}}>
            <View>
                <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:"#EEEEEE",paddingBottom:16}}>
                    <Image source={require('../img/emptyThumbnail.png')} style={{width:67,height:84}}/>
                    <View style={{paddingLeft:4,flex:1,height:84,overflow:"hidden"}}>
                        <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>멋진 신세계</Text>
                        <Text style={{fontSize:10,color:"#757575"}}>이진국짱이다.</Text>
                        <Text numberOfLines={4} ellipsizeMode={"tail"} style={{fontSize:8,color:'#757575',lineHeight:11}}>한 난자에서 180가지의 인간을 생산해내는 공장과 그 아이들을 타율과 강제에 의해 주어진 조건 속에서 교육, 훈련시키는 장면으로 『멋진 신세계』는 시작된다. </Text>
                    </View>
                </View>
                <View style={{marginTop:25,paddingHorizontal:5,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:12,color:"#424242",fontWeight:'bold'}}>읽은 페이지 수</Text>
                    <View style={{backgroundColor:"#EEEEEE",width:22,height:16,marginLeft:10}}>
                        <TextInput style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                    </View>
                </View>
                <View style={{marginTop:10,paddingHorizontal:5,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:12,color:"#424242",fontWeight:'bold'}}>별점</Text>
                    <Rating
                        fractions={2}
                        ratingCount={5}
                        minValue={0.5}
                        jumpValue={0.5}
                        imageSize={14}
                        style={{marginLeft:16,backgroundColor:'red'}}
                    />
                </View>
                <View style={{marginTop:10,paddingHorizontal:5,flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                    <View>
                        <Text style={{fontSize:12,color:"#424242",fontWeight:'bold'}}>메모</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
                        <Text style={{fontSize:12,color:"#424242",fontWeight:'bold'}}>완독</Text>
                        <CheckBox
                            style={{marginLeft:10}}
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                    </View>
                </View>
                <ImageBackground resizeMode={"contain"} source={require("../img/bg_memo.png")} style={{marginTop:10,height:100,borderRadius:2,overflow:"hidden",elevation:2}}>
                    <TextInput
                        multiline={true}
                        value={memo}
                        onChangeText={(value)=>setMemo(value)}
                    />
                </ImageBackground>
                <View style={{marginTop:40,flexDirection:'row',alignItems:"center",justifyContent:"space-between"}}>
                    <TouchableOpacity onPress={handleClose}>
                        <View style={{width:134,height:40,backgroundColor:'#C7B6A0',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                            <Text style={{fontSize:14,color:"#ffffff",fontWeight:'bold'}}>취소</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave}>
                        <View style={{width:134,height:40,backgroundColor:'#8C6C51',borderRadius:6,justifyContent:'center',alignItems:"center"}}>
                            <Text style={{fontSize:14,color:"#ffffff",fontWeight:'bold'}}>저장</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    },

    listContainer:{
        elevation:1
    }
});