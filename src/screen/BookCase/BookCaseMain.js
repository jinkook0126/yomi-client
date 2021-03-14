import React,{useState} from 'react';
import {Text,View,SafeAreaView,Image,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux';
import Dash from 'react-native-dash';
import Modal from 'react-native-modal';
import {openModal} from '../../reducers/modal';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const [order,setOrder] = useState("latest");
    const [orderText,setOrderText] = useState("최신순");
    const handleOrder=(_order)=>{
        setOrder(_order);
        switch(_order) {
            case "latest" :
                setOrderText("최신순");
                break;
            case "high" :
                setOrderText("별점 높은 순");
                break;
            case "low" :
                setOrderText("별점 낮은 순");
                break;
            case "hangeul" :
                setOrderText("가나다 순");
                break;
        }
        setVisible(false)

    }
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#ffffff' }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                        <Image source={require('../../img/ico_back.png')}  />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.commonColor,{paddingLeft:20,fontSize:16,fontWeight:'bold'}]}>책장</Text>
            </View>
            <ScrollView style={{paddingTop:16,paddingHorizontal:26}}>
                <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>현재 읽고 있는 책</Text>
                <View style={{flexWrap:'wrap',flexDirection:"row",justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("BookSearch")}}>
                        <View style={{width:90,height:116,marginTop:16,borderWidth:1,borderStyle:"dotted",borderColor:'#9E9E9E',borderRadius:6,justifyContent:"center",alignItems:'center'}}>
                            <Text style={{fontSize:10,color:"#757575",lineHeight:12}}>  새로운 책을{"\n"}추가해보세요!</Text>
                            <View style={{borderWidth:1,borderRadius:6,borderStyle:"dotted",width:28,height:28,marginTop:17,borderColor:"#9E9E9E",overflow:"hidden"}}>
                                <Dash dashLength={1} dashThickness={1} dashGap={1} dashColor={"#9E9E9E"} style={{height:1,width:22,position:'absolute',top:12,left:2.5}}/>
                                <Dash dashLength={1} dashThickness={1} dashGap={1} dashColor={"#9E9E9E"} style={{width:1,height:22,position:'absolute',top:2.5,left:13,flexDirection:'column'}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>dispatch(openModal("book"))}>
                        <View style={{width:90,height:116,marginTop:16,backgroundColor:'black'}}>
                        </View>
                    </TouchableOpacity>
                    <View style={{width:90,height:116,marginTop:16,backgroundColor:'yellow'}}>
                    </View>
                    <View style={{width:90,height:116,marginTop:16,backgroundColor:'green'}}>
                    </View>
                </View>
                <View style={{marginTop:28}}>
                    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                        <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>완독한 책</Text>
                        <TouchableOpacity onPress={()=>setVisible(true)}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image source={require("../../img/ico_orderby.png")}/>
                                <Text style={[styles.commonColor,{fontSize:12,fontWeight:'bold',marginLeft:4}]}>{orderText}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexWrap:'wrap',flexDirection:"row",justifyContent:'space-between'}}>
                        <View style={{width:90,height:116,marginTop:16,backgroundColor:'black'}}>
                        </View>
                        <View style={{width:90,height:116,marginTop:16,backgroundColor:'yellow'}}>
                        </View>
                        <View style={{width:90,height:116,marginTop:16,backgroundColor:'green'}}>
                        </View>
                    </View> 
                </View>
            </ScrollView>
            <Modal
                useNativeDriver
                isVisible={visible}
                hideModalContentWhileAnimating={true}
                style={{margin:0,justifyContent:'flex-end'}}
                onBackdropPress={()=>{setVisible(false)}}
            >
                <View style={styles.modalContents}>
                    <TouchableOpacity onPress={()=>handleOrder("latest")}>
                        <View style={styles.modalItemWrap}>
                            <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>최신순</Text>
                            {
                                order === "latest" ? <Image source={require("../../img/ico_check.png")}/> : null
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleOrder("high")}>
                        <View style={styles.modalItemWrap}>
                            <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>별점 높은순</Text>
                            {
                                order === "high" ? <Image source={require("../../img/ico_check.png")}/> : null
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleOrder("low")}>
                        <View style={styles.modalItemWrap}>
                            <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>별점 낮은순</Text>
                            {
                                order === "low" ? <Image source={require("../../img/ico_check.png")}/> : null
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleOrder("hangeul")}>
                        <View style={styles.modalItemWrap}>
                            <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>가나다순</Text>
                            {
                                order === "hangeul" ? <Image source={require("../../img/ico_check.png")}/> : null
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    },
    modalContents:{
        backgroundColor:'#ffffff',
        borderTopRightRadius:8,
        borderTopLeftRadius:8,
        paddingHorizontal:16,
        paddingTop:12
    },
    modalItemWrap:{
        flexDirection:"row",
        borderBottomColor:'#EEEEEE',
        borderBottomWidth:1,
        paddingVertical:16,
        justifyContent:"space-between",
        alignItems:"center"
    }
});