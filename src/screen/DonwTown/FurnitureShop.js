import React,{useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { View, SafeAreaView,TouchableOpacity,Image,ImageBackground,FlatList } from 'react-native';
import StyleText from '../../components/UI/StyleText';
import send from '../../modules/send';

const IMG_PREFIX = "https://image.yomis-day.com";
export default ({navigation}) => {
    const coin = useSelector(state => state.auth.userInfo.coin);
    const [lists,setLists] = useState([]);

    useEffect(()=>{
        getLists();
    },[])

    const getLists = async()=>{
        const {success,lists} = await send.get("/collection",{params:{category:'FT02'}});
        if(success){
            setLists(lists);
        }
    }

    const renderItem = ({item,index})=>{
        const MARGINTOP = index <= 1 ?  22 : 12;
        const HEIGHT = index <= 1 ? 100 : index >= 4 ? 100 : 105

        return (
            <View style={[{width: '50%',height:HEIGHT,marginTop:MARGINTOP,justifyContent:'center',alignItems:"center"}]}>
                <TouchableOpacity>
                    <Image source={{uri:IMG_PREFIX+item.FT_URL}} resizeMode="contain" style={{height:100,width:100}}/>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{height:50,flexDirection:"row",alignItems:'center',justifyContent:"space-between"}}>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <StyleText style={{paddingLeft:50,fontSize:20}} type='bold'>가구상점</StyleText>
                    <TouchableOpacity style={{position: 'absolute',height:50,width:50,justifyContent:'center',alignItems:"center"}} onPress={()=>{
                        navigation.goBack();
                    }}>
                        <Image source={require('../../img/common/ico_back.png')}  />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row",alignItems:'center',justifyContent:"flex-end",paddingRight:20}}>
                    <Image source={require("../../img/common/coin.png")} style={{width: 41,height:34,marginRight:10}}/>
                    <StyleText type='bold' style={{fontSize:20}}>{coin}</StyleText>
                </View>
            </View>
            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{
                    alert('back')
                }}>
                    <Image source={require('../../img/downtown/store-left-arrow.png')} style={{width: 21,height:36,marginHorizontal:16}} />
                </TouchableOpacity>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ImageBackground source={require("../../img/downtown/store-shelf.png")} style={{width:278,height:510,paddingHorizontal:15}}>
                        <FlatList
                            data={lists}
                            renderItem={renderItem}
                            numColumns={2}
                            horizontal={false}
                            keyExtractor={(item, index) => item.IDX}
                        />
                    </ImageBackground>
                </View>
                <TouchableOpacity onPress={()=>{
                    alert('go')
                }}>
                    <Image source={require('../../img/downtown/store-right-arrow.png')} style={{width: 21,height:36,marginHorizontal:16}} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}