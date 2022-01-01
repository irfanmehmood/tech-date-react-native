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
import { Ionicons, MaterialCommunityIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import MyTabs from "../Components/BottomTabs";

const HomeScreen = () => {
  const { authData, authDispatcher } = useContext(AuthContext);
  const navigation = useNavigation();
  const [availableMatches, setAvailableMatches] = useState(false);

  useEffect(() => {
    fsGetAvilableMatches(authData.user.uid, authData.profile.gender).then((result) => {
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
        {/*<Header />*/}
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
                /*<View style={styles.card,{backgroundColor:"white"}, styles.cardShadow}>
                  <Image
                    
                    style={{
                      flex: 1,
                      width:"75%",
                      height: "75%",
                    }}
                    name="user"
                    source={{
                      uri: match.imageUrl,
                    }}
                    
                  />
                  <Text style={styles.text}>{match.name}</Text>
                </View>*/
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
              <Entypo name="cross" style={styles.accButton} size={50} color="#ff2667" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("I Like")
              }}
            >
              <SimpleLineIcons name="heart" style={styles.accButton, styles.accButtonOVR} size={35} color="#ff2667" />
            </TouchableOpacity>
          </View>
          
          </View>
          
      </SafeAreaView>
    </>
  );
};



export default HomeScreen;
