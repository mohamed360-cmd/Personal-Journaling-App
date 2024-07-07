import { useState ,useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../../Componets/Navbar/Navbar';
import ErrorAlert from '../../Componets/Alerts/ErrorAlert';
import SuccessAlert from '../../Componets/Alerts/SuccessAlert';
import baseUrl from '../../config/serverUrl';
import { globalContext } from '../../App'
import { useContext } from "react"
export default function  Setting ({navigation}){
    const {jwtToken} = useContext(globalContext)
    const [userEmail,setUserEmail] = useState('')
    const [showSettingOptions,setshowSettingOptions] = useState(true)
    const [showResetPasswordForm,setshowResetPasswordForm] = useState(false)
    const [password,setPassword] = useState('')
    const [passwordAgain,setPasswordAgain] = useState('')
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showSuccesAlert, setShowSuccessAlert] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
        const handleLogout = async() => {
        try {
            await AsyncStorage.setItem('jwtToken','')
            await AsyncStorage.setItem('LoggedIn','false')
            navigation.navigate('login')
        } catch (error) {
            console.log("error in the handleLogout ",error)
        }
        
    };

    const resetPasswordHandler = () => {
        setshowSettingOptions(false)
        setshowResetPasswordForm(true)
    };
    const getEmail = async ()=>{
        setUserEmail(await AsyncStorage.getItem('UserEmail'))
    }
    const passwordReset = async(_details)=>{
        try {
            const res = await fetch(`${baseUrl}/user/resetpassword`,{
                method : 'POST',
                headers : {
                    'content-type' : 'application/json',
                    'authorization' : `bearer ${jwtToken}`
                },
                body : JSON.stringify(_details)
            })
            const data = await res.json()
            console.log(data)
            if(data.status){
                setSuccessMsg(data.msg)
                setShowSuccessAlert(true)
            }else{
                setErrorMsg(data.status)
                setShowErrorAlert(true)
            }
        } catch (error) {
            console.log("error in the passwordReset ",error)
        }
    }
    const reset = ()=>{
        if(password.trim().length > 3 && passwordAgain.trim().length > 3){
            if(password.trim() === passwordAgain.trim()){
                const details   = {
                    email : userEmail,
                    password : password
                }
                passwordReset(details)
            }else{
                setErrorMsg("Password Not the Same")
                setShowErrorAlert(true)
            }
        }else{
            setErrorMsg("Password Too Short")
            setShowErrorAlert(true)
        }
    }
   const discardResetPasswordHandler = ()=>{
    setshowSettingOptions(true)
    setshowResetPasswordForm(false)
   }
    useEffect(()=>{
        getEmail()
        setTimeout(()=>{
            setShowErrorAlert(false)
            setShowSuccessAlert(false)
        },4000)
        },[showErrorAlert,showSuccesAlert])
    return (
        <View style={styles.SettingContainer}>
        <Navbar Title={"Settings"} navigation={navigation}/>
            {
                showSettingOptions && <View style={styles.OptionContainer}>
                    <Text style={{color : 'white' ,padding : 10, backgroundColor : 'rgb(42, 94, 191)', marginBottom :5,
                    borderRadius : 10, fontWeight : '700',fontSize : 17}}>Email : {userEmail}</Text>
                    <TouchableHighlight onPress={resetPasswordHandler}>
                        <View style={[styles.settingButton,styles.ResetPassword]}>
                            <Text style={styles.btnTxt}>Reset Password</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={handleLogout}>
                        <View style={[styles.settingButton,styles.Logout]}>
                            <Text style={styles.btnTxt}>Logout</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            }
            {showResetPasswordForm && <View style={styles.ResetPasswordForm}>
             <Text style={{fontSize : 16,fontWeight : '700' , padding : 10, borderRadius : 20, backgroundColor : 'black', color :'white',textAlign :'center',marginBottom : 5}}>Reset Password Form</Text>
                <TextInput placeholder='Enter password' secureTextEntry={true} onChangeText={e=>setPassword(e)} style={styles.Inputs} placeholderTextColor={'grey'}/>
                <TextInput placeholder='Enter password Again' secureTextEntry={true} onChangeText={e=>setPasswordAgain(e)} style={styles.Inputs} placeholderTextColor={'grey'}/>
                    <View style={styles.formBtnsContainer}>
                    <TouchableHighlight onPress={discardResetPasswordHandler} >
                        <View style={[styles.resetFormBtn,styles.Discard]}>
                            <Text style={styles.btnTxt}>Discard</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={reset} >
                        <View style={[styles.resetFormBtn,styles.Reset]}>
                            <Text style={styles.btnTxt}>Reset</Text>
                        </View>
                    </TouchableHighlight>
                    </View>
                    {showErrorAlert  && <ErrorAlert message={errorMsg}/>}
                    {showSuccesAlert && <SuccessAlert message={successMsg}/>}
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    OptionContainer : {
        padding : 10,
        borderWidth : 2,
        borderColor :'black',
        borderRadius : 5,
        height :'90%',
        margin : 10
    },
    settingButton : {
        padding : 15,
        backgroundColor :'green',
        marginBottom : 10,
        justifyContent :'center',
        alignItems :'center',
        borderRadius : 10
    },
    btnTxt : {
        color :'white',
        fontSize : 16
    },
    ResetPassword : {
        backgroundColor : 'brown'
    },
    Logout : {
        backgroundColor : 'rgb(7, 181, 245)'
    },
    ResetPasswordForm : {
        padding : 10,
        backgroundColor : 'blue',
        margin : 10,
        borderRadius : 10
    },
    Inputs : {
        backgroundColor : 'white',
        padding : 5,
borderRadius : 10,
color : 'black',
marginBottom : 5,
borderWidth : 1,
borderColor : 'black'
    },
    formBtnsContainer : {
        flexDirection :'row',
        justifyContent : 'center'
    },
    resetFormBtn : {
        padding : 10,
        borderRadius : 10,
        marginLeft : 5,
        alignSelf : 'center',
        
    },
    Discard : {
        backgroundColor : 'green'
    },
    Reset : { 
        backgroundColor : 'red'
    }
});

