import React,{useState,useEffect} from 'react';
import { View,SafeAreaView,Image,Dimensions,StyleSheet,TouchableOpacity,TextInput,Alert } from 'react-native'
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';
import send from '../../modules/send';;
import {formatDate} from '../../modules/common'
import StyleText from '../../components/UI/StyleText';

export default ({navigation})=>{
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const [inputDiary,setInputDiary] = useState("");
    const [diaryList,setDiaryList] = useState([]);
    const [diaryDate,setDiaryDate] = useState("");
    const [today,setToday] = useState({});
    const [updateNo,setUpdateNo] = useState("");

    useEffect(()=>{
        getList();
    },[])
    const getList = async()=>{
        const {success,rows,today} = await send.get('/contents/diary');
        if(success) {
            if(today) {
                setToday(today)
            } else{
                setToday({})
            }
            setDiaryList(rows)
        }
    }
    const handleModalSave = async()=>{
        let flag = false;
        
        if(Object.keys(today).length === 0 && updateNo === "" && inputDiary !== "") { //신규
            const {success} =await send.post('/contents/diary',{diary:inputDiary});
            flag = success;
        } else if(Object.keys(today).length !== 0 && inputDiary !== ""){ // 수정
            const {success} =await send.put('/contents/diary',{diary:inputDiary,index:updateNo||today.IDX});
            flag = success;
        } else if(inputDiary === ""){ // 삭제
            const {success} =await send.delete('/contents/diary',{params:{index:updateNo||today.IDX}});
            flag = success;
        }
        if(flag) {
            Alert.alert("알림","저장되었습니다.",[{text:'저장',onPress:()=>{
                getList();
                setVisible(false)
            }}])
        }
    }
    const dashedDate = (date)=>{
        return `${date.substr(0,4)}-${date.substr(4,2)}-${date.substr(6,2)}`;
    }
    const openDiaryModal = (_idx)=>{
        setUpdateNo(_idx)
        diaryList.map((item,index)=>{
            if(item.IDX === _idx) {
                setInputDiary(item.CONTENTS);
                setDiaryDate(dashedDate(item.DATE_DT))
            }
        });
        setVisible(true);
    }
    const openTodayDiaryModal = ()=>{
        setUpdateNo("")
        if(Object.keys(today).length === 0) {
            setDiaryDate(dashedDate(formatDate()))
        } else {
            setDiaryDate(dashedDate(today.DATE_DT))
        }

        setInputDiary(today.CONTENTS);
        setVisible(true);
    }
    const renderItem=({item,index})=>{
        const margin = (Dimensions.get('window').width-(90*3)-(26*2)) / 2;
        
        return (
            <TouchableOpacity onPress={()=>openDiaryModal(item.IDX)}>
                <View style={{marginTop:16,alignItems:"center",marginLeft:index%3===0?0:margin}}>
                    <View style={{width:90,height:116,borderWidth:1,borderStyle:"dotted",borderColor:'#9E9E9E',borderRadius:6,padding:6}}>
                        <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
                            <Image source={require('../../img/emoji_02.png')}/>
                        </View>
                        <View style={{marginTop:5}}>
                            <StyleText numberOfLines={7} ellipsizeMode={"tail"} style={{fontSize:8}}>{item.CONTENTS}</StyleText>
                        </View>
                    </View>
                    <StyleText style={{marginTop:10}}>{dashedDate(item.DATE_DT)}</StyleText>
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
                <StyleText style={{paddingLeft:20,fontSize:16,}}>일기장</StyleText>
            </View>
            <View style={{marginTop:16,paddingHorizontal:26,paddingBottom:26,flex:1}}>
                <StyleText style={{fontSize:14}}>오늘의 일기</StyleText>
                <TouchableOpacity onPress={openTodayDiaryModal}>
                    <View style={{height:153,backgroundColor:"#FFFBE9",marginTop:16,paddingHorizontal:16,borderRadius:6}}>
                        <View style={{marginTop:10,alignItems:"flex-end"}}>
                            <Image source={require('../../img/emoji_01.png')}  />
                        </View>
                        <View style={{marginTop:10,paddingBottom:16}}>
                            <StyleText numberOfLines={6} ellipsizeMode={"tail"} style={{fontSize:12}}>{today.CONTENTS}</StyleText>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{marginTop:26,flex:1}}>
                    <StyleText>지난 일기</StyleText>
                    <FlatList 
                        numColumns={3}
                        data={diaryList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                        style={{flex:1}}
                        ListFooterComponent={ <View style={{ marginTop:16 }} /> }
                    />
                </View>
            </View>
            <Modal
                useNativeDriver
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                isVisible={visible}
                hideModalContentWhileAnimating={true}
                onBackdropPress={()=>{setVisible(false)}}
            >
                <View style={styles.modalContents}>
                    <View style={{justifyContent:'center',alignItems:"center"}}>
                        <StyleText style={{fontSize:16}}>{diaryDate}</StyleText>
                    </View>
                    <View style={{marginTop:12,alignItems:'center',justifyContent:'center'}}>
                        <Image source={require('../../img/emoji_01.png')} />
                    </View>
                    <View style={{marginTop:22,height:286}}>
                        <TextInput
                            value={inputDiary}
                            onChangeText={(value)=>setInputDiary(value)}
                            multiline={true}
                        />
                    </View>
                    <View style={{marginTop:40,flexDirection:"row", justifyContent:"flex-end",}}>
                        <TouchableOpacity onPress={()=>setVisible(false)}>
                            <StyleText style={{color:"#8C6C51"}}>취소</StyleText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleModalSave}>
                            <StyleText style={{color:"#8C6C51",marginLeft:30}}>저장</StyleText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    modalContents:{
        backgroundColor:'#FFFBE9',
        borderRadius:8,
        paddingHorizontal:16,
        paddingVertical:26
    }
});