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

import { AuthContext } from "../State/AuthContext";
import Header from "../Components/Header";
import { auth, fsGetAvilableMatches } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { backgroundColor, borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const HomeScreen = () => {
  const { authData, authDispatcher } = useContext(AuthContext);
  const navigation = useNavigation();
  const [availableMatches, setAvailableMatches] = useState(false);


  

  const getDummyData = (men, women) => {
    let users = [];

    if (women) {
      for (let i = 1; i < 10; i++) {
        users.push({
          imageUrl: `https://randomuser.me/api/portraits/women/${i}.jpg`,
          name: `Women ${i}`,
        })
      }
    }

    if (men) {
      for (let m = 1; m < 10; m++) {
        users.push({
          imageUrl: `https://randomuser.me/api/portraits/men/${m}.jpg`,
          name: `Men ${m}`,
        })
      }
    }

    return users;

  }

  useEffect(() => {
    fsGetAvilableMatches(authData.user.uid).then((result) => {
      let matches = [];
      result.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        matches.push(doc.data());
      });
      console.log(matches);
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
              cards={getDummyData(true, true)}
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
                <View style={styles.card,{backgroundColor:"white"}}>
                  <Image
                    
                    name="user"
                    source={{
                      uri: match.imageUrl,
                    }}
                    
                  />
                  <Text style={styles.text}>{match.name}</Text>
                </View>
              )}
            />
          )}
          
          </View>
          
        </View>
        <View style={styles.box}>
        <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                console.log("Swiped Left")
              }}
            >
              <Ionicons name="heart-dislike" style={styles.accButton} size={50} color="#FE836D" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("Swiped Right")
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
