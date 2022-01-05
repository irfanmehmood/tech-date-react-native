import {react, useState, useEffect, query, where} from 'react'
import { View, Text } from 'react-native'
import tw from 'tailwind-rn'
import { getFirestore, collection, onSnapshot } from '@firebase/firestore'

const ChatList = () => {
    const [matches, setMatches] = useState([])

    const db = getFirestore()

    useEffect(() => {
        onSnapshot(query(collection(db, 'matches'), where('usersMatches', 'array-contains', authData.user.uid)), snapshot => {
            
        })
    }, [])

    return (
        <View>
            <Text>Chatlist...</Text>
        </View>
    )
}

export default ChatList
