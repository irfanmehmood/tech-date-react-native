import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { AuthContext } from "../State/AuthContext";
import Header from "../Components/Header";
import { auth } from '../../firebase';


const HomeScreen = () => {

  const { authData, authDispatcher } = useContext(AuthContext);

  const handleSignout = () => {
    auth
    .signOut()
    .then(() => {
      authDispatcher({
        type: "userLoggedIn",
        payload: null,
      });
    });
  }

  return (
    <>
    <SafeAreaView>
      <Header />
      <Text style={styles.text}>Hello {authData.user.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignout}>
        <Text style={styles.textButton}>Sign out</Text>
      </TouchableOpacity></SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    margin: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 12,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    margin: 12,
  },
  error: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "red",
    margin: 12,
  },
});

export default HomeScreen;
