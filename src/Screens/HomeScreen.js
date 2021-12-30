import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-deck-swiper";

import { AuthContext } from "../State/AuthContext";
import Header from "../Components/Header";
import { auth, fsGetAvilableMatches } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

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
        <View>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Text style={styles.textButton}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignout}>
            <Text style={styles.textButton}>Sign out</Text>
          </TouchableOpacity> */}
          {availableMatches && (
            <Swiper
              cards={getDummyData(true, true)}
              onSwiped={(cardIndex) => {console.log("cardIndex" , cardIndex)}}
              cardIndex={0}
              backgroundColor={'#4FD0E9'}
              stackSize= {3}
              animateCardOpacity
              verticalSwipe={false}
              onSwipedLeft={(cardIndex) => {
                console.log('onSwipedLeft', cardIndex)
              }}
              onSwipedRight={(cardIndex) => {
                console.log('onSwipedRight', cardIndex)
              }}
              renderCard={(match) => (
                <View style={styles.card}>
                  <Image
                    style={styles.tinyLogo}
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    display: "flex",
  },
  card: {
    // padding: 10,
    display: "flex",
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginBottom: 10,
    padding: 20,
  },
  text: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    marginBottom: 10,
  },
  tinyLogo: {
    height: "60%",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "white",
    marginBottom: 20,
  },
});

export default HomeScreen;
