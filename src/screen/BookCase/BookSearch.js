import React,{useState} from 'react';
import { View,SafeAreaView,Image,FlatList,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux';
import send from '../../modules/send';
import {openModalWithProps} from '../../reducers/modal';
import StyleText from '../../components/UI/StyleText';
import StyleInput from '../../components/UI/StyleInput';

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
        const {documents,meta} = await send.get("/contents/book/search",{params:{page:isSearch?1:page,searchTitle:searchTitle}})
        
        for (const {authors, title, thumbnail,isbn,contents} of documents) {
            bookList.push({
                authors:authors.join(', '),
                title:title,
                thumbnail:thumbnail,
                isbn:isbn,
                contents:contents
            })
        }
        setPage(isSearch?2:page+1)
        setisEnd(meta.is_end)
        setSearchList(isSearch?bookList:searchList.concat(bookList))
        setTotalCnt(meta.total_count)
    }
    
    const handleLoadMore = ()=>{
        if(isEnd === false) {
            doSearch()
        }
    }
    const renderItem = ({item,index}) =>{
        const imgUrl = item.thumbnail !== "" ? {uri:item.thumbnail} : require('../../img/emptyThumbnail.png')
        return (
            <TouchableOpacity onPress={()=>dispatch(openModalWithProps('bookRg',{...searchList[index],mode:"new"}))}>
                <View style={{padding:4}}>
                    <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:"#EEEEEE"}}>
                        <Image source={imgUrl} style={{width:67,height:84}}/>
                        <View style={{paddingLeft:4,flex:1,height:84,overflow:"hidden"}}>
                            <StyleText>{item.title}</StyleText>
                            <StyleText style={{fontSize:10,color:"#757575"}}>{item.authors}</StyleText>
                            <StyleText numberOfLines={4} ellipsizeMode={"tail"} style={{fontSize:8,color:'#757575',lineHeight:11}}>{item.contents}</StyleText>
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
                        <Image source={require('../../img/common/ico_back.png')}  />
                    </View>
                </TouchableOpacity>
                <StyleText style={{paddingLeft:20,fontSize:16}}>책 검색</StyleText>
            </View>
            <View style={{flex:1,paddingVertical:20,paddingHorizontal:26}}>
                <ImageBackground source={require("../../img/calorie/search_border.png")} resizeMode={'stretch'} style={{height:39,backgroundColor:"#FFFFFF",flexDirection:"row",justifyContent:"space-between",alignItems:'center',paddingHorizontal:12}}>
                    <StyleInput onChangeText={(value)=>setSearchTitle(value)} style={{flex:1,height:30,alignItems:"stretch",paddingVertical:0}}></StyleInput>
                    <TouchableOpacity onPress={()=>doSearch(true)} style={{width:25,height:25,justifyContent:"center",alignItems:'center'}}>
                        <Image source={require("../../img/common/ico_search.png")}/>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{marginTop:26,flex:1}}>
                    <StyleText style={{fontSize:12}}>총 {totalCnt} 건의 검색 결과</StyleText>
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
    listContainer:{
        elevation:1
    }
});