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
import { createDrawerNavigator } from '@react-navigation/drawer';
import MessageScreen from '../Screens/MessageScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

let matchNotif;



export default function MyTabs() {

    
    const { authData, authDispatcher } = React.useContext(AuthContext);
    const [availableMatches, setAvailableMatches] = React.useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator
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
        
        <Drawer.Screen name="Home" component={HomeScreen} options={{}} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Chat" component={ChatScreen} />
        <Drawer.Screen name="Match" options={{
          drawerItemStyle: { height: 0 }
        }} component={MatchedScreen}/>
        <Drawer.Screen name="Message" component={MessageScreen} options={{
          drawerItemStyle: { height: 0 }
        }} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export function UpdateSwipe(){
    matchNotif = matchNotif - 1
}
