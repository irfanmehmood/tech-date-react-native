import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { auth, fsGetAvilableMatches } from "../Libs/firebase"
import { AuthContext } from '../State/AuthContext';

const Tab = createBottomTabNavigator();

export default function MyTabs() {

    

    const { authData, authDispatcher } = React.useContext(AuthContext);
    const [availableMatches, setAvailableMatches] = React.useState(false);

    React.useEffect(() => {
        fsGetAvilableMatches(authData.user.uid).then((result) => {
        let matches = [];
        result.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            matches.push(doc.data());
        });
        //console.log(matches);
        setAvailableMatches(matches);
        });
    }, []);

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
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ /*tabBarBadge: matchesNotif*/ }} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}