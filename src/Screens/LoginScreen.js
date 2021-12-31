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
import { auth, fsGetUser } from '../../firebase';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { authData, authDispatcher } = useContext(AuthContext);
  const [email, setEmail] = useState("ifreezeuchannel@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(false);

  // Try logging user in 
  const handleLoginUser = () => {
    setError(false);
    auth.signInWithEmailAndPassword(email, password).then( (userCredentials) => {
      //console.log(userCredentials.user);
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

        // Store Firebase user in our context
        authDispatcher({
          type: "userLoggedIn",
          payload: userCredentials.user,
        });

        // Now lets get user profile. Get our user document from firebase/firestore by userid
        fsGetUser(userCredentials.user.uid).then((userProfile) => {

          //console.log(userProfile);

          // Store Firestore user profile in our context
          authDispatcher({
            type: "setProfile",
            payload: userProfile,
          });
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
    <View style={styles.container}>
        <View style={styles.inputContainer}>
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
            secureTextEntry={true}
            password={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLoginUser}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegisterUser}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        {error !== false && (
          <Text style={styles.error}>{error}</Text>
        )}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
        justifyContent:'center',
        alignItems: 'center',
  },
  input: {
    backgroundColor:"white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        margin: 10,
  },
  inputContainer:{
    width: "80%"
  },
  button: {
    backgroundColor: '#ba000d',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  error: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.15,
    color: "red",
    margin: 42,
  },
});

export default LoginScreen;
