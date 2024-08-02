
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, SafeAreaView } from 'react-native';
import config from '../config';
import { t } from 'i18next';
import CustomText from '../components/CustomText';
import TodoList from '../user/TodoList';
import UserProfile from '../user/UserProfile';
import { useTheme } from '@react-navigation/native';

// Create the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Bottom tab component
const BottomTabBar = () => {

    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.primary,
                tabBarStyle: {
                    height: config.normalize(60),
                    backgroundColor: colors.background,
                    paddingTop: config.normalize(5),
                    paddingHorizontal: config.normalize(5),
                    paddingBottom: config.normalize(5),
                    shadowColor: colors.primary,
                    borderTopLeftRadius: config.normalize(12),
                    borderTopRightRadius: config.normalize(12),
                    shadowRadius: config.normalize(6),
                    shadowOpacity: 0.1,
                    shadowOffset: {
                        height: config.normalize(-6),
                        width: 0
                    },
                    elevation: 3
                },
                tabBarLabelStyle: {
                    fontFamily: config.AppFonts.FiraCodeRegular,
                    fontSize: config.normalize(12),
                },
                tabBarShowLabel: false
            }} >
                <Tab.Screen
                    name={'TodoList'}
                    component={TodoList}
                    options={{
                        tabBarLabel: 'Todo List',
                        tabBarIcon: ({ color, size, focused }) => (
                            <>
                                <Image
                                    source={config.images.icons.list}
                                    style={{ height: size, width: size, tintColor: focused ? colors.primary : colors.card }}
                                    resizeMode='contain'
                                />
                                <CustomText title={t('TodoList')} Style={[styles.tabBarLabelText, { color: focused ? colors.primary : colors.card }]} />
                            </>
                        )
                    }}
                />
                <Tab.Screen
                    name={'UserProfile'}
                    component={UserProfile}
                    options={{
                        tabBarLabel: 'User Profile',
                        tabBarIcon: ({ color, size, focused }) => (
                            <>
                                <Image
                                    source={config.images.icons.user}
                                    style={{ height: size, width: size, tintColor: focused ? colors.primary : colors.card }}
                                    resizeMode='contain'
                                />
                                <CustomText title={t('MyProfile')} Style={[styles.tabBarLabelText, { color: focused ? colors.primary : colors.card }]} />
                            </>
                        )
                    }}
                />
            </Tab.Navigator>
            <SafeAreaView />
        </View>
    );
}

// Define styles for the component
const styles = StyleSheet.create({
    tabBarLabelText: {
        fontSize: config.normalize(13),
        fontFamily: config.AppFonts.FiraCodeRegular,
        marginTop: config.normalize(3),
    }
})

export default BottomTabBar;