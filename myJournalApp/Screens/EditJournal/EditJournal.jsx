import { View ,StyleSheet} from "react-native"
import Navbar from "../../Componets/Navbar/Navbar"
import JournalForm from "../CreateJournal/JournalForm"
import { globalContext } from '../../App'
import { useContext } from "react"
export default function EditJournal({navigation,route}){
    const {jwtToken,loggedin} = useContext(globalContext)

    return(
        <View style={styles.MainEditJournalContainer}>
            <Navbar Title={"Edit your Journal"} navigation={navigation}/>
            <View style={styles.EditForm}>
            <JournalForm update={true} jwt={jwtToken}create={false}editData={route.params}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({})