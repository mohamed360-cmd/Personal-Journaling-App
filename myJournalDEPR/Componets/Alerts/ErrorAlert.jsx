import {View,Text,StyleSheet} from 'react-native'
export default function ErrorAlert({message,exitButton}){
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
        backgroundColor : 'red',
        padding :10,
    },
    AlertText : {
        color :'white',
        fontWeight : '900',
        fontSize : 14
    }
})