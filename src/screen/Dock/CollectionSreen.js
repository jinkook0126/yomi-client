import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {  View,FlatList,SafeAreaView,Image,TouchableOpacity,StyleSheet } from 'react-native';
import send from '../../modules/send';
import { updateFurniture } from '../../reducers/furniture'
import StyleText from '../../components/UI/StyleText';
import { useSnackbarContext } from '@dooboo-ui/snackbar';

const img_prefix = "https://yomi-image.s3.ap-northeast-2.amazonaws.com";
export default ()=>{
    const dispatch = useDispatch();
    const snackbar = useSnackbarContext();
    const [itemList,setItemList] = useState([]);
    const [selectCt,setSelectCt] = useState('FT02');
    const [previewUri,setPreviewUri] = useState("");
    const [coin,setCoin] = useState(0);

    useEffect(()=>{
        renderCategory('FT02');
    },[]);

    const renderCategory = async (code)=> {
        const {success,lists,coin:dbCoin} = await send.get("/collection",{params:{category:code}});
        if(success){
            setItemList(lists);
            setCoin(dbCoin);
        }
    }

    const handleCategory = (ct) =>{
        renderCategory(ct);
        setSelectCt(ct);
        setPreviewUri("");
    }
    
    const selectHeader = (ct) => (
        selectCt === ct ? "#000000" : '#616161'
    )

    const handlePreview = (uri) =>{
        setPreviewUri(uri)
    }

    const buyItem = async(code,price) => {
        if(price > coin) {
            snackbar.show({text:"코인이 부족합니다."});
        } else {
            const {success,coin:dbCoin,category} = await send.post("/collection/buy",{id:code});
            if(success) {
                snackbar.show({text:"구매하였습니다."});
                setCoin(dbCoin);
                renderCategory(category);
            }
        }
    }

    const activeItem = async(code) => {
        const {success,ftInfo,msg} = await send.put("/collection/active",{id:code});
        if(success) {
            snackbar.show({text:"적용하였습니다."});
            dispatch(updateFurniture(ftInfo))
        } else {
            snackbar.show({text:msg});
        }
    }


    const renderItem = ({item,index})=>{
        return (
            <View style={{alignItems:"center"}}>
                <TouchableOpacity onPress={()=>handlePreview(item.FT_URL)}>
                    <Image source={{ uri: img_prefix+item.FT_URL }} style={{width:57,height:47,resizeMode:'stretch',justifyContent:"space-around"}}/>
                </TouchableOpacity>
                <StyleText style={{fontSize:12,color:"#000000",marginTop:14}}>{item.FT_PRICE} coin</StyleText>
                {
                    item.has ? 
                    (
                        <TouchableOpacity onPress={()=>activeItem(item.FT_ID)}>
                            <View style={{marginTop:12,borderRadius:6,width:60,height:28,backgroundColor:"#8C6C51",justifyContent:'center',alignItems:"center"}}>
                                <StyleText style={{fontSize:11,color:"#FFFFFF"}}>적용하기</StyleText>
                            </View>
                        </TouchableOpacity>
                        
                    )
                    :
                    (
                        <TouchableOpacity onPress={()=>buyItem(item.FT_ID,item.FT_PRICE)}>
                        <View style={{marginTop:12,borderRadius:6,width:60,height:28,backgroundColor:"#7A6FE5",justifyContent:'center',alignItems:"center"}}>
                                <StyleText style={{fontSize:11,color:"#FFFFFF"}}>구매하기</StyleText>
                            </View>
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }
    
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#FFFFFF"}}>
            <View style={{height:66,flexDirection:"row",padding:20,alignItems:"center"}}>
                <Image source={require('../../img/ico_symbol.png')}/>
                <StyleText style={{fontSize:16,color:"#000000",marginLeft:14}}>{coin} coin</StyleText>
            </View>
            <View style={{height:4,backgroundColor:'#EEEEEE'}}>
            </View>
            <View style={{padding:20}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                    <TouchableOpacity onPress={()=>handleCategory('FT01')}>
                        <StyleText style={[styles.category,{color:selectHeader('FT01')}]}>냉장고</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleCategory('FT02')}>
                        <StyleText style={[styles.category,{color:selectHeader('FT02')}]}>책상</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleCategory('FT03')}>
                        <StyleText style={[styles.category,{color:selectHeader('FT03')}]}>운동기구</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleCategory('FT04')}>
                        <StyleText style={[styles.category,{color:selectHeader('FT04')}]}>일기장</StyleText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleCategory('FT05')}>
                        <StyleText style={[styles.category,{color:selectHeader('FT05')}]}>책장</StyleText>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical:16,marginTop:30,elevation:2,backgroundColor:"#FFFFFF",alignItems:"center"}}>
                    <StyleText style={{fontSize:14,color:"#000000"}}>미리보기</StyleText>
                    {
                        previewUri !== "" ?
                        <Image source = {{ uri: img_prefix+previewUri}}  style={{width:112,height:80,resizeMode:'stretch',marginTop:25}}/>
                        :
                        <View style={{height:80,marginTop:25}}></View>
                    }
                </View>
                <View style={{marginTop:20,elevation:2,backgroundColor:"#FFFFFF",paddingVertical:20,alignItems:'center'}}>
                    <StyleText style={{fontSize:14,color:"#000000"}}>구매</StyleText>
                    <FlatList
                        data={itemList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                        style={{marginTop:20,marginHorizontal:20}}
                        horizontal={true}
                        ItemSeparatorComponent={() => <View style={{margin: 24}}/>}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    category:{ fontSize:15 }
})