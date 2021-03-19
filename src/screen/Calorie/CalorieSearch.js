import React,{useState} from 'react';
import {Text,View,SafeAreaView,Image,StyleSheet,TouchableOpacity, ImageBackground} from 'react-native'
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';

export default ({navigation,route})=>{
    const dispatch = useDispatch();
    const [isVisible,setIsVisible] = useState(false);
    const [extraView,setExtraView] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center',justifyContent:"space-between"}}>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                            <Image source={require('../../img/ico_back.png')}  />
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.commonColor,{paddingLeft:20,fontSize:16,fontWeight:'bold'}]}>{route.params.header}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:'center',justifyContent:"flex-end",paddingRight:26}}>
                    <Text style={[styles.commonColor,{fontSize:'bold',fontSize:14}]}>0</Text>
                    <TouchableOpacity onPress={()=>{
                        setIsVisible(true)
                    }}>
                        <View style={{height:50,width:20,justifyContent:'center',alignItems:"flex-end",marginLeft:6}}>
                            <Image source={require('../../img/ico_food.png')}  />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1,paddingHorizontal:26,paddingVertical:16,justifyContent:'space-between'}}>
                <View>
                    <View style={{border:1,borderColor:'#EEEEEE',borderRadius:2,height:36,backgroundColor:"#FFFFFF",flexDirection:"row",justifyContent:"space-between",alignItems:'center',paddingHorizontal:12}}>
                        <TextInput
                            style={{flex:1,padding:0,height:30}}
                        />
                        <TouchableOpacity onPress={()=>alert(132)}>
                            <Image source={require("../../img/ico_search.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10,border:1,borderColor:'#EEEEEE',borderRadius:2,height:300}}>

                    </View>
                    <TouchableOpacity onPress={()=>setExtraView(!extraView)}>
                        <View style={{marginTop:16,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
                            <Text>직접입력</Text>
                            {
                                extraView? 
                                    <Image source={require("../../img/ico_minus.png")} style={{marginLeft:10}}/>
                                :
                                    <Image source={require("../../img/ico_plus.png")} style={{marginLeft:10}}/>
                            }
                        </View>        
                    </TouchableOpacity>
                    {
                        extraView? 
                            <View style={{marginTop:10}}>
                                <View style={{height:36,borderRadius:2,borderColor:'#EEEEEE',borderWidth:1,paddingHorizontal:10}}>
                                    <TextInput
                                        placeholder={"음식 이름"}
                                        style={{padding:0,height:36,flex:1}}
                                    />
                                </View>
                                <View style={{marginTop:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                    <View style={{height:36,width:160,borderRadius:2,borderColor:'#EEEEEE',borderWidth:1,paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                                        <TextInput
                                            placeholder={"열량"}
                                            style={{padding:0,height:36,flex:1}}
                                        />
                                        <Text style={[styles.commonColor,{fontSize:"bold",fontSize:14,marginLeft:5}]}>Kcal</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:"center"}}>
                                        <View style={{marginRight:10,justifyContent:"space-between",alignItems:'center',flexDirection:"row"}}>
                                            <TouchableOpacity>
                                                <Image source={require("../../img/ico_minus.png")}/>
                                            </TouchableOpacity>
                                            <View style={{backgroundColor:'#EEEEEE',height:29,width:34,marginHorizontal:6,justifyContent:"center",alignItems:'center'}}>
                                                <Text style={[styles.commonColor,{fontSize:15,fontWeight:'bold'}]}>0</Text>
                                            </View>
                                            <TouchableOpacity>
                                                <Image source={require("../../img/ico_plus.png")}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{height:36,width:54,backgroundColor:"#8C6C51",justifyContent:'center',alignItems:'center',borderRadius:2}}>
                                            <Text style={{color:"#FFFFFF",fontWeight:'bold',fontSize:14}}>추가</Text>            
                                        </View>
                                    </View>
                                </View>
                            </View>
                        :
                            null
                    }
                </View>
                <TouchableOpacity onPress={()=>alert("wjwjw")}>
                    <View style={{backgroundColor:"#8C6C51",height:40,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:"#FFFFFF",fontWeight:'bold',fontSize:14}}>저장</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal 
                useNativeDriver
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                isVisible={isVisible}
                hideModalContentWhileAnimating={true}
                onBackdropPress={()=>{setIsVisible(false)}}
                style={{justifyContent:'flex-start',marginTop:40}}
            >
                <ImageBackground source={require('../../img/bg_cal_popup.png')} style={{height:220}}>
                    <View style={{height:168,marginTop:26,paddingHorizontal:21}}>
                        <View style={{marginTop:10,flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>
                            <View style={{flexDirection:"row",alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>alert('삭제')}>
                                    <Image source={require("../../img/ico_close.png")}/>
                                </TouchableOpacity>
                                <Text style={{marginLeft:20 }}>김치찌개</Text>
                            </View>
                            <View>
                                <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>500Kcal</Text>
                            </View>
                            <View style={{flexDirection:"row",alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>alert('삭제')}>
                                    <Image source={require("../../img/ico_minus.png")}/>
                                </TouchableOpacity>
                                <View style={{backgroundColor:"#EEEEEE",width:20,height:20,marginHorizontal:6,justifyContent:'center',alignItems:'center'}}>
                                     <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:15}]}>1</Text>
                                </View>
                                <TouchableOpacity onPress={()=>alert('삭제')}>
                                    <Image source={require("../../img/ico_plus.png")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop:10,flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>
                            <View style={{flexDirection:"row",alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>alert('삭제')}>
                                    <Image source={require("../../img/ico_close.png")}/>
                                </TouchableOpacity>
                                <Text style={{marginLeft:20 }}>계란</Text>
                            </View>
                            <View>
                                <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>3 0Kcal</Text>
                            </View>
                            <View style={{flexDirection:"row",alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>alert('삭제')}>
                                    <Image source={require("../../img/ico_minus.png")}/>
                                </TouchableOpacity>
                                <View style={{backgroundColor:"#EEEEEE",width:20,height:20,marginHorizontal:6,justifyContent:'center',alignItems:'center'}}>
                                     <Text style={[styles.commonColor,{fontWeight:'bold',fontSize:15}]}>1</Text>
                                </View>
                                <TouchableOpacity onPress={()=>alert('삭제')}>
                                    <Image source={require("../../img/ico_plus.png")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </Modal>
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