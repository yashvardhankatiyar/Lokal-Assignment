import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import JobsScreen from './Screens/JobsScreen';
import JobDetailsScreen from './Screens/JobDetailsScreen';
import BookmarksScreen from './Screens/BookmarksScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function JobsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JobsList" component={JobsScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Jobs" component={JobsStack} options={{headerShown : false}} />
        <Tab.Screen name="Bookmarks" component={BookmarksScreen} 
          options={{headerShown : false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
