import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from "../user/SignInScreen";
import VerificationScreen from "../user/VerificationScreen";
import TodoList from "../user/TodoList";
import UserProfile from "../user/UserProfile";
import BottomTabBar from "./BottomTabBar";
import EditProfile from "../user/EditProfile";

// Create a Stack Navigator
const Stack = createStackNavigator();

// component for StackNavigator
const StackNavigator = () => {

    return (
        <>
            <Stack.Navigator initialRouteName={'SignInScreen'} screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="SignInScreen"
                    component={SignInScreen} />
                <Stack.Screen
                    name="VerificationScreen"
                    component={VerificationScreen} />
                <Stack.Screen
                    name="BottomTabBar"
                    component={BottomTabBar} />
                <Stack.Screen
                    name="TodoList"
                    component={TodoList} />
                <Stack.Screen
                    name="UserProfile"
                    component={UserProfile} />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile} />
            </Stack.Navigator>
        </>
    )
}

export default StackNavigator;
