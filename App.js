import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Custom screens
import HomeScreen from "./src/Screens/HomeScreen";
import LoginScreen from "./src/Screens/LoginScreen";

// React hooks
import React, { useReducer, useEffect } from "react";

// Auth State
import { AuthContext } from "./src/State/AuthContext";
import AuthDispatcher from "./src/State/AuthDispatcher";

// Firebase authentication import
import { auth } from "./firebase";

const Stack = createNativeStackNavigator();

export default function App() {

  const [authData, authDispatcher] = useReducer(
    AuthDispatcher.reducer,
    AuthDispatcher.initialState
  );

  return (
    <AuthContext.Provider value={{ authData, authDispatcher }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {authData.user === null ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "Login" }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Welcome", headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
