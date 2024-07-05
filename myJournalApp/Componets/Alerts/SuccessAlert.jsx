import {View,Text,StyleSheet} from 'react-native'
export default function SuccessAlert({message,exitButton}){
    return(
        <View style={styles.AlertContainer}>
            <Text style={styles.AlertText}>{message}</Text>
            {exitButton}
        </View>
    )
}
const styles = StyleSheet.create({
    AlertContainer : {
        position : 'absolute',
        top :10,
        right : 5,
        borderRadius: 10,
        backgroundColor : 'limegreen',
        padding :10,
    },
    AlertText : {
        color :'white'
    }
})