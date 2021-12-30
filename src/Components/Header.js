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
import { styles } from "../Libs/style";

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
          /*<Feather
            style={styles.centeredIcon}
            name="home"
            size={50}
            color="red"
          />*/
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
          ></Feather>
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

export default Header;
