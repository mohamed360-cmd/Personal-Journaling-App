import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import ErrorAlert from "../../Componets/Alerts/ErrorAlert";
import SuccessAlert from "../../Componets/Alerts/SuccessAlert";
import { useState,useContext,createContext, useEffect } from "react";
export const authContext = createContext()
export default function MainAuthScreen({navigation}) {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [errorMessage,setErrorMessage] = useState("")
    const [showErrorAlert,setShowErrorAlert] = useState(false)
    const [successMessage,setSuccessMessage] = useState("")
    const [showSuccessAlert,setShowSuccessAlert] = useState(false)
    const showRegisterFormHandler = () => {
        setShowLoginForm(false);
        setShowRegisterForm(true);
    };

    const showLoginFormHandler = () => {
            setShowLoginForm(true);
            setShowRegisterForm(false);
    };
    const closeAlerts = ()=>{
        if(showErrorAlert){
            setShowErrorAlert(false)
        } 
        if(showSuccessAlert){
            setShowSuccessAlert(false)
        }
    }
    useEffect(()=>{
 setTimeout(closeAlerts,5000)
    },[showErrorAlert,showSuccessAlert])
    return (
        <authContext.Provider value={{setErrorMessage,setShowErrorAlert,setSuccessMessage,setShowSuccessAlert,setShowLoginForm,setShowRegisterForm ,navigation}}>
        <View style={styles.MainAuthContainer}>

            {showLoginForm && <LoginForm />}
            {showRegisterForm && <RegisterForm />}

            {
                showErrorAlert && <ErrorAlert message={errorMessage}/>
            }
            {
                showSuccessAlert && <SuccessAlert message={successMessage}/>
            }
            <View style={styles.AuthOptions}>
                {showLoginForm && (
                    <View style={styles.authOption}>
                        <Text style={styles.authOptionInfo}>Don't Have An Account?</Text>
                        <TouchableHighlight onPress={showRegisterFormHandler} style={styles.authOptionButton}>
                            <Text style={styles.authOptionButtonText}>Register</Text>
                        </TouchableHighlight>
                    </View>
                )}
                {showRegisterForm && (
                    <View style={styles.authOption}>
                        <Text style={styles.authOptionInfo}>Already Have An Account?</Text>
                        <TouchableHighlight onPress={showLoginFormHandler} style={styles.authOptionButton}>
                            <Text style={styles.authOptionButtonText}>Login</Text>
                        </TouchableHighlight>
                    </View>
                )}
            </View>
        </View>
        </authContext.Provider>
    );
}

const styles = StyleSheet.create({
    MainAuthContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor :'white',
        width :'100%'
    },
    AuthOptions: {
        padding: 20,
        width :'90%'
    },
    authOption : {
        width:'100%',
        justifyContent :'center'
    },
    authOptionInfo: {
        fontSize :15,
        fontWeight :'700',
        color :'black',
    },
    authOptionButton : {
        padding :15,
        justifyContent : 'center',
        alignContent :'center',
        borderRadius :10,
        backgroundColor :'blue',
        width:100,
        alignSelf :'center'
    },
    authOptionButtonText : {
        fontWeight : '900',
        textAlign : 'center',
        color :'white',
        fontSize : 15
    }
});
