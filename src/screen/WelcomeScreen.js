import React from 'react';
import { useSelector } from 'react-redux';
import LoginScreen from './LoginScreen';
import MainScreen from '../components/DockBar'

export default(props)=>{
    const initScreen = useSelector(state => state.auth.login.stat);
    return (
        <>
            {
                initScreen?
                <MainScreen {...props}/>
                :
                <LoginScreen {...props}/>
            }
        </>
    )
}