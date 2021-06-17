import React,{useState,useEffect} from 'react';
import {Text,View,SafeAreaView,Image,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux';
import Dash from 'react-native-dash';
import Modal from 'react-native-modal';
import {openModalWithProps} from '../../reducers/modal';
import { Rating } from 'react-native-ratings';
import send from '../../modules/send';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const [order,setOrder] = useState("latest");
    const [ingList,setIngList] = useState([]);
    const [compList,setCompList] = useState([]);
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
        setVisible(false);
    }
    useEffect(()=>{
        getList();
    },[order])
    const getList = async()=>{
        const {success,complete,incomplete} = await send.get("/contents/book/list",{params:{order:order}});
        if(success) {
            setCompList(complete);
            setIngList(incomplete);
        }
    }
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', async() => {
            getList();
        });
        return unsubscribe;
    },[navigation]);

    const handleIngBook = (isbn)=>{
        ingList.forEach((item,idx)=>{
            if(item.ISBN === isbn) 
                dispatch(openModalWithProps('book',{
                    thumbnail:item.BOOK_URL,
                    memo:item.U_MEMO,
                    rating:item.STAR_RATE,
                    contents:item.BOOK_SUMMARY,
                    title:item.BOOK_NM,
                    idx:item.IDX,
                    authors:item.BOOK_AUTHOR,
                    comp:false,
                    refresh:getList
                }));
        })
    }

    const handleCompBook = (isbn)=>{
        compList.forEach((item,idx)=>{
            if(item.ISBN === isbn) 
                dispatch(openModalWithProps('bookRg',{
                    mode:"update",
                    thumbnail:item.BOOK_URL,
                    memo:item.U_MEMO,
                    rating:item.STAR_RATE,
                    contents:item.BOOK_SUMMARY,
                    title:item.BOOK_NM,
                    idx:item.IDX,
                    authors:item.BOOK_AUTHOR,
                    comp:true,
                    refresh:getList
                }));
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
                    {
                        ingList.map((item,index)=>{
                            return (
                                <TouchableOpacity style={{marginTop:16}} key={index} onPress={()=>{handleIngBook(item.ISBN)}}>
                                    <Image source={{uri:item.BOOK_URL}} style={{width:90,height:116,borderRadius:6}} />
                                    <View style={{width:90}}>
                                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={{color:'#2B2B2B',fontSize:14,marginTop:6}}>{item.BOOK_NM}</Text>
                                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={{color:'#757575',fontSize:10,marginTop:2}}>{item.BOOK_NM}</Text>
                                    </View>
                                    <View style={{alignItems:"flex-start"}}>
                                        <Rating
                                            readonly={true}
                                            fractions={2}
                                            ratingCount={5}
                                            minValue={0.5}
                                            jumpValue={0.5}
                                            imageSize={14}
                                            startingValue={parseFloat(item.STAR_RATE)}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={{marginVertical:28}}>
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
                    {
                        compList.map((item,index)=>{
                            return (
                                <TouchableOpacity style={{marginTop:16}} key={index} onPress={()=>{handleCompBook(item.ISBN)}}>
                                    <Image source={{uri:item.BOOK_URL}} style={{width:90,height:116,borderRadius:6}} />
                                    <View style={{width:90}}>
                                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={{color:'#2B2B2B',fontSize:14,marginTop:6}}>{item.BOOK_NM}</Text>
                                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={{color:'#757575',fontSize:10,marginTop:2}}>{item.BOOK_NM}</Text>
                                    </View>
                                    <View style={{alignItems:"flex-start"}}>
                                        <Rating
                                            readonly={true}
                                            fractions={2}
                                            ratingCount={5}
                                            minValue={0.5}
                                            jumpValue={0.5}
                                            imageSize={14}
                                            startingValue={parseFloat(item.STAR_RATE)}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
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