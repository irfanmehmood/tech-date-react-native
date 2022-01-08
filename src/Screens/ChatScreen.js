import React, {useLayoutEffect} from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import Header from './Header'
import ChatList from '../Components/ChatList'
import { useNavigation } from "@react-navigation/native";


const ChatScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView>
      <Header title="Chat"/>
      <ChatList />
    </SafeAreaView>
  )
}

export default ChatScreen
