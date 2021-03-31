import React,{useState,useEffect} from 'react';
import { Text, View,Button,FlatList } from 'react-native';
import moment from 'moment';

export default ()=>{
    const [getMoment, setMoment]=useState(moment());     
    const [monthName,setMonthName] = useState(getMoment.format('MMMM'));
    const [dayList,setDayList] = useState([]);
    
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
        // console.log(item)
        return (
            <View>

            </View>
        )
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'beige' }}>
            <View style={{flexDirection:"row",flex:1}}>
                <Button title="이전 달" onPress={()=>handleMonth(false)}></Button>  
                <Text style={{marginHorizontal:20}}>{monthName}</Text>
                <Button title="다음 달" onPress={()=>handleMonth(true)}></Button>
            </View>
            <View style={{marginTop:20,flex:1}}>
                {/* {renderCalendar()} */}
                <FlatList
                    numColumns={7}
                    data={dayList}
                    renderItem={renderCalendar}
                    keyExtractor={(item, index) => String(index)}
                />
            </View>
        </View>
    );
}