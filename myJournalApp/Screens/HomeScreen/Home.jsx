import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, TextInput, FlatList,ActivityIndicator,KeyboardAvoidingView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState, useRef,useCallback } from "react";
import { globalContext } from "../../App";
import baseUrl from "../../config/serverUrl";
import Bgimg from '../../Assets/bg2.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useFocusEffect } from "@react-navigation/native";
import ErrorAlert from '../../Componets/Alerts/ErrorAlert';
import SuccessAlert from '../../Componets/Alerts/SuccessAlert';
export default function Home({ navigation }) {
    const [dateToday, setDateToday] = useState('');
    const { jwtToken, loggedin } = useContext(globalContext);
    const D = new Date();
    const [showSpinner, setShowSpinner] = useState(false);
    const [userJournals, setUserJournals] = useState(null);
    const [originalJournals, setOriginalJournals] = useState(null);
    const [showJournalList, setShowJournalList] = useState(false);
    const [showNoJournals, setshowNoJournals] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    function goToCreateJournal() {
        try {
            navigation.navigate("createJournal");
        } catch (error) {
            console.log('Error in the goToCreateJournal function', error);
        }
    } 

    const fetchJournals = async () => {
        setShowSpinner(true);
        try {
            const res = await fetch(`${baseUrl}/user/getJournals`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `bearer ${jwtToken}`
                }
            });
            const data = await res.json();
            setShowSpinner(false);
            if (data.status) {
                if (data.result.length > 0) {
                    setshowNoJournals(false);
                    setUserJournals(data.result);
                    setOriginalJournals(data.result);
                    setShowJournalList(true);
                } else {
                    setshowNoJournals(true);
                }
            } else {
                console.log('Error in fetching journals');
            }
        } catch (error) {
            setShowSpinner(false);
            console.log("Error in the fetchJournals function", error);
        }
    };

    const isUserLogedin = () => {
        if (loggedin !== 'true') {
            navigation.navigate("login");
        }
    };

    function getCurrentTimeDate() {
        setDateToday(D.toDateString());
    }

    const goReadJournalHandler = (item) => {
        try {
            navigation.navigate('readJournal', item);
        } catch (error) {
            console.log('Error in goReadJournalHandler', error);
        }
    };

    const goEditJournalHandler = (item) => {
        try {
            navigation.navigate('EditJournal', item);
        } catch (error) {
            console.log('Error in goEditJournalHandler', error);
        }
    };

    const gotoSettingsBtnHandler = () => {
        try {
            navigation.navigate('Settings');
        } catch (error) {
            console.log('Error in gotoSettingsBtnHandler', error);
        }
    };

    const deleteRequest = async (_journalId) => {
        try {
            const res = await fetch(`${baseUrl}/user/deleteJournal`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `bearer ${jwtToken}`
                },
                body: JSON.stringify(_journalId)
            });
            const data = await res.json();
            if (data.status) {
                setSuccessMsg(data.msg);
                setShowSuccessAlert(true);
            } else {
                setErrorMsg(data.msg);
                setShowErrorAlert(true);
            }
        } catch (error) {
            console.log('Error in deleteRequest', error);
        }
    };

    const deleteJournalHandler = (item) => {
        const _JournalID = {
            journalID: item.id
        };
        deleteRequest(_JournalID);
        setUserJournals(userJournals.filter(journal => journal.id !== item.id));
        setOriginalJournals(originalJournals.filter(journal => journal.id !== item.id));
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text) {
            const filteredJournals = originalJournals.filter(journal => 
                journal.title.toLowerCase().includes(text.toLowerCase()) ||
                journal.category.toLowerCase().includes(text.toLowerCase())
            );
            setUserJournals(filteredJournals);
        } else {
            setUserJournals(originalJournals);
        }
    };
    useFocusEffect(useCallback(
        ()=>{
            isUserLogedin();
            fetchJournals()
            getCurrentTimeDate();
            setTimeout(() => {
                setShowErrorAlert(false);
                setShowSuccessAlert(false);
            }, 4000);        },[showErrorAlert, showSuccessAlert]
    ))


    return (
        <KeyboardAvoidingView enabled={false} style={styles.mainHomeContainer}>
        <View >
            <View style={styles.NavbarContainer}>
                <ImageBackground source={Bgimg} style={styles.navbarImage}>
                    <View style={styles.searchContainer}>
                        <TextInput 
                            placeholder="Search Journal By Title Or Category"
                            placeholderTextColor={'grey'}
                            style={styles.searchField}
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                        <TouchableHighlight>
                            <View style={styles.searchBtn}>
                                <AntDesign name="search1" size={20} color={'black'} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.timeDateContainer}>
                        <Text style={[styles.timeDateText, { fontSize: 18, color: 'black' }]}>Hey👋, Welcome back</Text>
                        <Text style={[styles.timeDateText, styles.DateText]}>Date: {dateToday}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.bodyContainer}>
                {showSpinner && <ActivityIndicator size={30} />}
                {showNoJournals && <View><Text>You Have Not Written Any Journal. Click the Add button to write Your Story</Text></View>}
                {showJournalList && <FlatList
                    data={userJournals}
                    keyExtractor={item => item.created_at}
                    renderItem={({ item }) =>
                        <TouchableHighlight onPress={() => goReadJournalHandler(item)}>
                            <View style={styles.JournalContainer}>
                                <View style={styles.JournalContentContainer}>
                                    <Text style={[styles.JournalText, styles.JournalDate]}>{item.JournalDate}</Text>
                                    <Text style={[styles.JournalText, styles.JournalTitle]}>{item.title.toUpperCase()}</Text>
                                    <Text style={[styles.JournalText, styles.JournalContent]}>{item.content.substring(0, 60)}... Press to Read More</Text>
                                    <Text style={styles.JournalCategory}>{item.category}</Text>
                                </View>
                                <View style={styles.JournalMoreOPtionContainer}>
                                    <TouchableHighlight onPress={() => goEditJournalHandler(item)}>
                                        <View style={[styles.JournalMoreOPtionContainerBtn, styles.UpdateJournal]}>
                                            <Text style={{ color: 'white', fontWeight: '600' }}>Update</Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => deleteJournalHandler(item)}>
                                        <View style={[styles.JournalMoreOPtionContainerBtn, styles.DeleteJournal]}>
                                            <Text style={{ color: 'white', fontWeight: '600' }}>Delete</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableHighlight>
                    }
                />}
                <View style={styles.floatingBottomBar}>
                    <TouchableHighlight onPress={gotoSettingsBtnHandler}>
                        <View style={styles.floatingBottomBarBtn}>
                            <Ionicons name="person-circle" size={30} color={'white'} />
                            <Text style={{ color: 'white' }}>Profile</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={goToCreateJournal}>
                        <View style={[styles.floatingBottomBarBtn, styles.floatingBottomBarBtnProminent]}>
                            <Ionicons name='add-circle' size={60} color={'white'} />
                            <Text style={{ color: 'white' }}>Add</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={gotoSettingsBtnHandler}>
                        <View style={styles.floatingBottomBarBtn}>
                            <Ionicons name="settings" size={30} color='white' />
                            <Text style={{ color: 'white' }}>Settings</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            {showErrorAlert && <ErrorAlert message={errorMsg} />}
            {showSuccessAlert && <SuccessAlert message={successMsg} />}
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    mainHomeContainer: {
        flex: 1,
        backgroundColor: 'pink',
        height : '100%'
    },
    NavbarContainer: {
        height: '30%',
    },
    bodyContainer: {
        height: '73.4%',
        backgroundColor: 'rgba(222, 142, 169, 1)',
        marginTop: -25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'relative',
        paddingHorizontal: 10,
        paddingTop: 30
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
        backgroundColor: 'rgba(235, 56, 116, 1)',
        padding: 2,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 210
    },
    floatingBottomBarBtn: {
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    floatingBottomBarBtnProminent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        width: '62%',
        backgroundColor: 'rgba(228, 235, 228, 0.7)',
        marginLeft: 10,
        borderRadius: 20
    },
    timeDateText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
    },
    JournalContainer: {
        backgroundColor: 'rgb(255, 250, 249)',
        marginBottom: 10,
        flexDirection: 'row',
        padding: 5,
        borderRadius: 10,
        height: 110,
    },
    JournalContentContainer: {
        width: '80%',
        position: 'relative',
    },
    JournalText: {
        fontWeight: '500',
        color: 'black'
    },
    JournalTitle: {
        textAlign: 'center',
        fontSize: 16
    },
    JournalCategory: {
        position: 'absolute',
        top: 2,
        right: 10,
        backgroundColor: 'rgba(235, 74, 52, 1)',
        padding: 2,
        borderRadius: 5,
        fontWeight: 'bold',
        color: 'white'
    },
    JournalMoreOPtionContainer: {
        width: '20%',
        height: '100%',
        backgroundColor: 'rgb(227, 202, 200)',
        padding: 5,
        borderRadius: 10
    },
    JournalMoreOPtionContainerBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        height: 43,
        borderRadius: 15,
    },
    UpdateJournal: {
        backgroundColor: 'rgb(30, 36, 158)'
    },
    DeleteJournal: {
        backgroundColor: 'rgb(173, 24, 54)'
    }
});