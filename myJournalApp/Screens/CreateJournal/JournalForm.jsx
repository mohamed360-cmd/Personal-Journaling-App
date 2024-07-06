import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'
import baseUrl from '../../config/serverUrl'
import ErrorAlert from '../../Componets/Alerts/ErrorAlert'
import SuccessAlert from '../../Componets/Alerts/SuccessAlert'
export default function JournalForm({create,update,jwt,navigation}) {
    
    const [selectedDate, setSelectedDate] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [showDatePickerModal, setShowDatePickerModal] = useState(false)
    const [showErrorAlert,setShowErrorAlert] = useState(false)
    const [errorMsg,setErrorMsg] = useState('')
    const [showSuccesAlert,setShowSuccessAlert] = useState(false)
    const [successMsg,setSuccessMsg] = useState('')
    const [disableForm,setDisableForm] = useState(false)
    function showDateModal() {
        setShowDatePickerModal(true)
    }

    const getDate = (day) => {
        setSelectedDate(day.dateString)
        setShowDatePickerModal(false)
    }
const sendJournal = async(details)=>{
    
    try {
        const res = await fetch(`${baseUrl}/user/addJournal`,{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'authorization' : `bearer ${jwt.trim()}`
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
        console.log("Error in the createBlogHandler function",error)
    }
}
const createJournalHandler = ()=>{
    if(selectedDate.length > 0 && title.trim().length > 0 && content.trim().length > 0 && category.trim().length > 0 ){
        const journalData = {
            journalDate :selectedDate,
            Title :title.trim(),
            content : content.trim(),
            Category : category.trim()
        }
        sendJournal(journalData)
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
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.textArea, styles.input]}
                placeholder='Write Your Story here'
                placeholderTextColor={'grey'}
                value={content}
                onChangeText={setContent}
                multiline={true}
            />
            <TextInput
                style={styles.input}
                placeholder='Journal Category eg Office,Travel'
                placeholderTextColor={'grey'}
                value={category}
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
                    <TouchableOpacity>
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

