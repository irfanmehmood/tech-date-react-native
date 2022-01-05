import Header from "../Components/Header";
import React, { useContext, useState, useEffect, useLayoutEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { auth, fsUpdateUser, fsGetUser, createDummyData } from "../Libs/firebase";
import { AuthContext } from "../State/AuthContext";
import { useNavigation } from "@react-navigation/native";
import tailwind from "tailwind-rn";

const ProfileScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const { authData, authDispatcher } = useContext(AuthContext);
  const [userProfileName, setUserProfileName] = useState(
    authData.profile ? authData.profile.name : false
  );
  const [userProfileAge, setUserProfileAge] = useState(
    authData.profile ? authData.profile.age.toString() : 0
  );
  const [userProfileImageUrl, setUserProfileImageUrl] = useState(
    authData.profile ? authData.profile.imageUrl : false
  );

  const [userCountry, setUserCountry] = useState(
    authData.profile ? authData.profile.countryCode : false
  );

  // Try saving profile
  const handleProfileSave = () => {
    fsUpdateUser(authData.user.uid, userProfileName, userProfileAge);
  };

  // Try creating dummy data
  const handleCreateDummyData = () => {
    createDummyData(5);
  };

  return (

        <View style={tailwind(" flex-1 items-center pt-1 ")}>

              <Image style={tailwind("h-20 w-20 rounded-3xl")} source={{ uri: userProfileImageUrl }} />

              <Text style={tailwind("text-xl text-gray-500 p-2 font-bold")}>Welcome {authData?.profile?.name}</Text>

              <Text style={tailwind("text-center p-5 font-bold text-red-400")}>1. Enter your Name:</Text>
              <TextInput
                style={tailwind("text-center text-xl pb-2")}
                placeholder="Name"
                value={userProfileName}
                onChangeText={(text) => {
                  setUserProfileName(text);
                }}
              />
              <Text style={tailwind("text-center p-4 font-bold text-red-400")}>2. Enter Your Age:</Text>
              <TextInput
                style={tailwind("text-center text-xl pb-2")}
                keyboardType="numeric"
                value={userProfileAge}
                onChangeText={(text) => {
                  setUserProfileAge(text);
                }}
              />

              <Text style={tailwind("text-center p-4 font-bold text-red-400")}>3. Enter Profile Pic:</Text>
              <TextInput
               style={tailwind("text-center text-xl pb-2")}
                value={userProfileImageUrl}
                onChangeText={(text) => {
                  setUserProfileImageUrl(text);
                }}
              />

            <Text style={tailwind("text-center p-4 font-bold text-red-400")}>4. Enter Country:</Text>
              <TextInput
                style={tailwind("text-center text-xl pb-2")}
                value={userCountry}
                onChangeText={(text) => {
                  setUserCountry(text);
                }}
              />
            
          <TouchableOpacity style={tailwind("w-64 p-3 rounded-xl absolute bottom-10 bg-red-400")} onPress={handleProfileSave}>
            <Text style={tailwind("text-center text-white text-xl")}>Update Profile</Text>
          </TouchableOpacity>
          {/* {authData.user.email === "irfmehmood@gmail.com" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => createDummyData(10)}
            >
              <Text style={styles.textButton}>Create Dummy Users</Text>
            </TouchableOpacity>
          )} */}
        </View>
  );
};



export default ProfileScreen;
