import React,{useState} from 'react';
import { Text, View,FlatList,SafeAreaView,Image,TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import {openModal} from '../../reducers/modal';

const img_prefix = "https://yomi-image.s3.ap-northeast-2.amazonaws.com";
export default ()=>{
    const dispatch = useDispatch();
    const [itemList,setItemList] = useState([
        {
            url:'/desk/desk01.png',
            have:false,
            price:1
        },
        {
            url:'/desk/desk02.png',
            have:false,
            price:2
        },
        {
            url:'/desk/desk03.jpg',
            have:false,
            price:3
        },
        {
            url:'/desk/desk04.jpg',
            have:true,
            price:4
        },
        {
            url:'/desk/desk05.png',
            have:false,
            price:5
        },
    ])
    const openModalTest=(target)=>{
        dispatch(openModal(target));
    }


    const renderItem = ({item,index})=>{
        return (
            <View style={{alignItems:"center"}}>
                <Image source={{ uri: img_prefix+item.url}} style={{width:57,height:47,resizeMode:'stretch',justifyContent:"space-around"}}/>
                <Text style={{fontSize:12,color:"#000000",fontWeight:'bold',marginTop:14}}>{item.price} coin</Text>
                {
                    item.have ? 
                    (
                        <View style={{marginTop:12,borderRadius:6,width:60,height:28,backgroundColor:"#8C6C51",justifyContent:'center',alignItems:"center"}}>
                            <Text style={{fontSize:11,color:"#FFFFFF",fontWeight:'bold'}}>보유중</Text>
                        </View>
                    )
                    :
                    (
                        <View style={{marginTop:12,borderRadius:6,width:60,height:28,backgroundColor:"#7A6FE5",justifyContent:'center',alignItems:"center"}}>
                            <Text style={{fontSize:11,color:"#FFFFFF",fontWeight:'bold'}}>구매하기</Text>
                        </View>
                    )
                }
            </View>
        )
    }
    
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#FFFFFF"}}>
            <View style={{height:66,flexDirection:"row",padding:20,alignItems:"center"}}>
                <Image source={require('../../img/ico_symbol.png')}/>
                <Text style={{fontSize:16,fontWeight:"bold",color:"#000000",marginLeft:14}}>2 coin</Text>
            </View>
            <View style={{height:4,backgroundColor:'#EEEEEE'}}>
            </View>
            <View style={{padding:20}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                    <TouchableOpacity>
                        <Text style={{fontWeight:'bold',color:'#616161',fontSize:15}}>냉장고</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontWeight:'bold',color:'#000000',fontSize:15}}>책상</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontWeight:'bold',color:'#616161',fontSize:15}}>운동기구</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontWeight:'bold',color:'#616161',fontSize:15}}>일기장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontWeight:'bold',color:'#616161',fontSize:15}}>책장</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical:16,marginTop:30,elevation:2,backgroundColor:"#FFFFFF",alignItems:"center"}}>
                    <Text style={{fontSize:14,fontWeight:'bold',color:"#000000"}}>미리보기</Text>
                    <Image source = {{ uri: img_prefix+'/desk/desk01.png'}}  style={{width:112,height:80,resizeMode:'stretch',marginTop:25}}/>
                </View>
                <View style={{marginTop:20,elevation:2,backgroundColor:"#FFFFFF",paddingVertical:20,alignItems:'center'}}>
                    <Text style={{fontSize:14,fontWeight:'bold',color:"#000000"}}>미리보기</Text>
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