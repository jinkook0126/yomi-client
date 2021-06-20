import React,{useState,useEffect} from 'react';
import { Text, View,FlatList,SafeAreaView,Image,TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import {openModal} from '../../reducers/modal';
import send from '../../modules/send';

const img_prefix = "https://yomi-image.s3.ap-northeast-2.amazonaws.com";
export default ()=>{
    const dispatch = useDispatch();
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
            alert('코인이 부족합니다.')
        } else {
            const {success,coin:dbCoin,category} = await send.post("/collection/buy",{id:code});
            if(success) {
                alert("구매하였습니다.");
                setCoin(dbCoin);
                renderCategory(category);
            }
        }
    }

    const activeItem = async(code) => {
        const {success,msg} = await send.put("/collection/active",{id:code});
        if(success) {
            alert("적용하였습니다.");
        } else {
            alert(msg);
        }
    }


    const renderItem = ({item,index})=>{
        return (
            <View style={{alignItems:"center"}}>
                <TouchableOpacity onPress={()=>handlePreview(item.FT_URL)}>
                    <Image source={{ uri: img_prefix+item.FT_URL }} style={{width:57,height:47,resizeMode:'stretch',justifyContent:"space-around"}}/>
                </TouchableOpacity>
                <Text style={{fontSize:12,color:"#000000",fontWeight:'bold',marginTop:14}}>{item.FT_PRICE} coin</Text>
                {
                    item.has ? 
                    (
                        <TouchableOpacity onPress={()=>activeItem(item.FT_ID)}>
                            <View style={{marginTop:12,borderRadius:6,width:60,height:28,backgroundColor:"#8C6C51",justifyContent:'center',alignItems:"center"}}>
                                <Text style={{fontSize:11,color:"#FFFFFF",fontWeight:'bold'}}>적용하기</Text>
                            </View>
                        </TouchableOpacity>
                        
                    )
                    :
                    (
                        <TouchableOpacity onPress={()=>buyItem(item.FT_ID,item.FT_PRICE)}>
                        <View style={{marginTop:12,borderRadius:6,width:60,height:28,backgroundColor:"#7A6FE5",justifyContent:'center',alignItems:"center"}}>
                                <Text style={{fontSize:11,color:"#FFFFFF",fontWeight:'bold'}}>구매하기</Text>
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
                <Text style={{fontSize:16,fontWeight:"bold",color:"#000000",marginLeft:14}}>{coin} coin</Text>
            </View>
            <View style={{height:4,backgroundColor:'#EEEEEE'}}>
            </View>
            <View style={{padding:20}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                    <TouchableOpacity onPress={()=>handleCategory('FT01')}>
                        <Text style={{fontWeight:'bold',color:selectHeader('FT01'),fontSize:15}}>냉장고</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleCategory('FT02')}>
                        <Text style={{fontWeight:'bold',color:selectHeader('FT02'),fontSize:15}}>책상</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleCategory('FT03')}>
                        <Text style={{fontWeight:'bold',color:selectHeader('FT03'),fontSize:15}}>운동기구</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleCategory('FT04')}>
                        <Text style={{fontWeight:'bold',color:selectHeader('FT04'),fontSize:15}}>일기장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleCategory('FT05')}>
                        <Text style={{fontWeight:'bold',color:selectHeader('FT05'),fontSize:15}}>책장</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical:16,marginTop:30,elevation:2,backgroundColor:"#FFFFFF",alignItems:"center"}}>
                    <Text style={{fontSize:14,fontWeight:'bold',color:"#000000"}}>미리보기</Text>
                    {
                        previewUri !== "" ?
                        <Image source = {{ uri: img_prefix+previewUri}}  style={{width:112,height:80,resizeMode:'stretch',marginTop:25}}/>
                        :
                        <View style={{height:80,marginTop:25}}></View>
                    }
                </View>
                <View style={{marginTop:20,elevation:2,backgroundColor:"#FFFFFF",paddingVertical:20,alignItems:'center'}}>
                    <Text style={{fontSize:14,fontWeight:'bold',color:"#000000"}}>구매</Text>
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