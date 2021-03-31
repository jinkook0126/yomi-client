import React,{useState,useEffect} from 'react';
import { Text, View,FlatList,SafeAreaView, TouchableOpacity, Image, Button } from 'react-native';
import moment from 'moment';

const dayName = ['일','월','화','수','목','금','토']
export default ()=>{
    const [getMoment, setMoment]=useState(moment());     
    const [monthName,setMonthName] = useState(getMoment.format('MMMM'));
    const [dayList,setDayList] = useState([]);
    const [selectDate,setSelectDate] = useState(null);
    const [itemHeight,setItemHeight] = useState(66);

    useEffect(()=>{
        handleDateList(getMoment)
    },[])
    
    const handleDateList = async(_moment)=>{
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
        let textStyle = {};
        
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
            const today = moment();
            return (
                moment(dateItem).format("M") === getMoment.format("M") &&
                moment(dateItem).format("YYYY") === getMoment.format("YYYY")
            );
        }
        
        if(isCurrentMonth(item)) {
            textStyle = {color:"#000000"};
        } else {
            textStyle = {color:"#EEEEEE"};

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
            <TouchableOpacity onPress={()=>setSelectDate(item)}>
                <View style={[{width:46,height:itemHeight},borderStyle]}>
                    <View style={{paddingLeft:10,paddingTop:10}}>
                        <Text style={[{fontSize:12,fontWeight:'bold'},textStyle]}>{new Date(item).getDate()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#FFFFFF"}}>
            <View style={{marginTop:27,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={()=>handleMonth(false)}>
                    <View style={{width:9,height:9}}>
                        <Image source={require("../../img/ico_left_arrow.png")}/>
                    </View>
                </TouchableOpacity>
                <Text style={{fontSize:12,fontWeight:'bold',color:"#000000",marginHorizontal:16}}>{monthName}</Text>
                <TouchableOpacity onPress={()=>handleMonth(true)}>
                    <View style={{width:9,height:9}}>
                        <Image source={require("../../img/ico_right_arrow.png")}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:"center",marginTop:22}}>
                <View style={{flexDirection:'row',borderTopWidth:1,borderLeftWidth:1,borderColor:"#EEEEEE"}}>
                    {
                        dayName.map((item,idx)=>{
                            return (
                                <View key={idx} style={{width:46,height:36,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderRightWidth:1,borderColor:"#EEEEEE"}}>
                                    <Text style={{fontSize:12,fontWeight:'bold',color:"#000000"}}>{item}</Text>
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
            <View style={{backgroundColor:"red",height:30}}>
                <Button title={'asdf'} onPress={()=>setItemHeight(33)}></Button>
            </View>
        </SafeAreaView>
    );
}