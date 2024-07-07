import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'
import baseUrl from '../../config/serverUrl'
import ErrorAlert from '../../Componets/Alerts/ErrorAlert'
import SuccessAlert from '../../Componets/Alerts/SuccessAlert'
export default function JournalForm({create,update,jwt,navigation,editData}) {    
    const [journalId, setJournalId] = useState(update && editData ? editData.id : '');
    const [selectedDate, setSelectedDate] = useState(update && editData ? editData.JournalDate : '');
    const [Title, setTitle] = useState(update && editData ? editData.title : '');
    const [Content, setContent] = useState(update && editData ? editData.content : '');
    const [Category, setCategory] = useState(update && editData ? editData.category : '');
    const [showDatePickerModal, setShowDatePickerModal] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showSuccesAlert, setShowSuccessAlert] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [disableForm, setDisableForm] = useState(false);
    function showDateModal() {
        setShowDatePickerModal(true)
    }

    const getDate = (day) => {
        setSelectedDate(day.dateString)
        setShowDatePickerModal(false)
    }
const sendJournal = async(details,APIRoute)=>{
    
    try {
        const res = await fetch(`${baseUrl}/user/${APIRoute}`,{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'authorization' : `bearer ${jwt}`
            },
            body : JSON.stringify(details)
        })
        const data = await res.json()
        if(!data.status  && data.msg === "JWT token Not accepted"){
            setErrorMsg("Sorry Your Seesion Has Expired Please Log back in")
                setShowErrorAlert(true)

        }else if(!data.status){
            setErrorMsg("An Error has occured please try again")
            setShowErrorAlert(true)
        }else if(data.status){
            setSuccessMsg(data.msg)
            setShowSuccessAlert(true)
        }
    } catch (error) {
        console.log("Error in the sendBlog  function",error)
    }
}
const createJournalHandler = ()=>{
    if(selectedDate.length > 0 && Title.trim().length > 0 && Content.trim().length > 0 && Category.trim().length > 0 ){
        const journalData = {
            journalDate :selectedDate,
            Title :Title.trim(),
            content : Content.trim(),
            Category : Category.trim()
        }
        sendJournal(journalData,'addJournal')
    }else{
        setErrorMsg("Journal Field length Not Valid")
        setShowErrorAlert(true)
    }
}
const updateJournalBtnHandler = ()=>{
    if(selectedDate.length > 0 && Title.trim().length > 0 && Content.trim().length > 0 && Category.trim().length > 0 ){
        const journalData = {
            journalDate :selectedDate,
            Title :Title.trim(),
            content : Content.trim(),
            Category : Category.trim(),
            JournalID : journalId
        }
        sendJournal(journalData,'updateJournal')
    }else{
        setErrorMsg("Journal Field length Not Valid")
        setShowErrorAlert(true)
    }
}
useEffect(()=>{
setTimeout(()=>{
    setShowErrorAlert(false)
    setShowSuccessAlert(false)
},4000)
},[showErrorAlert,showSuccesAlert,disableForm])
    return (
        <View style={styles.mainJournalForm}>
            {disableForm && <Text style={{color:'black'}}>Please Log back in - logout</Text>}
            { !disableForm &&
            <View>
            <View style={styles.displayDate}>
                <TouchableOpacity onPress={showDateModal}>
                    <View style={styles.SelectDatebtn}>
                        <Text style={{ color: 'white' }}>Update Date</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 16 }}>
                 {selectedDate.length < 1 ? "Select Date" : selectedDate}
                </Text>
            </View>
            {showDatePickerModal && (
                <Calendar
                    onDayPress={getDate}
                    markedDates={{ [selectedDate]: { selected: true } }}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder='Enter The Journal Title'
                placeholderTextColor={'grey'}
                value={Title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.textArea, styles.input]}
                placeholder='Write Your Story here'
                placeholderTextColor={'grey'}
                value={Content}
                onChangeText={setContent}
                multiline={true}
            />
            <TextInput
                style={styles.input}
                placeholder='Journal Category eg Office,Travel'
                placeholderTextColor={'grey'}
                value={Category}
                onChangeText={setCategory}
            />
            <View style={styles.JournalFormControlsContainer}>
                {
                    create &&
                    <TouchableOpacity onPress={createJournalHandler}>
                     <View style={[styles.JournalFormControlsBtn,styles.CreateJournal]}>
                        <Text style={styles.JournalFormControlsBtnText}>Create Journal</Text>
                    </View>
                    </TouchableOpacity>
                }
                {
                    update &&
                    <TouchableOpacity onPress={updateJournalBtnHandler}>
                     <View style={[styles.JournalFormControlsBtn,styles.updateJournaal]}>
                        <Text style={styles.JournalFormControlsBtnText}>Update</Text>
                    </View>
                    </TouchableOpacity>
                }
            </View>
            </View>
            }
            {showErrorAlert  && <ErrorAlert message={errorMsg}/>}
            {showSuccesAlert && <SuccessAlert message={successMsg}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    mainJournalForm: {
        padding: 10,
    },
    CalenderContainer: {
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 6
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        color: 'black',
    },
    textArea: {
        height: 100,
    },
    displayDate: {
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    SelectDatebtn: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 6,
        marginRight: 5,
    },
    JournalFormControlsContainer : {
        padding : 10,
    },
    JournalFormControlsBtn : {
        padding : 15,
        borderRadius : 20,
        alignSelf : 'center',
        width : 150,
        borderWidth : 1,
        borderColor : 'red'
    },
    CreateJournal : {
        backgroundColor : 'blue'
    },
    JournalFormControlsBtnText : {
        color : 'white',
        textAlign :'center'
    },
    updateJournaal :{
        backgroundColor : 'green'
    }
})

