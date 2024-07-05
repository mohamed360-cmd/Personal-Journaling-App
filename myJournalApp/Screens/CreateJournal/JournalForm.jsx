import { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

export default function JournalForm() {
    const [selectDate, setSelectDate] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')

    return (
        <View style={styles.mainJournalForm}>
            <View style={styles.CalenderContainer}>
                <Text>Date{'1/1/2021'}</Text>
            </View>
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
    }
})
