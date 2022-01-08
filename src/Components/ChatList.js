import {react, useState, useEffect, useContext} from 'react'
import { View, Text, FlatList } from 'react-native'
import tw from 'tailwind-rn'
import { getFirestore, collection, onSnapshot, where, query } from '@firebase/firestore'
import { AuthContext } from "../State/AuthContext";
import ChatRow from './ChatRow';

const ChatList = () => {
    const [matches, setMatches] = useState([])
    const { authData, authDispatcher } = useContext(AuthContext);

    const db = getFirestore()

    useEffect(() => {
        onSnapshot(query(collection(db, 'matches'), where('usersMatched', 'array-contains', authData.user.uid)), (snapshot) => setMatches(snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))))
    }, [authData.user])

    return (
        matches.length > 0 ? (
            <FlatList
                style={tw("h-full")}
                data={matches}
                keyExtractor={item => item.id}
                renderItem={({item}) => <ChatRow matchDetails={item} />}
            />
        ): (
            <View style={tw("p-5")}>
                <Text style={tw("text-center text-lg")}>No matches at the moment</Text>
            </View>
        )
       
    )
}

export default ChatList
