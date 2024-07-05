import { View } from "react-native"
import MainAuthScreen from "./Screens/AuthScreen/MainAuth"
import Createjournal from './Screens/CreateJournal/CreateJournal'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState,useRef } from "react";
export const globalContext = createContext()
import Home from "./Screens/HomeScreen/Home";
const stack = createNativeStackNavigator()

export default function App({navigation}){
  const [isUserLogedIn,setIsUserLogedIn] = useState(false)
  const [jwtToken,setJwtToken] = useState('')
  const [loggedin,setLoggedin] = useState('')
  const navigationRef = useRef(null);
  const getLoginState  = async()=>{
    setIsUserLogedIn(await AsyncStorage.getItem('LoggedIn'))
    setJwtToken(await AsyncStorage.getItem('jwtToken'))
  }
  function autoLogin(){
    try {
      if(loggedin === 'true'){
        navigationRef.current?.navigate("Home");    
        }else{
          navigationRef.current?.navigate("login");
      }
    } catch (error) {
      console.log("Error in the isUserLogedIn function",error)
    }
  }
useEffect(()=>{
  //autoLogin()
},[loggedin])

  return(
    <NavigationContainer ref={navigationRef} > 
    <globalContext.Provider value={{jwtToken,loggedin,setLoggedin}}>
    <stack.Navigator screenOptions={
      {
        headerShown : false
      }
    }>
      <stack.Screen name="Home" component={Home}/>
      <stack.Screen  name="login" component={MainAuthScreen}/>
      <stack.Screen name="createJournal" component={Createjournal}/>
    </stack.Navigator>
    </globalContext.Provider>
    </NavigationContainer>
  )
}