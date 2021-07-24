import React,{useState,useEffect,useRef} from 'react';
import { useDispatch } from 'react-redux';
import { View,FlatList,SafeAreaView, TouchableOpacity, Image,Animated,StyleSheet, ImageBackground } from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import StyleText from '../../components/UI/StyleText';
import moment from 'moment';
import send from '../../modules/send';
import {formatDate,isEmpty} from '../../modules/common';
import {openModalWithProps} from '../../reducers/modal';
import DiaryModal from '../../components/Diary/DiaryModal';
import { useSnackbarContext } from '@dooboo-ui/snackbar';

const dayName = ['일','월','화','수','목','금','토']
const FOLD_IMG = require("../../img/calendar/fold-calendar.png")
const UNFOLD_IMG = require("../../img/calendar/unfold-calendar.png")
export default ({navigation})=>{
    const dispatch = useDispatch();
    const snackbar = useSnackbarContext();
    const [calendarBg,setCalendarBg] = useState(UNFOLD_IMG)
    const [visible,setVisible] = useState(false);
    const [diaryContents,setDiaryContents] = useState({});
    const [getMoment, setMoment]=useState(moment());     
    const [monthName,setMonthName] = useState(getMoment.format('MMMM'));
    const [dayList,setDayList] = useState([]);
    const [selectDate,setSelectDate] = useState(null);
    const [itemHeight,setItemHeight] = useState(66);
    const [toggle,setToggle] = useState(false);
    const [monthHistory,setMonthHistory] = useState({});
    const [history,setHistory] = useState({
        diary:"X",book:0,workout:0,study:0,food:{goal:0,intake:0}
    });
    const animatedPostion = useRef(new Animated.ValueXY({x:0,y:1000})).current;
    const handleBottomSheet = ()=>{
        !toggle ? setItemHeight(46) : setItemHeight(66);
        setToggle(!toggle)
    }
    useEffect(()=>{
        const height = toggle ? -34 : 1000
        Animated.timing(animatedPostion,{
            toValue:{x:0,y:height},
            duration : 100,
            useNativeDriver:false
        }).start();
    },[toggle])

    useEffect(()=>{
        handleDateList(getMoment);
        getHistory();
    },[]);

    const openDiary = async() => {
        const {success,message,today} = await send.get("/history/diary",{params:{date:formatDate(selectDate)}});
        if(success) {
            setDiaryContents(today)
            setVisible(true)
        } else {
            snackbar.show({text:message})
        }
    }

    const getHistory = async(_date) => {
        if(_date){
            if( (selectDate === null && toggle === false) || (toggle === true && selectDate===_date) || toggle===false ) handleBottomSheet();
            setSelectDate(_date)
        }
        if( selectDate === null || selectDate!==_date) {
            requestHistory(_date)
        }
    }

    const requestHistory = async(_date)=>{
        const {success,diary,book,workout,study,food,msg} = await send.get("/history/",{params:{date:formatDate(_date)}});
        if(success) {
            setHistory({diary,book,workout,study,food})
        } else {
            snackbar.show({text:`${msg}\n다시 시도해 주세요.`})
        }
    }
    
    const handleDateList = async(_moment)=>{
        //아래 로 할 경우 달력 날짜에 잔상이 남는다.
        // const {success,lists} = await send.get("/history/month",{params:{moment:_moment}});
        // if(success) setMonthHistory(lists);

        //아래로 할 경우 달력이 뜨고 나서 아이콘들이 나타난다.
        send.get("/history/month",{params:{moment:_moment}}).then(({success,lists})=>{
            if(success) setMonthHistory(lists);
        })
        const year = _moment.format("YYYY");
        const month = _moment.format("M")-1
        const firstWeekday = new Date(year,month,1).getDay();
        const prevDates = [];
        for (let idx = 0; idx < firstWeekday; idx++) {
            const date = new Date(year, month, 0);
            date.setDate(date.getDate() - idx);                                                         
            prevDates.unshift(date);
        }
        const lastDate = new Date(year, month + 1, 0).getDate();
        const dates = [];
        for (let idx = 1; idx <= lastDate; idx++) {
               dates.push(new Date(year, month, idx));
        }
        const lastWeekday = new Date(year, month, lastDate).getDay();
        const nextDates = [];
        if (6 - lastWeekday >= 1) {
            for (let idx = 1; idx <= 6 - lastWeekday; idx++) { 
                nextDates.push(new Date(year, month+1, idx));
            }
        }
        setDayList([...prevDates,...dates,...nextDates])
    }

    const handleMonth = async(nextMonth)=>{
        const nextMoment = nextMonth ? getMoment.add(1, 'month') : getMoment.subtract(1, 'month');
        setMoment(nextMoment);
        setMonthName(getMoment.format("MMMM"));
        handleDateList(nextMoment)

    }
    
    const renderCalendar = ({item})=>{
        let borderStyle = {};
        
        const isToday = (dateItem) => {
            const today = new Date();
            return (
              dateItem.getDate() === today.getDate() &&
              dateItem.getMonth() === today.getMonth() &&
              dateItem.getFullYear() === today.getFullYear()
            );
        };
        const isSelected = (dateItem) => {
            return (
              dateItem.getDate() === selectDate.getDate() &&
              dateItem.getMonth() === selectDate.getMonth() &&
              dateItem.getFullYear() === selectDate.getFullYear()
            );
        };
        const isCurrentMonth = (dateItem) =>{
            return (
                moment(dateItem).format("M") === getMoment.format("M") &&
                moment(dateItem).format("YYYY") === getMoment.format("YYYY")
            );
        }
        if(selectDate === null) { //today
            if(isToday(new Date(item))) {
                borderStyle = {borderColor:"#8C6C51",borderWidth:1}
            } else {
                borderStyle = {borderBottomWidth:1,borderRightWidth:1,borderColor:"#EEEEEE"}
            }
        } else { // selectDate
            if(isSelected(new Date(item))) {
                borderStyle = {borderColor:"#8C6C51",borderWidth:1}
            } else {
                borderStyle = {borderBottomWidth:1,borderRightWidth:1,borderColor:"#EEEEEE"}
            }
        }

        return (
            isCurrentMonth(item) ?
                <TouchableOpacity onPress={()=>getHistory(item)}>
                    <View style={[{width:46,height:itemHeight},borderStyle]}>
                        <View style={{paddingLeft:10,paddingTop:10}}>
                            <StyleText style={{fontSize:12}}>{new Date(item).getDate()}</StyleText>
                        </View>
                        <View style={{flex:1,flexWrap:'wrap',flexDirection:'row',marginTop:4,alignItems:'center'}}>
                                {
                                    monthHistory[formatDate(item)] ?
                                        Object.keys(monthHistory[formatDate(item)]).length === 5 ? 
                                            (
                                                <View style={{flex:1,alignItems:'center'}}>
                                                    <WithLocalSvg width={12} height={12} asset={require("../../img/diary/complete_emoji.svg")} />
                                                </View>
                                            )
                                            :
                                            Object.keys(monthHistory[formatDate(item)]).map((key)=>{
                                                if(key === 'diary') {
                                                    return <Image source={require("../../img/diary/dot_diary.png")} style={{width:8,height:8,marginLeft:2}}/>
                                                } else if(key === 'food') {
                                                    return <Image source={require("../../img/diary/dot_food.png")} style={{width:8,height:8,marginLeft:2}}/>
                                                } else if(key === 'books') {
                                                    return <Image source={require("../../img/diary/dot_book.png")} style={{width:8,height:8,marginLeft:2}}/>
                                                } else if(key === 'workout') {
                                                    return <Image source={require("../../img/diary/dot_workout.png")} style={{width:8,height:8,marginLeft:2}}/>
                                                } else if(key === 'study') {
                                                   return <Image source={require("../../img/diary/dot_desk.png")} style={{width:8,height:8,marginLeft:2}}/>
                                                }
                                            })
                                    :
                                    null
                                }
                            </View>
                    </View>
                </TouchableOpacity>
            :
                <View style={[{width:46,height:itemHeight},borderStyle]}>
                    <View style={{paddingLeft:10,paddingTop:10}}>
                    </View>
                </View>
            
        )
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#FFFFFF",paddingHorizontal:20,justifyContent:"space-between"}}>
            <View>
                <View style={{marginTop:27,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <TouchableOpacity onPress={()=>handleMonth(false)}>
                        <View style={{width:9,height:9}}>
                            <Image source={require("../../img/calendar/ico_pre_month.png")}/>
                        </View>
                    </TouchableOpacity>
                    <StyleText style={{fontSize:18,color:"#000000",marginHorizontal:16}} type="bold">{monthName}</StyleText>
                    <TouchableOpacity onPress={()=>handleMonth(true)}>
                        <View style={{width:9,height:9}}>
                            <Image source={require("../../img/calendar/ico_next_month.png")}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:"center",marginTop:22}}>
                    <View style={{flexDirection:'row',borderTopWidth:1,borderLeftWidth:1,borderColor:"#EEEEEE"}}>
                        {
                            dayName.map((item,idx)=>{
                                return (
                                    <View key={idx} style={{width:46,height:36,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderRightWidth:1,borderColor:"#EEEEEE"}}>
                                        <StyleText style={{fontSize:12,color:"#000000"}}>{item}</StyleText>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View>
                        <FlatList
                            numColumns={7}
                            data={dayList}
                            renderItem={renderCalendar}
                            keyExtractor={(item, index) => String(index)}
                            extraData={[itemHeight,selectDate]}
                            style={{flexGrow:0,borderLeftWidth:1,borderColor:"#EEEEEE"}}
                        />
                    </View>
                </View>
            </View>
            <View style={{justifyContent:"flex-end"}}>
                <Animated.View style={{height:258,width:'100%',justifyContent:'center',alignItems:"center",transform:[{translateY:animatedPostion.y}]}}>
                    <ImageBackground resizeMode={'stretch'} source={require("../../img/calendar/bottom-sheet.png")} style={{width:"100%",flex:1}}>
                        <TouchableOpacity onPress={handleBottomSheet} style={{alignItems:'center',marginTop:10}}>
                            <Image
                                resizeMode="stretch"
                                source={require("../../img/calendar/bottom-sheet-down.png")}
                            />
                        </TouchableOpacity>
                        <View style={{marginTop:30,paddingHorizontal:20}}>
                            <View style={styles.bottomSheetWrap}>
                                <StyleText style={styles.bottomSheetText}>일기</StyleText>
                                <TouchableOpacity onPress={openDiary}>
                                    <StyleText style={styles.bottomSheetText}>{history.diary ? 'O' : 'X'}</StyleText>
                                </TouchableOpacity>
                            </View>
                            <View style={[{marginTop:16},styles.bottomSheetWrap]}>
                                <StyleText style={styles.bottomSheetText}>운동</StyleText>
                                <TouchableOpacity onPress={()=>dispatch(openModalWithProps('health',{date:formatDate(selectDate),callback:()=>requestHistory(selectDate)}))}>
                                    <StyleText style={styles.bottomSheetText}>{`${parseInt(history.workout/60)} 시간 ${history.workout%60} 분`}</StyleText>
                                </TouchableOpacity>
                            </View>
                            <View style={[{marginTop:16},styles.bottomSheetWrap]}>
                                <StyleText style={styles.bottomSheetText}>공부</StyleText>
                                <TouchableOpacity onPress={()=>dispatch(openModalWithProps('desk',{date:formatDate(selectDate),callback:()=>requestHistory(selectDate)}))}>
                                    <StyleText style={styles.bottomSheetText}>{`${parseInt(history.study/60)} 시간 ${history.study%60} 분`}</StyleText>
                                </TouchableOpacity>
                            </View>
                            <View style={[{marginTop:16},styles.bottomSheetWrap]}>
                                <StyleText style={styles.bottomSheetText}>책장</StyleText>
                                <TouchableOpacity onPress={()=>navigation.navigate("BookMain",{date:formatDate(selectDate),onGoBack:()=>requestHistory(selectDate)})}>
                                    <StyleText style={styles.bottomSheetText}>{history.book} Page</StyleText>
                                </TouchableOpacity>
                            </View>
                            <View style={[{marginTop:16},styles.bottomSheetWrap]}>
                                <StyleText style={styles.bottomSheetText}>냉장고</StyleText>
                                <TouchableOpacity onPress={()=>navigation.navigate("Calorie",{date:formatDate(selectDate),onGoBack:()=>requestHistory(selectDate)})}>
                                    <StyleText style={styles.bottomSheetText}>
                                        <StyleText style={[styles.bottomSheetText,{color:"#94C9FF"}]}>{history.food.intake}</StyleText>/{history.food.goal} kcal
                                    </StyleText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </Animated.View>
            </View>
            <DiaryModal
                display={visible}
                inputDiary={isEmpty(diaryContents) ? "" : diaryContents.CONTENTS}
                diaryDate={formatDate(selectDate)}
                updateNo={isEmpty(diaryContents) ? "" : diaryContents.IDX}
                today={diaryContents}
                closeModal={()=>setVisible(false)}
                callback={requestHistory}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    bottomSheetText:{fontSize:16,color:"#FFFFFF"},
    bottomSheetWrap:{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}
})