import React,{useState} from 'react';
import {Text,View,SafeAreaView,Image,FlatList,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {openModal} from '../../reducers/modal';
const API_KEY = "a5bf620feebcc2c9bf7af09e3eb5d39d";

export default ({navigation})=>{
    const dispatch = useDispatch();
    const [searchTitle,setSearchTitle] = useState("");
    const [searchList,setSearchList] = useState([]);
    const [totalCnt,setTotalCnt] = useState(0);
    const [page,setPage] = useState(1);
    const [isEnd,setisEnd] = useState(false);
    

    const doSearch = async(isSearch)=>{
        if(isSearch) {
            setSearchList([])
        }
        let bookList = [];
        const {data} = await axios.get("https://dapi.kakao.com/v3/search/book?target=title",{
            params:{
                query:searchTitle,
                size:15,
                page:isSearch?1:page
            },
            headers:{
                Authorization:`KakaoAK ${API_KEY}`
            }
        });
        for (const {authors, title, thumbnail,isbn,contents} of data.documents) {
            bookList.push({
                authors:authors.join(', '),
                title:title,
                thumbnail:thumbnail,
                isbn:isbn,
                contents:contents
            })
        }
        setPage(isSearch?2:page+1)
        setisEnd(data.meta.is_end)
        setSearchList(isSearch?bookList:searchList.concat(bookList))
        setTotalCnt(data.meta.total_count)
    }
    
    const handleLoadMore = ()=>{
        if(isEnd === false) {
            doSearch()
        }
    }
    const renderItem = ({item,index}) =>{
        const imgUrl = item.thumbnail !== "" ? {uri:item.thumbnail} : require('../../img/emptyThumbnail.png')
        // console.log(searchList[index])
        return (
            <TouchableOpacity onPress={()=>dispatch(openModal('book'))}>
                <View style={{padding:4}}>
                    <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:"#EEEEEE"}}>
                        <Image source={imgUrl} style={{width:67,height:84}}/>
                        <View style={{paddingLeft:4,flex:1,height:84,overflow:"hidden"}}>
                            <Text style={[styles.commonColor,{fontSize:14,fontWeight:'bold'}]}>{item.title}</Text>
                            <Text style={{fontSize:10,color:"#757575"}}>{item.authors}</Text>
                            <Text numberOfLines={4} ellipsizeMode={"tail"} style={{fontSize:8,color:'#757575',lineHeight:11}}>{item.contents}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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
                <Text style={[styles.commonColor,{paddingLeft:20,fontSize:16,fontWeight:'bold'}]}>책 검색</Text>
            </View>
            <View style={{flex:1,paddingVertical:20,paddingHorizontal:26}}>
                <View style={{borderWidth:1,borderColor:"#EEEEEE",borderRadius:2,height:36,flexDirection:"row",alignItems:"center",justifyContent:'space-between',paddingHorizontal:12,overflow:"hidden"}}>
                    <TextInput onChangeText={(value)=>setSearchTitle(value)} style={{flex:1,height:30,alignItems:"stretch",paddingVertical:0}}></TextInput>
                    <TouchableOpacity onPress={()=>doSearch(true)} style={{width:25,height:25,justifyContent:"center",alignItems:'center'}}>
                        <Image source={require("../../img/ico_search.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:26,flex:1}}>
                    <Text style={[styles.commonColor,{fontSize:12,fontWeight:'bold'}]}>총 {totalCnt} 건의 검색 결과</Text>
                    <View style={[styles.listContainer,{marginTop:10,border:1,flex:1,overflow:"hidden"}]}>
                        <FlatList
                            data={searchList}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => String(index)}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={1}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    commonColor: {
        color:"#2B2B2B"
    },
    listContainer:{
        elevation:1
    }
});