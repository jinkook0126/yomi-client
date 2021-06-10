import React,{useState} from 'react';
import {Text,View,SafeAreaView,Image,Dimensions,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const navigateInfo = (type)=>{
        navigation.navigate('CalorieSearch',{
            type:type
        })
    }

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                        <Image source={require('../../img/ico_back.png')}  />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.commonColor,{paddingLeft:20,fontSize:16,fontWeight:'bold'}]}>냉장고</Text>
            </View>
            <View style={{paddingVertical:16,paddingHorizontal:26,flex:1}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignContent:"center",paddingBottom:17,borderBottomColor:"#EEEEEE",borderBottomWidth:1}}>
                    <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:15}]}>목표 칼로리</Text>
                    <View style={{flexDirection:'row',alignItems:"center"}}>
                        <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:15}]}>1100/1800 kcal</Text>
                        <TouchableOpacity onPress={()=>alert('edit kcal!')}>
                            <Image source={require("../../img/ico_edit.png")} style={{marginLeft:6}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{marginTop:22,flex:1}}>
                    <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:15}]}>오늘 먹은 음식</Text>
                    <View style={{marginTop:15}}>
                        <View style={styles.foodHeaderWrap}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>아침</Text>
                                <TouchableOpacity onPress={()=>navigateInfo("M01")} >
                                    <View style={styles.foodNext}>
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.foodItemWrap}>
                                <View style={{flexDirection:"row",alignItems:'center'}}>
                                    <Text style={[styles.commonColor,{fontSize:12}]}>김치찌개</Text>
                                    <Text style={{fontSize:12,marginLeft:12,color:"#757575"}}>2</Text>
                                </View>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14}]}>500kcal</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={styles.foodHeaderWrap}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>점심</Text>
                                <TouchableOpacity onPress={()=>navigateInfo("M02")} >
                                    <View style={styles.foodNext}>
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.foodItemWrap}>
                                <View style={{flexDirection:"row",alignItems:'center'}}>
                                    <Text style={[styles.commonColor,{fontSize:12}]}>비빔밥</Text>
                                    <Text style={{fontSize:12,marginLeft:12,color:"#757575"}}>2</Text>
                                </View>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14}]}>500kcal</Text>
                            </View>
                            <View style={styles.foodItemWrap}>
                                <View style={{flexDirection:"row",alignItems:'center'}}>
                                    <Text style={[styles.commonColor,{fontSize:12}]}>김치찌개</Text>
                                    <Text style={{fontSize:12,marginLeft:12,color:"#757575"}}>2</Text>
                                </View>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14}]}>350kcal</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={styles.foodHeaderWrap}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>저녁</Text>
                                <TouchableOpacity onPress={()=>navigateInfo("M03")} >
                                    <View style={styles.foodNext}>
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={styles.foodHeaderWrap}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>야식</Text>
                                <TouchableOpacity onPress={()=>navigateInfo("M04")} >
                                    <View style={styles.foodNext}>
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={styles.foodHeaderWrap}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>간식</Text>
                                <TouchableOpacity onPress={()=>navigateInfo("M05")} >
                                    <View style={styles.foodNext}>
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    },
    foodHeaderWrap:{
        borderRadius:2,
        borderColor:"#EEEEEE",
        overflow:"hidden",
        borderWidth:1
    },
    foodHeader:{
        height:36,
        backgroundColor:"#C7B6A0",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
    },
    foodNext:{
        height:36,
        width:36,
        justifyContent:"center",
        paddingRight:12,
        alignItems:"flex-end"
    },
    foodItemWrap:{
        paddingHorizontal:12,
        paddingVertical:10,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:'#FFFFFF'
    },
    modalContents:{
        backgroundColor:'#FFFBE9',
        borderRadius:8,
        paddingHorizontal:16,
        paddingVertical:26
    }
});