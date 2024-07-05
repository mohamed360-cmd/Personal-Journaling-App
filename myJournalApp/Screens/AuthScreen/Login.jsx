import { useState,useContext } from "react";
import { TextInput, View ,StyleSheet,Text, TouchableHighlight} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "../../config/serverUrl";
import { authContext } from "./MainAuth";
import { globalContext } from "../../App";
export default function LoginForm(){
    const {setErrorMessage,setShowErrorAlert,navigation} = useContext(authContext)
    const {setLoggedin} = useContext(globalContext)
    const[emailValue,setEmailValue] = useState("")
    const [passwordValue,setPasswordValue] = useState("")
    const  _movetoHomeScreen =()=>{
        try {
            navigation.navigate("Home")
        } catch (error) {
            console.log("Error in _movetoHomeScreen function ",error)
        }
       }
        
    const _saveLoginToLocalStorage = async(jwt_token)=>{
        try {
            await AsyncStorage.setItem("jwtToken",jwt_token)
            await AsyncStorage.setItem("LoggedIn","true")
            setLoggedin('true')
           _movetoHomeScreen()
        } catch (error) {
            console.log("Error in the _saveLoginToLocalStorage",error)
        }
    }
    const sendLoginDetails = async(loginDetails)=>{
        try {
            const res = await fetch(`${baseUrl}/user/login`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(loginDetails)
            })
            const data = await res.json()
            if(data.status){
                //if the status is true store the jwt token returned then naivate to another page 
                const jwtToken = data.jwtToken
                _saveLoginToLocalStorage(jwtToken)

            }else{
                setErrorMessage(data.msg)
                setShowErrorAlert(true)
            }
        } catch (err) {
            console.log("Error in the sendLoginDetails Funciton",err)   
        }
    }
    const loginBtnHandler = async()=>{
        console.log(emailValue,passwordValue)
        if(emailValue.trim().length > 2 && passwordValue.trim().length >  3){
            const userLoginDetails = {
                email : emailValue.trim(),
                password : passwordValue.trim()
            }
            sendLoginDetails(userLoginDetails)
        }else{
            setErrorMessage("Error in the Form")
            setShowErrorAlert(true)
        }
    }
return(
    <View style={styles.LoginForm}>
        <Text style={styles.FormTitle}>Login</Text>
        <TextInput placeholder="Email" style={styles.textInput} placeholderTextColor={'grey'} onChangeText={e=>setEmailValue(e)}/>
        <TextInput placeholder="Password"  style={styles.textInput} placeholderTextColor={'grey'} onChangeText={e=>setPasswordValue(e)}/>
        <TouchableHighlight style={styles.PrimaryAuthFormButton}>
            <View>
               <Text style={styles.authPrimaryButtonText} onPress={loginBtnHandler}>Login</Text> 
            </View>
            
        </TouchableHighlight>
    </View>
)
}
const styles = StyleSheet.create({
    LoginForm : {
        padding : 10,
        justifyContent : 'center',
        alignContent : 'center',
        backgroundColor :'black',
        width :'90%',
        borderRadius :10,
        shadowColor: 'blue',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,

    },
    FormTitle : {
        fontSize : 30,
        fontStyle : 'italic',
        textAlign :'center',
        fontWeight :'900',
        color :'white'
    },
    textInput : {
        padding : 10,
        borderRadius : 6,
        backgroundColor :'white',
        color :'black',
        width :'90%',
        margin :10
    },
    PrimaryAuthFormButton : {
        padding : 15,
        borderRadius : 10,
        backgroundColor : 'green',
        alignSelf :'center'  
      },
      authPrimaryButtonText : {
        fontWeight : '900',
        textAlign : 'center',
        color :'white',
        fontSize : 15
    }
})