import React,{useState} from 'react';
import { TextInput,View,Button,FlatList,Image } from 'react-native';
import { useDispatch } from 'react-redux';
import {closeModal} from '../reducers/modal';
import axios from 'axios';
import StyleText from '../components/UI/StyleText';
export default ()=>{
    const dispatch = useDispatch();
    const API_KEY = "a5bf620feebcc2c9bf7af09e3eb5d39d";
    const [bookSelect,setBookSelect] = useState([]);
    const [bookTitle,setBookTitle] = useState("");
    const searchBooks = async()=>{
        let emtpyArr = [];
        const {data} = await axios.get("https://dapi.kakao.com/v3/search/book?target=title",{
            params:{
                query:bookTitle
            },
            headers:{
                Authorization:`KakaoAK ${API_KEY}`
            }
        });
        for (const {authors, title, thumbnail,isbn} of data.documents) {
            emtpyArr.push({
                authors:authors[0],
                title:title,
                thumbnail:thumbnail,
                isbn:isbn
            })
        }
        setBookSelect(emtpyArr);
    };
    const renderItem = ({item}) =>{
        const imgUrl = item.thumbnail !== "" ? {uri:item.thumbnail} : require('../img/emptyThumbnail.png')
        return (
            <View style={{borderBottomWidth:1,padding:3}}>
                <Image source={imgUrl} style={{width:40,height:40,resizeMode:"contain"}}/>
                <StyleText>{item.title}</StyleText>
                <StyleText>{item.authors}</StyleText>
            </View>
        )
    }
    return (
        <View style={{width:300,paddingHorizontal:12, paddingVertical:8,backgroundColor:'white',height:400}}>
            <View style={{paddingVertical:8}}>
                <TextInput placeholder="음식 검색" onChangeText={text=>setBookTitle(text)} value={bookTitle} style={{borderWidth:1,borderColor:'grey'}} />
            </View>
            <View style={{paddingVertical:8}}>
                <Button title="search" onPress={searchBooks}/>
            </View>
            <FlatList 
                data={bookSelect}
                renderItem={renderItem}
                keyExtractor={item=> item.isbn}
                style={{height:"50%",borderWidth:1,borderColor:'red',flexGrow:0}}
            />
            <View style={{paddingTop:30}}>
                <Button title="MDOAL CLOSE!!" onPress={()=>dispatch(closeModal())}></Button>
            </View>
        </View>
    )
}