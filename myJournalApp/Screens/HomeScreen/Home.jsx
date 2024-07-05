import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TextInput, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState, useRef } from "react";
import { globalContext } from "../../App";
import Bgimg from '../../Assets/bg2.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function Home({ navigation }) {
    const [dateToday, setDateToday] = useState('')
    const { jwtToken, loggedin } = useContext(globalContext)
    const D = new Date()
    function goToCreateJournal(){
        try {
            navigation.navigate("createJournal")
        } catch (error) {
            console.log('Error in the goToCreateJournal function',error)
        }
    } 
    const [testData, setTestData] = useState([
        {
            Created_At: '1/1/2025',
            Title: 'Day In the Office ',
            Content: 'this is test Content ibaifbiawbwdcibawifbcaisdb ci[ouaubwciabsd9u[fubawdicba[isdbciasbdc[iabsdciabwecilcbawi;b',
            Category: 'Play',
            id: Math.random() * 10
        },
        {
            Created_At: '1/1/2025',
            Title: 'Day In the Office ',
            Content: 'this is test Content ibaifbiawbwdcibawifbcaisdb ci[ouaubwciabsd9u[fubawdicba[isdbciasbdc[iabsdciabwecilcbawi;b',
            Category: 'Work',
            id: Math.random() * 10
        },
        {
            Created_At: '1/1/2025',
            Title: 'Day In the Office ',
            Content: 'this is test Content ibaifbiawbwdcibawifbcaisdb ci[ouaubwciabsd9u[fubawdicba[isdbciasbdc[iabsdciabwecilcbawi;b',
            Category: 'Travels',
            id: Math.random() * 10
        },
        {
            Created_At: '1/1/2025',
            Title: 'Day In the Office ',
            Content: 'this is test Content ibaifbiawbwdcibawifbcaisdb ci[ouaubwciabsd9u[fubawdicba[isdbciasbdc[iabsdciabwecilcbawi;b',
            Category: 'Work',
            id: Math.random() * 10
        },
        {
            Created_At: '1/1/2025',
            Title: 'Day In the Office ',
            Content: 'this is test Content ibaifbiawbwdcibawifbcaisdb ci[ouaubwciabsd9u[fubawdicba[isdbciasbdc[iabsdciabwecilcbawi;b',
            Category: 'Work',
            id: Math.random() * 10
        },
    ])
    const getUserJournals = async () => {
        try {
            //function to get the users blogs 
        } catch (error) {
            console.log("Error in the getUserJournals function ", error)
        }
    }
    const isUserLogedin = () => {
        if (loggedin != 'true' ) {
            navigation.navigate("login")
        }
    }
    function getCurrentTimeDate() {
        setDateToday(D.toDateString())
    }

    useEffect(() => {
        isUserLogedin()
        getCurrentTimeDate()
    }, [loggedin])
    return (
        <View style={styles.mainHomeContainer}>
            <View style={styles.NavbarContainer}>
                <ImageBackground source={Bgimg} style={styles.navbarImage} >
                    <View style={styles.searchContainer}>
                        <TextInput placeholder="Search Journy By Title Or Categrory" placeholderTextColor={'grey'} style={styles.searchField} />
                        <TouchableHighlight >
                            <View style={styles.searchBtn}>
                                <AntDesign name="search1" size={20} color={'black'} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.timeDateContainer}>
                        <Text style={[styles.timeDateText, {fontSize :18,color :'black'}]}>Hey👋,Welcome back</Text>
                        <Text style={[styles.timeDateText, styles.DateText]}>Date : {dateToday}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.bodyContainer}>
                <FlatList
                    data={testData}
                    keyExtractor={item => item.id}

                    renderItem={({ item }) =>
                        <View style={styles.JournalContainer} >
                            <View style={styles.JournalContentContainer}>
                                <Text style={[styles.JournalText, styles.JournalDate]}>{item.Created_At}</Text>
                                <Text style={[styles.JournalText, styles.JournalTitle]}>{item.Title.toUpperCase()}</Text>
                                <Text style={[styles.JournalText, styles.JournalContent]}>{item.Content.substring(0,60)}... Press to Read More</Text>
                                <Text style={[styles.JournalCategory]}>{item.Category}</Text>
                            </View>
                            <View style={styles.JournalMoreOPtionContainer}>
                                <TouchableHighlight>
                                    <View style={[styles.JournalMoreOPtionContainerBtn, styles.UpdateJournal]}>
                                        <Text style={{color :'white',fontWeight :'600'}}>Update</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight>
                                    <View style={[styles.JournalMoreOPtionContainerBtn, styles.DeleteJournal]}>
                                        <Text style={{color :'white',fontWeight :'600'}}>Delete</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    }
                />
                <View style={styles.floatingBottomBar}>
                    <TouchableHighlight>
                        <View style={styles.floatingBottomBarBtn}>
                            <View>
                            <Ionicons name="person-circle" size={30} color={'white'} />
                            </View>
                            <View>
                                <Text style={{color :'white'}}>Profile</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={goToCreateJournal}>
                        <View style={[styles.floatingBottomBarBtn, styles.floatingBottomBarBtnProminent]}>
                            <View>
                                <Ionicons name='add-circle' size={60} color={'white'} />
                            </View>
                            <View>
                                <Text style={{color :'white'}}>Add</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <View style={styles.floatingBottomBarBtn}>
                            <View>
                            <Ionicons name="settings" size={30} color='white' />
                            </View>
                            <View>
                                <Text style={{color :'white'}}>Settings</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainHomeContainer: {
        flex: 1,
        backgroundColor: 'pink'
    },
    NavbarContainer: {
        height: '30%',
    },
    bodyContainer: {
        height: '73.4%',
        backgroundColor: 'rgba(222, 142, 169,',
        marginTop: -25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'relative',
        paddingHorizontal: 10,
        paddingTop : 30
    },
    navbarImage: {
        height: '100%',
        width: '100%',
        objectFit: 'fill'
    },
    floatingBottomBar: {
        position: 'absolute',
        bottom: 10,
        left: '23%',
        flexDirection: 'row',
        backgroundColor: 'rgba(235, 56, 116,1)',
        padding: 2,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        width : 210
    },
    floatingBottomBarBtn : {
        padding : 2,
        justifyContent :'center',
        alignItems : 'center'
    },
    searchContainer: {
        height: '30%',
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        padding: 10
    },
    searchField: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'white',
        color: 'black',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    searchBtn: {
        display: 'flex',
        height: 44,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderLeftWidth: 1,
        borderColor: 'black'
    },
    timeDateContainer: {
        height: '40%',
        padding: 10,
        width: '60%',
        backgroundColor: 'rgba(228, 235, 228,0.7)',
        marginLeft: 10,
        borderRadius: 20
    },
    timeDateText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
    },
    JournalContainer : {
        backgroundColor : 'rgb(227, 210, 209)',
        marginBottom :10,
        flexDirection :'row',
        padding : 5,
        borderRadius : 10,
        height : 110,

    },
    JournalContentContainer : {
        width : '80%',
        position :'relative',
    },
    JournalText : {
        fontWeight : '500',
        color : 'black'
    },
    JournalTitle : {
        textAlign : 'center',
        fontSize :16
    },
    JournalCategory : {
        position : 'absolute',
        top : 2,
        right : 10,
        backgroundColor : 'rgba(235, 74, 52,1)',
        padding : 2,
        borderRadius : 5,
        fontWeight :'bold',
        color :'white'
    },
    JournalMoreOPtionContainer : {
        width : '20%',
        height :'100%',
        backgroundColor :'rgb(227, 202, 200)',
        padding : 5,
        borderRadius :10
    },
    JournalMoreOPtionContainerBtn : {
        justifyContent :'center',
        alignItems :'center',
        backgroundColor :'yellow',
        marginBottom :5,
        height : 43,
        borderRadius : 15,
    },
    UpdateJournal : {
        backgroundColor :'rgb(30, 36, 158)'
    },
    DeleteJournal : {
        backgroundColor : 'rgb(173, 24, 54)'
    }
})