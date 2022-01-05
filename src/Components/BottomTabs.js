import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { auth, fsGetAvilableMatches } from "../Libs/firebase"
import { AuthContext } from '../State/AuthContext';
import ChatScreen from '../Screens/ChatScreen';
import MatchedScreen from '../Screens/MatchedScreen';

const Tab = createBottomTabNavigator();

let matchNotif;



export default function MyTabs() {

    
    const { authData, authDispatcher } = React.useContext(AuthContext);
    const [availableMatches, setAvailableMatches] = React.useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            headerShown: false

            if (route.name === 'Home') {
              iconName = focused
                ? 'account-heart'
                : 'account-heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account-cog' : 'account-cog-outline';
            } else if (route.name === 'Chat'){
              iconName = focused ? 'message-text' : 'message-text-outline';
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f44336',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        
        <Tab.Screen name="Home" component={HomeScreen} options={{}} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Match" component={MatchedScreen} options={{display:'none'}} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export function UpdateSwipe(){
    matchNotif = matchNotif - 1
}
