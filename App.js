import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styles } from "./src/Libs/style";

// Custom screens
import HomeScreen from "./src/Screens/HomeScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";

//Styles for android statusbar fix
import { StyleSheet, StatusBar, Platform, bar } from "react-native";

// React hooks
import React, { useReducer, useEffect } from "react";

// Auth State
import { AuthContext } from "./src/State/AuthContext";
import AuthDispatcher from "./src/State/AuthDispatcher";
import MyTabs from "./src/Components/BottomTabs";

const Stack = createNativeStackNavigator();

export default function App() {

  console.log(Platform.OS, StatusBar.currentHeight)

  StatusBar.setHidden(true)

  const [authData, authDispatcher] = useReducer(
    AuthDispatcher.reducer,
    AuthDispatcher.initialState
  );

  return (
    <AuthContext.Provider value={{ authData, authDispatcher }} style={{ }}>
      {authData.user === null ? (<NavigationContainer >
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "Login"}}
              />
            </>
         
        </Stack.Navigator>
      </NavigationContainer>): <MyTabs/>}
      
    </AuthContext.Provider>
  );
}