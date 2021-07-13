import React from 'react';
import {SafeAreaView,View,TouchableOpacity,Image} from 'react-native';
import StyleText from '../components/UI/StyleText';

const Question = ({navigation})=>{
    return (
        <SafeAreaView>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack();
                }}>
                    <View style={{height:50,width:28,justifyContent:'center',alignItems:"flex-end"}}>
                        <Image source={require('../img/common/ico_back.png')}  />
                    </View>
                </TouchableOpacity>
                <StyleText style={{paddingLeft:20,fontSize:16}}>FAQ</StyleText>
            </View>        
        </SafeAreaView>
    )
}

export default Question;