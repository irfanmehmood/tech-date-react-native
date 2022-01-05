import { useNavigation } from "@react-navigation/native";
import React, { useContext, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../State/AuthContext";
import { auth, fsGetUser } from "../Libs/firebase";
import tailwind from "tailwind-rn";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { authData, authDispatcher } = useContext(AuthContext);
  const [email, setEmail] = useState("isaac.gonzalez@example.com");
  const [password, setPassword] = useState("pass1234");
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  // Try logging user in 
  const handleLoginUser = () => {
    setError(false);
    auth.signInWithEmailAndPassword(email, password).then( (userCredentials) => {
      //console.log(userCredentials.user);
      if (userCredentials.user.emailVerified === true) {
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
    <View style={tailwind("flex-1")}>
    <ImageBackground source={{ uri: "https://www.designbombs.com/wp-content/uploads/2016/10/code-sharing-websites-1280x720.jpg" }} style={tailwind("flex-1")}>
    
        
        <View >
          <TextInput
            style={[tailwind("absolute top-20  w-52 bg-white p-4 rounded-xl"), { marginHorizontal: "25%" }]}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <TextInput
            style={[tailwind("absolute top-40  w-52 bg-white p-4 rounded-xl"), { marginHorizontal: "25%" }]}
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
        <TouchableOpacity onPress={handleLoginUser} style={[tailwind("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"), { marginHorizontal: "25%" }]}>
          <Text style={tailwind('font-semibold text-center')} >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterUser} style={[tailwind("absolute bottom-20 w-52 bg-white p-4 rounded-2xl"), { marginHorizontal: "25%" }]}>
          <Text style={tailwind('font-semibold text-center')} >Register</Text>
        </TouchableOpacity>
        {error !== false && (
          <Text >{error}</Text>
        )}
    

    </ImageBackground>
    </View>
  );
};


export default LoginScreen;
