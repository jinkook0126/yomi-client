import React,{useState} from 'react';
import { TextInput,Text,View,Button,FlatList,Image,StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';
import {closeModal} from '../reducers/modal';
import axios from 'axios';
export default ()=>{
    const dispatch = useDispatch();
    return (
        <View style={{width:300,padding:16,backgroundColor:'white',borderRadius:8}}>
            <View>
                <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:"#EEEEEE",paddingBottom:16}}>
                    <Image source={require('../img/emptyThumbnail.png')} style={{width:67,height:84}}/>
                    <View style={{paddingLeft:4,flex:1,height:84,overflow:"hidden"}}>
                        <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>멋진 신세계</Text>
                        <Text style={{fontSize:10,color:"#757575"}}>이진국짱이다.</Text>
                        <Text numberOfLines={4} ellipsizeMode={"tail"} style={{fontSize:8,color:'#757575',lineHeight:11}}>한 난자에서 180가지의 인간을 생산해내는 공장과 그 아이들을 타율과 강제에 의해 주어진 조건 속에서 교육, 훈련시키는 장면으로 『멋진 신세계』는 시작된다. </Text>
                    </View>
                </View>
                <View style={{marginTop:25,backgroundColor:'green',paddingHorizontal:5,flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:12,color:"#424242",fontWeight:'bold'}}>읽은 페이지 수</Text>
                    <View style={{backgroundColor:"#EEEEEE",width:22,height:16,marginLeft:10}}>
                        <TextInput style={{flex:1,height:16,alignItems:"stretch",paddingVertical:0,fontSize:12}}/>
                    </View>
                </View>
                <View style={{marginTop:10,backgroundColor:'blue',paddingHorizontal:5,flexDirection:'row',alignItems:'center'}}>
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