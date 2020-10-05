import * as React from 'react';
import { Text, View } from 'react-native';
import {LocaleConfig,Calendar} from 'react-native-calendars';
import { Dimensions } from 'react-native';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';
const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};
export default ()=>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'beige' }}>
          <Calendar 
            current={'2020-10-05'}
            onDayPress={(day)=>console.log('selected day',day)}
            monthFormat={'yyyy MM'}
            markingType={"multi-dot"}
            markedDates={{
              '2020-09-30':{dots:[workout]},
              '2020-10-01':{dots:[vacation,massage,workout]},
              '2020-10-02': {dots: [massage, workout]},
              '2020-10-04':{dots:[vacation,massage,workout]}
            }}
            style={{paddingBottom:10,width:Dimensions.get('window').width}}
            theme={{
              textDayFontSize: 20,
              textMonthFontSize: 30,
              textDayHeaderFontSize: 20,
              textMonthFontWeight:'bold'
            }}
          />
        </View>
    );
}