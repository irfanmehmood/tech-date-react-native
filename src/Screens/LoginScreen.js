import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../State/AuthContext";
import { auth } from '../../firebase';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { authData, authDispatcher } = useContext(AuthContext);
  const [email, setEmail] = useState("irfmehmood@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(false);

  // Try logging user in 
  const handleLoginUser = () => {
    setError(false);
    auth.signInWithEmailAndPassword(email, password).then( (userCredentials) => {
      //console.log(userCredentials.user.emailVerified);
      if (userCredentials.user.emailVerified === false) {
        // User email is not verified
        setError('You need to verify your email');
      } else {
        /* Email is verified 
         * 1. Log user in also save user from firebase to state/context auth user 
         * 2. This approach works in enabling StackNavigator screens 
         * 3. firebase auth.currentUser was not working with StackNavigator screens, so had to use no2 approach
         * 4. https://coderedirect.com/questions/475464/react-navigation-in-react-native-with-conditional-stack-and-authentication
         * */
        authDispatcher({
          type: "userLoggedIn",
          payload: userCredentials.user,
        });
        //console.log(auth.currentUser);
      }
    }).catch( (error) => {
       console.log(error.message);
       setError(error.message);
    });
  };

  // Try registering user in 
  const handleRegisterUser = () => {
    setError(false);
    auth.createUserWithEmailAndPassword(email, password).then( (response) => {
      // Send confirmation/verify email address.
      response.user.sendEmailVerification().then(function(){
        setError("Email verification has been sent to the email provided.");
      });
      console.log(response);
    }).catch( (error) => {
       console.log(error.message);
       setError(error.message);
    });
  };

  return (
    <View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          placeholder="Password"
          keyboardType="numeric"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLoginUser}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegisterUser}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        {error !== false && (
          <Text style={styles.error}>{error}</Text>
        )}
      </SafeAreaView>
    </View>
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
    color: "white",
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

export default LoginScreen;
