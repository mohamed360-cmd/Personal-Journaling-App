
import { useState, useContext } from "react";
import baseUrl from "../../config/serverUrl";
import { authContext } from "./MainAuth";
import { TextInput, View ,StyleSheet,TouchableHighlight,Text} from "react-native";

export default function RegisterForm(){
    const {setErrorMessage,setShowErrorAlert,setSuccessMessage,setShowSuccessAlert,setShowLoginForm,setShowRegisterForm} = useContext(authContext)
    const[emailValue,setEmailValue] = useState("")
    const [passwordValue,setPasswordValue] = useState("")
    const [passwordAgainValue,setPasswordAgainValue] = useState("")

    const registerBtnHandler = ()=>{
        if(emailValue.length > 3 && passwordValue.length > 1 && passwordAgainValue.length > 1){
            if(passwordValue === passwordAgainValue){
                const userRegisitrationData = {
                    email : emailValue,
                    password : passwordValue
                }
                sendRegisterDetails(userRegisitrationData)
            }else{
                setErrorMessage("Password Are not the Same")
                setShowErrorAlert(true)
            }
        }else{
            setErrorMessage("Error In the Form")
            setShowErrorAlert(true)
    }
    }

    const sendRegisterDetails = async(registerDetails)=>{
        try {
            const res = await fetch(`${baseUrl}/user/register`,{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(registerDetails)
            })
            const data = await res.json()
            if(data.status){
                setSuccessMessage(data.msg)
               setShowSuccessAlert(true)
               setShowLoginForm(true)
               setShowRegisterForm(false)
            }else{
                setErrorMessage(data.msg)
                setShowErrorAlert(true)
            }
            console.log(data)

        } catch (error) {
            console.log("Error Happened in the sendRegisterDetails function ",error)
        }
    }
return(
    <View style={styles.registerForm}>

            <Text style={styles.FormTitle}>Register</Text>
        <TextInput placeholder="Email" style={styles.textInput} onChangeText={e=>setEmailValue(e)} placeholderTextColor={'black'}/>
        <TextInput placeholder="Password"  style={styles.textInput} onChangeText={e=>setPasswordValue(e)} placeholderTextColor={'black'}/>
        <TextInput placeholder="Password Again"  style={styles.textInput} onChangeText={e=>setPasswordAgainValue(e)} placeholderTextColor={'black'}/>
        <TouchableHighlight style={styles.PrimaryAuthFormButton}>
        <View>
             <Text style={styles.authPrimaryButtonText} onPress={registerBtnHandler}>Register</Text>
        </View>
           
        </TouchableHighlight>
    </View>
)
}
const styles = StyleSheet.create({
    registerForm : {
        padding : 10,
        justifyContent : 'center',
        alignContent : 'center',
        backgroundColor :'black',
        width :'90%',
        borderRadius :10
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