import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { styles } from "../Libs/style";
import Card from "../Components/Card";

import { AuthContext } from "../State/AuthContext";
import Header from "../Components/Header";
import { auth, fsGetAvilableMatches } from "../Libs/firebase"
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const { authData, authDispatcher } = useContext(AuthContext);
  const navigation = useNavigation();
  const [availableMatches, setAvailableMatches] = useState(false);

  useEffect(() => {
    fsGetAvilableMatches(authData.user.uid).then((result) => {
      let matches = [];
      result.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        matches.push(doc.data());
      });
      //console.log(matches);
      setAvailableMatches(matches);
    });
  }, []);

  // Handle signout for user
  const handleSignout = () => {
    auth.signOut().then(() => {
      authDispatcher({
        type: "userLoggedIn",
        payload: null,
      });
    });
  };

  return (
    <>
      <SafeAreaView style={styles.body}>
        <Header />
        <View style={styles.card}>
          <View style={styles.body}>
          
          {availableMatches  && (
            <Swiper 
              backgroundColor="white"
              cards={availableMatches}
              onSwiped={(cardIndex) => {console.log("cardIndex" , cardIndex)}}
              cardIndex={0}
              
              stackSize= {3}
              verticalSwipe={false}
              onSwipedLeft={(cardIndex) => {
                console.log('onSwipedLeft', cardIndex)
              }}
              onSwipedRight={(cardIndex) => {
                console.log('onSwipedRight', cardIndex)
              }}
              renderCard={(match) => (
                <Card match={match} />
              )}
            />
          )}
          
          </View>
          
        </View>
        <View style={styles.box}>
        <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                console.log("Do not like")
              }}
            >
              <Ionicons name="heart-dislike" style={styles.accButton} size={50} color="#FE836D" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("I Like")
              }}
            >
              <Ionicons name="heart-sharp" style={styles.accButton} size={50} color="#63DE9B" />
            </TouchableOpacity>
          </View>
          </View>
      </SafeAreaView>
    </>
  );
};



export default HomeScreen;
