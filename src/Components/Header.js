import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../State/AuthContext";


const Header = () => {

  const { authData, authDispatcher } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          {authData.profile && 
          <Image
            style={styles.tinyLogo}
            name="user"
            source={{
              uri: authData.profile.imageUrl,
            }}
          />
          }
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Feather
            style={styles.centeredIcon}
            name="home"
            size={50}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Feather
            style={styles.centeredIcon}
            name="settings"
            size={50}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    borderWidth: 0,
    flexDirection: "row",
    display: "flex",
  },
  row: {
    padding: 0,
    flex: 1,
    textAlign: "center",
  },
  centeredIcon: {
    textAlign: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    borderWidth: 3,
    borderColor: "red"
  },
});

export default Header;
