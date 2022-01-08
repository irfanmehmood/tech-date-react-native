import {React, useLayoutEffect, useContext, useState, useEffect} from 'react'
import { View, SafeAreaView, TextInput, Button, KeyboardAvoidingView, Platform, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Header from './Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import getMatchedUserInfo from '../Libs/getMatchedUserInfo'
import {AuthContext} from "../State/AuthContext";
import tw from 'tailwind-rn'
import SenderMessage from '../Components/SenderMessage'
import RecieverMessage from '../Components/RecieverMessage'
import { addDoc, collection,getFirestore,onSnapshot,serverTimestamp, query, orderBy } from "firebase/firestore"


const MessageScreen = () => {

    const { authData, authDispatcher } = useContext(AuthContext);
    const user = authData.user
    const {params} = useRoute();
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    const { matchDetails } = params;
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: false
        });
    }, []);

    useEffect(() => 
            onSnapshot(query(collection(getFirestore(), 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')), (snapshot) => setMessages(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            )
        ),
        [matchDetails, getFirestore()])

    const sendMessage = () => {
        addDoc(collection(getFirestore(), "matches", matchDetails?.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            name: authData.profile.name,
            imageUrl: authData.profile.imageUrl,
            message:input,
        })

        setInput("");
    };

    

    return (
        <SafeAreaView style={tw('flex-1')}>
            <Header title={getMatchedUserInfo(matchDetails?.users, user.uid).name} callEnabled messageScreen />

            <KeyboardAvoidingView
            behavior={Platform.OS === "ios"? "padding" : "height"}
            style={tw("flex-1")}
            keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={messages}
                        inverted={-1}
                        style={tw("pl-4")}
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) => 
                            message.userId === user.uid ? (
                                <SenderMessage key={message.id} message={message}/>
                            ) : (
                                <RecieverMessage key={message.id} message={message}/>
                            )
                    }
                    />
                </TouchableWithoutFeedback>
               
            
            <View
                style={tw("flex-row justify-between items-center border-t border-gray-200 px-5 py-2")}
            >
                <TextInput 
                    style={tw("h-10 text-lg")}
                    placeholder='Send Message...'
                    onChangeText={setInput}
                    onSubmitEditing={sendMessage}
                    value={input}
                />
                <Button onPress={sendMessage} title='Send' color="#FF5864" />
            </View>
            </KeyboardAvoidingView>

            
        </SafeAreaView>
    )
}

export default MessageScreen
