import * as React from 'react';
import { Text, View,Button,SafeAreaView,Image,TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import {openModal} from '../../reducers/modal';

const img_prefix = "https://yomi-image.s3.ap-northeast-2.amazonaws.com";
export default ()=>{
    const dispatch = useDispatch();
    const openModalTest=(target)=>{
        dispatch(openModal(target));
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
                    <Image source = {{ uri: 'https://yomi-image.s3.ap-northeast-2.amazonaws.com/desk/desk01.png'}}  style={{width:112,height:80,resizeMode:'stretch',marginTop:25}}/>
                </View>
                <View style={{marginTop:20,elevation:2,backgroundColor:"#FFFFFF"}}>
                    
                </View>
            </View>
        </SafeAreaView>
    )
}