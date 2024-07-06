import {View,Text,StyleSheet} from 'react-native'
import Navbar from '../../Componets/Navbar/Navbar'
import JournalForm from './JournalForm'
import { useContext, useEffect } from 'react'
import { globalContext } from '../../App'
import UserVerifier from '../../config/UserVerifier'
export default  function Createjournal ({navigation}){
    const {jwtToken,loggedin} = useContext(globalContext)
        if(loggedin === 'true'){
        return(
            <View>
                <Navbar Title={"Create Your Journal"} navigation={navigation}/>
                <View style={styles.journalForm}>
                    <JournalForm create={true} update={false} jwt={jwtToken} navigation={navigation}/>
                </View>
            </View>
        )}else{
            deleteTempStorage()
            navigation.navigation('login')
        }
       

}
const styles = StyleSheet.create({

})