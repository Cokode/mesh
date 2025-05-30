import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/Register.js';
import LoginScreen from './src/screens/LoginScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import ReportScreen from './src/screens/ReportScreen.js';
import RegisterStashSrn from './src/screens/RegisterStashSrn.js';
import StashScreen from './src/screens/StashScreen.js';
import BoardScreen from './src/screens/BoardScreen.js';
import Stashview from './src/screens/StashView.js';
import QRCodeGenerator from './src/components/qrCode.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox } from 'react-native';


LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // Example warning to ignore
  'Warning: Each child in a list should have a unique "key" prop',
  'Unhandled promise rejection'
]);
console.disableYellowBox = true;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StashScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          position: 'absolute',
        },
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true, 
          headerBackVisible: false, 
        }}
      />
      <Stack.Screen
        name="View"
        component={Stashview}
        options={{
          title: "Barcode verification",
          headerShown: true,              
          headerBackVisible: true,         
          gestureEnabled: true,            
          headerBackTitleVisible: true,  
        }}
      />
    </Stack.Navigator>
  );
}


function MainScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          // position: 'absolute',
          borderTopWidth: 0, // Optional: to remove the top border
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        // headerTintColor: "#fff"
      }}
    >
      <Tab.Screen
        name="Home"
        component={StashScreens}
        // headerTintColor= "black"
        options={{
          tabBarIcon: ({focused, color, size}) => 
            {
              let iconName = "home-outline";
              color = 'black';
              size = 25
              return  (<Ionicons name={focused ? 'home-sharp' :iconName } size={size} color={color} />)
            },
          headerShown: false,
          // tabBarBadge: 3,
          tabBarStyle: {
            // backgroundColor: '#25292e' // remove or customize later 
          },
        }
      }
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}

        options={{
          tabBarIcon: ({focused, color, size}) => 
            {
              let iconName = "report-gmailerrorred";
              color = 'black';
              size = 26
              return  (<MaterialIcons name={focused ? 'report' :iconName } size={size} color={color} />)
            },
          headerShown: true,
          // tabBarBadge: 3
          // headerBackTitleVisible: true
        }}

      />
      <Tab.Screen
        name="Register"
        component={RegisterStashSrn }
        options={{
          tabBarIcon: ({focused, color, size}) => 
            {
              let iconName = "content-save-move-outline";
              color = 'black';
              size = 26
              return  (<MaterialCommunityIcons name={focused ? 'content-save-move' :iconName } size={size} color={color} />)
            },
          headerShown: true,
          tabBarBadge: null
        }}
      />
      
      <Tab.Screen
        name="My Stash"
        component={StashScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => 
            {
              let iconName = "list-circle";
              color = 'black';
              size = 26
              return  (<Ionicons name={focused ? iconName : 'list-circle-outline' } size={size} color={color} />)
            },
          headerShown: true,
          // tabBarBadge: 1
        }}
      />
      <Tab.Screen
        name="Board"
        component={BoardScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => 
            {
              color = 'black';
              size = 28
              return  (<Ionicons name={focused ? 'information-circle' : 'information-circle-outline' } size={size} color={color} />)
            },
          headerShown: true,
          tabBarBadge: null,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup Screen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainScreens" component={MainScreens} options={{ headerShown: false,  }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  