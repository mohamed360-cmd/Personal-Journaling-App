import {View,Text,StyleSheet} from 'react-native'
import Navbar from '../../Componets/Navbar/Navbar'
import JournalForm from './JournalForm'
export default function Createjournal ({navigation}){
    /*
    1 able to select the date from calender
    2. add title
    3.add the Content
    4. add the category
    5. the date and time will automaticaly be  added in the database 
    */
    return(
        <View>
            <Navbar Title={"Create Your Journal"} navigation={navigation}/>
            <View style={styles.journalForm}>
                <JournalForm/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

})