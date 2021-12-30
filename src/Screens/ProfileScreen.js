import Header from "../Components/Header";
import React, { useContext, useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { auth, fsUpdateUser, fsGetUser } from "../../firebase";
import { AuthContext } from "../State/AuthContext";

const ProfileScreen = () => {
  const { authData, authDispatcher } = useContext(AuthContext);
  const [userProfileName, setUserProfileName] = useState(authData.profile.name);
  const [userProfileAge, setUserProfileAge] = useState(
    authData.profile.age.toString()
  );
  const [userProfileImageUrl, setUserProfileImageUrl] = useState(
    authData.profile.imageUrl
  );

  // Try saving profile
  const handleProfileSave = () => {
    fsUpdateUser(authData.user.uid, userProfileName, userProfileAge);
  };

  return (
    <>
      <SafeAreaView>
        <Header />
        <View style={styles.body}>
          {userProfileName && (
            <>
              <Text>Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={userProfileName}
                onChangeText={(text) => {
                  setUserProfileName(text);
                }}
              />
              <Text>Age:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={userProfileAge}
                onChangeText={(text) => {
                  setUserProfileAge(text);
                }}
              />

              <Text>Image:</Text>
              <TextInput
                style={styles.input}
                value={userProfileImageUrl}
                onChangeText={(text) => {
                  setUserProfileImageUrl(text);
                }}
              />
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={handleProfileSave}>
            <Text style={styles.textButton}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    marginBottom: 10,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    borderRadius: 75,
  },
});

export default ProfileScreen;
