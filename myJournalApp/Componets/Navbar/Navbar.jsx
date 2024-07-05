import {View,Text, TouchableHighlight,StyleSheet} from 'react-native'
export default function Navbar({navigation,Title,button1,button2}){
    const popBackButtonHandler = ()=>{
        try {
            navigation.navigate('Home')
        } catch (error) {
            console.log("Error in the poping back",error)
        }
    }
    return(
        <View style={styles.Navbar}>
        <TouchableHighlight onPress={popBackButtonHandler}>
        <View style={styles.NavbarPopBackBtn}>
                <Text style={{color : 'white'}}>Back</Text>
            </View>
        </TouchableHighlight>
            <Text style={styles.NavbarTitle}>{Title}</Text> 
        </View>
    )
}
const styles = StyleSheet.create({
    Navbar : {
        height : 50,
        width : '100%',
        backgroundColor :'white',
        padding : 5,
        flexDirection : 'row',
        alignItems : 'center'
    },
    NavbarPopBackBtn  : {
        padding : 7,
        justifyContent :'center',
        alignItems : 'center',
        borderRadius :7,
        backgroundColor : 'black',
        width : 60,
        marginRight : 10,
    },
    NavbarTitle : {
        color :'black',
        fontWeight :'900',
        fontSize : 19
    }
})