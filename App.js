import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './routes/Home';
import OpenJobs from './routes/jobs';
import Profile from './routes/profile';
import LoginPage from './routes/login';
import DisplayJob from './routes/displayJob';
import AllBooking from './routes/allBooking';
import Posts from './routes/posts';
import Camera from './routes/camera';
import axios from "axios"
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'orange', // Set the background color of the header
          },
          headerTintColor: '#fff', // Set the text color of the header
          headerTitleStyle: {
            fontWeight: 'bold', // Set the font weight of the header title
          },
        }}
      >
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OpenJobs"
          component={OpenJobs}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="DisplayJobs"
          component={DisplayJob}
        />
        <Stack.Screen
          name="AllBookings"
          component={AllBooking}
        />
        <Stack.Screen
          name="Posts"
          component={Posts}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



