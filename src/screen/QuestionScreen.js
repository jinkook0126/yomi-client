import React from 'react';
import {SafeAreaView,View,TouchableOpacity,ScrollView} from 'react-native';
import { WithLocalSvg } from 'react-native-svg';
import StyleText from '../components/UI/StyleText';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

const Question = ({navigation})=>{
    return (
        <SafeAreaView style={{backgroundColor:"#FFFFFF",flex:1 }}>
            <View style={{height:50,flexDirection:"row",alignItems:'center'}}>
                <StyleText style={{paddingLeft:50,fontSize:20}} type="bold">FAQ</StyleText>
                <TouchableOpacity style={{position: 'absolute',height:50,width:50,justifyContent:'center',alignItems:"center"}} onPress={()=>{
                    navigation.goBack();
                }}>
                    <WithLocalSvg width={8} height={16} asset={require('../img/menu/ico_back.svg')} />
                </TouchableOpacity>
            </View>
            <View style={{height:2,backgroundColor:'#ECECEC',width:'100%'}}/>
            <ScrollView style={{marginTop:6}}>
                <Collapse style={{marginTop:20}}>
                    <CollapseHeader>
                        <View style={{display:'flex',flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingBottom:20,borderBottomWidth:1,borderBottomColor:"#ECECEC",marginHorizontal:20}}>
                            <StyleText style={{fontSize:16}}>Q. 리워드는 어떻게 받나요?</StyleText>
                            <View style={{justifyContent:'flex-start',alignItems:"flex-end"}}>
                                <WithLocalSvg width={16} height={24} asset={require('../img/menu/ico_down.svg')} />
                            </View>
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={{backgroundColor:"#ECECEC",paddingHorizontal:16,paddingVertical:26}}>
                            <StyleText style={{color:"#616161"}}>
                                어떻게 받느냐면 이거를 저거해서 저렇게 이렇게 저렇게 해가지고 어떻게 받느냐면 이거를 저거해서 저렇게 이렇게 저렇게 해가지고 어떻게 받느냐면 이거를 저거해서 저렇게 이렇게 저렇게 해가지고 어떻게 받느냐면 이거를 저거해서 저렇게 이렇게 저렇게 해가지고
                            </StyleText>
                        </View>
                    </CollapseBody>
                </Collapse>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Question;