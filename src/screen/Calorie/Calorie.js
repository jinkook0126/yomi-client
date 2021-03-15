import React,{useState} from 'react';
import {Text,View,SafeAreaView,Image,Dimensions,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const [inputDiary,setInputDiary] = useState("");
    const handleModalSave = (value)=>{
        console.log(value)
        setVisible(false);
    }
    const renderItem=({item,index})=>{
        const margin = (Dimensions.get('window').width-(90*3)-(26*2)) / 2;
        return (
            <View style={{marginTop:16,alignItems:"center",marginLeft:index%3===0?0:margin}}>
                <View style={{width:90,height:116,borderWidth:1,borderStyle:"dotted",borderColor:'#9E9E9E',borderRadius:6}}>
                </View>
                <Text style={{marginTop:10}}>{item.date}</Text>
            </View>
        )
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
                        <View style={{borderRadius:2,borderColor:"#EEEEEE",overflow:"hidden",borderWidth:1}}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>아침</Text>
                                <View style={styles.foodNext}>
                                    <TouchableOpacity onPress={()=>alert("next 아침")} >
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{paddingHorizontal:12,paddingVertical:10,flexDirection:"row",justifyContent:"space-between",backgroundColor:'#FFFFFF'}}>
                                <View style={{flexDirection:"row",alignItems:'center'}}>
                                    <Text style={[styles.commonColor,{fontSize:12}]}>김치찌개</Text>
                                    <Text style={{fontSize:12,marginLeft:12,color:"#757575"}}>2</Text>
                                </View>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14}]}>500kcal</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={{borderRadius:2,borderColor:"#EEEEEE",overflow:"hidden",borderWidth:1}}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>점심</Text>
                                <View style={styles.foodNext}>
                                    <TouchableOpacity onPress={()=>alert("next 점심")} >
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{paddingHorizontal:12,paddingVertical:10,flexDirection:"row",justifyContent:"space-between",backgroundColor:'#FFFFFF',borderBottomWidth:1,borderBottomColor:"#EEEEEE"}}>
                                <View style={{flexDirection:"row",alignItems:'center'}}>
                                    <Text style={[styles.commonColor,{fontSize:12}]}>비빔밥</Text>
                                    <Text style={{fontSize:12,marginLeft:12,color:"#757575"}}>2</Text>
                                </View>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14}]}>500kcal</Text>
                            </View>
                            <View style={{paddingHorizontal:12,paddingVertical:10,flexDirection:"row",justifyContent:"space-between",backgroundColor:'#FFFFFF'}}>
                                <View style={{flexDirection:"row",alignItems:'center'}}>
                                    <Text style={[styles.commonColor,{fontSize:12}]}>김치찌개</Text>
                                    <Text style={{fontSize:12,marginLeft:12,color:"#757575"}}>2</Text>
                                </View>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14}]}>350kcal</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={{borderRadius:2,borderColor:"#EEEEEE",overflow:"hidden",borderWidth:1}}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>저녁</Text>
                                <View style={styles.foodNext}>
                                    <TouchableOpacity onPress={()=>alert("next 저녁")} >
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={{borderRadius:2,borderColor:"#EEEEEE",overflow:"hidden",borderWidth:1}}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>야식</Text>
                                <View style={styles.foodNext}>
                                    <TouchableOpacity onPress={()=>alert("next 야식")} >
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <View style={{borderRadius:2,borderColor:"#EEEEEE",overflow:"hidden",borderWidth:1}}>
                            <View style={styles.foodHeader}>
                                <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:14,paddingLeft:12}]}>간식</Text>
                                <View style={styles.foodNext}>
                                    <TouchableOpacity onPress={()=>alert("next 간식")} >
                                        <Image source={require("../../img/ico_next_arrow.png")}/>
                                    </TouchableOpacity>
                                </View>
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
    modalContents:{
        backgroundColor:'#FFFBE9',
        borderRadius:8,
        paddingHorizontal:16,
        paddingVertical:26
    }
});