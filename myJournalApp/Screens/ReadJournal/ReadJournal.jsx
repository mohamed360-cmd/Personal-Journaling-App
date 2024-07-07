import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Navbar from '../../Componets/Navbar/Navbar';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
export default function ReadJournal({ navigation,route }) {
    const { title, content, category } = route.params;

    return (
        <View style={styles.MainReadJournalContainer}>
            <Navbar Title={'Read your Journal'} navigation={navigation}/>
            <View style={styles.ContentContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
                <Text style={styles.category}>Category: {category}</Text>  

            
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    ContentContainer : {
        padding : 10,
        borderWidth : 1,
        margin : 5,
        borderRadius : 10,
        position : 'relative'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color : 'black'
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
         color : 'black'
    },
    category: {
        fontSize: 14,
        color: 'gray',
    },
    EditBtn : {
        top : 5,
        position : 'absolute',
        right : 5,
        padding : 5,
        borderRadius : 10,
        backgroundColor  : 'brown',
        flexDirection : 'row',
        justifyContent :'center',
        alignItems : 'center'
    }
});

