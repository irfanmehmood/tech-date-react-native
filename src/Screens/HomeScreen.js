import React, { useContext, useState, useEffect, useLayoutEffect, useRef } from "react";
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
import Card from "../Components/Card";

import { AuthContext } from "../State/AuthContext";
import Header from "../Components/Header";
import { auth, fsGetAvilableMatches } from "../Libs/firebase"
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons, Entypo, AntDesign , SimpleLineIcons } from '@expo/vector-icons';
import { UpdateSwipe } from "../Components/BottomTabs";
import tailwind from "tailwind-rn";
import { onSnapshot,doc, query, getFirestore, setDoc, getDocs, collection, where, snapshotEqual, getDoc, serverTimestamp } from "firebase/firestore";
import generateId from "../Libs/generateId";

const HomeScreen = () => {
  const { authData, authDispatcher } = useContext(AuthContext);
  const navigation = useNavigation();
  const [availableMatches, setAvailableMatches] = useState(false);
  const swipeRef = useRef();

  const swipeLeft = async(cardIndex) => {
      if (!availableMatches[cardIndex]) return;
      const userPass = availableMatches[cardIndex]
      console.log(`You swiped PASS on ${userPass.name}`)

      setDoc(doc(getFirestore(), 'users', authData?.user?.uid, "passes", userPass.uid), userPass)
  };

  const swipeRight = async(cardIndex) => {
      if (!availableMatches[cardIndex]) return;

      const userSwiped = availableMatches[cardIndex];
      const loggedInProfile = await (await getDoc(doc(db, "users", authData.user.uid))).data();
      
      //checks if user matched with you...
     getDoc(doc(db, 'users', userSwiped.uid, 'swipes', authData.user.uid)).then(
        (documentSnapshot) => {
          if(documentSnapshot.exists()) {
            //Match!
            
            console.log(`Hooray, you matched with ${userSwiped.name}`)

            setDoc(
              doc(db, "users", authData.user.uid, "swipes", userSwiped.uid),
              userSwiped
            );
            //Create Match
            setDoc(doc(db, 'matches', generateId(authData.user.uid, userSwiped.uid)),{
              users: {
                [authData.user.uid]: loggedInProfile,
                [userSwiped.uid]: userSwiped
              },
              usersMatched: [authData.user.uid, userSwiped.uid],
              timestamp: serverTimestamp(),
            });

            navigation.navigate('Match', {
                loggedInProfile,
                userSwiped,
            });
            

          } else {
            console.log(
              `You swiped on ${userSwiped.name} (${userSwiped.age})`
            );
            setDoc(
              doc(db, "users", authData.user.uid, "swipes", userSwiped.uid),
              userSwiped
            );
          }
        }
      )

  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(getFirestore(), "users", auth?.currentUser?.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Profile")
      }
    });

    return unsub();
  }, []);

  const db = getFirestore()

  useEffect(() => {
    /*fsGetAvilableMatches(authData?.user?.uid).then((result) => {
      let matches = [];
      result.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        matches.push(doc.data());
      });
      //console.log(matches);
      setAvailableMatches(matches);
    });*/
    let unsub;

    const fetchCards = async () => {
      
      let passedUserIds = ["test"]
      let swipedUserIds = ["test"]

      const passes = await getDocs(collection(db, "users", authData.user.uid, "passes")).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const swipes = await getDocs(collection(db, "users", authData.user.uid, "swipes")).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      passedUserIds = passes?.length > 0 ? passes : ["test"];

      swipedUserIds = swipes?.length > 0 ? swipes : ["test"];

      console.log(passedUserIds, swipedUserIds)
      
      unsub = onSnapshot(query(collection(db, "users"), where("uid", "not-in", [...passedUserIds, ...swipedUserIds])) ,(snapshot) => {
        setAvailableMatches(
          snapshot.docs
            .filter((doc) => doc.id !== authData?.user?.uid)
            .map((doc) => ({
              uid: doc.uid,
              ...doc.data(),
            }))
        )
      })
    }
    fetchCards();
    return unsub;
  }, [db]);

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
      <SafeAreaView style={tailwind("flex-1 bg-white")} >
        {/*<Header />*/}
        
          <View style={[tailwind("flex-1 -mt-6")]} >
          {availableMatches  && (
            <Swiper 
              ref={swipeRef}
              backgroundColor="white"
              cards={availableMatches}
              cardIndex={0}
              useViewOverflow={Platform.OS === 'ios'}
              stackSize= {5}
              verticalSwipe={false}
              animateCardOpacity
              onSwipedLeft={(cardIndex) => {
                swipeLeft(cardIndex)
                UpdateSwipe()
              }}
              onSwipedRight={(cardIndex) => {
                swipeRight(cardIndex)
                UpdateSwipe()
              }}
              overlayLabels={{
                left: {
                  title: "NO",
                  style: {
                    label: {
                      textAlign: "right",
                      color: "red",
                    },
                  },
                },
                right: {
                  title: "MATCH!",
                  style: {
                    label:{
                      color: "#4DED30"
                    }
                  }
                }
              }}
              renderCard={(match) => match ? (
                //<Card match={match} />
                <View style={tailwind("relative bg-white h-3/4 rounded-xl ")}>
                  <Image style={tailwind("absolute top-0 h-full w-full rounded-xl")} source={{ uri: match.imageUrl }} />
                  <View style={[tailwind("absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl"), styles.cardShadow]}>
                    <View>
                      <Text style={tailwind("text-xl font-bold")}>{match.name}</Text>
                      <Text>{match.countryCode}</Text>
                    </View>
                    <Text style={tailwind("text-2xl font-bold")}>{match.age}</Text>
                  </View>
                </View>
              ): (
                <View style={[tailwind("relative bg-white h-3/4 rounded-xl justify-center items-center"), styles.cardShadow]}>
                  <Text style={tailwind("font-bold pb-5")} >No more profiles</Text>

                  <Image 
                    style={tailwind("h-80 w-80")}
                    height={100}
                    width={100}
                    source={{ uri: "https://links.papareact.com/6gb" }} />
                </View>
              )}
            />
          )}

          
          
          
          
        </View>
        <View style={tailwind("flex flex-row justify-evenly")}>
          <TouchableOpacity style={tailwind("items-center justify-center rounded-full w-16 h-16 bg-red-200")}
            onPress={() => swipeRef.current.swipeLeft()}>
            <Entypo name='cross' color="red" size={24}  />
          </TouchableOpacity>
          <TouchableOpacity style={tailwind("items-center justify-center rounded-full w-16 h-16 bg-green-200")}
            onPress={() => swipeRef.current.swipeRight()}>
            <AntDesign name='heart' color="green" size={24} />
          </TouchableOpacity>
        </View>
          
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  }
})

export default HomeScreen;
