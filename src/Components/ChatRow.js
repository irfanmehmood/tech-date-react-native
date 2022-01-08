import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { AuthContext } from '../State/AuthContext';
import { useNavigation } from '@react-navigation/native'
import getMatchedUserInfo from '../Libs/getMatchedUserInfo'
import tw from 'tailwind-rn'
import { collection, getFirestore, onSnapshot, orderBy, query, snapshotEqual } from 'firebase/firestore';


const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { authData, authDispatcher } = useContext(AuthContext);
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState('');

    const db = getFirestore()

    const user = authData.user

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
    }, [matchDetails, user ]);

    useEffect(() => 
        onSnapshot(query(collection(db, "matches", matchDetails.id, "messages"),orderBy('timestamp', 'desc')
        ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
        )
    , [matchDetails, db])

    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('Message', {
            matchDetails,
        })} 
        style={[tw('flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg'), styles.cardShadow]}>
            <Image
                style={tw('rounded-full h-16 w-16 mr-4')}
                source={{ uri: matchedUserInfo?.imageUrl }}
            />

            <View>
                <Text style={tw("text-lg font-semibold")}>
                    {matchedUserInfo?.name}
                </Text>
                <Text>{lastMessage || "Say Hi!"}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    }
})

export default ChatRow
