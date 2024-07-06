import { View } from "react-native"
import MainAuthScreen from "./Screens/AuthScreen/MainAuth"
import Createjournal from './Screens/CreateJournal/CreateJournal'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState, useRef } from "react";
import UserVerifier from './config/UserVerifier'
import ReadJournal from "./Screens/ReadJournal/ReadJournal";
export const globalContext = createContext()
import Home from "./Screens/HomeScreen/Home";

const Stack = createNativeStackNavigator()

export default function App() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false)
  const [jwtToken, setJwtToken] = useState('')
  const [loggedin, setLoggedin] = useState('')
  const navigationRef = useRef(null);

  const getLoginState = async () => {
    const loggedInState = await AsyncStorage.getItem('LoggedIn')
    const token = await AsyncStorage.getItem('jwtToken')
    const jwtTokenVerifer = await UserVerifier(token)
    if(jwtTokenVerifer){
      setIsUserLogedIn(loggedInState === 'true')
      setJwtToken(token)
      setLoggedin(loggedInState)
    }else{
      await AsyncStorage.setItem('jwtToken','')
      await AsyncStorage.setItem('LoggedIn','false')

    }

  }



  
  useEffect(() => {
    getLoginState();
    if (loggedin === 'true') {
      navigationRef.current?.navigate("Home");
    } else {
      navigationRef.current?.navigate("login");
    }
  }, [loggedin])

  return (
    <NavigationContainer ref={navigationRef}>
      <globalContext.Provider value={{ jwtToken, loggedin, setLoggedin }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="login" component={MainAuthScreen} />
          <Stack.Screen name="createJournal" component={Createjournal} />
          <Stack.Screen name="readJournal" component={ReadJournal}/>
        </Stack.Navigator>
      </globalContext.Provider>
    </NavigationContainer>
  )
}
