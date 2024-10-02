import { View, Text, Image, Platform } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import Home from '../screen/Home';
import Budget from '../pages/Budget';
import Transaction from '../pages/Transaction';
import Notification from '../pages/Notification';
import Profile from '../pages/Profile';
import { COLORS} from './../constants/theme';
import {icons } from '../constants'
import Categories from '../pages/Categories';

const Tab = createBottomTabNavigator();


const BottomTabs = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: "absolute",
              height: Platform.OS === "ios" ? 90 : 60,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: COLORS.white,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={focused ? icons.home : icons.homeOutline}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused ? COLORS.primary : COLORS.black
                    }}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Budget"
            component={Budget}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={focused ? icons.budget : icons.budgetOutline}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused ? COLORS.primary : COLORS.black
                    }}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Categories"
            component={Categories}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.primary,
                    height: Platform.OS === "ios" ? 70 : 60,
                    width: Platform.OS === "ios" ? 70 : 60,
                    top:Platform.OS === "ios" ? -20 : -30,
                    borderRadius: Platform.OS === "ios" ? 35 : 30,
                    borderColor: COLORS.white,
                    borderWidth:2
                   }}
                   >
                    {/* <Ionicons name="search-outline" size={24} color={COLORS.white} /> */}
                    {/* <FontAwesome6 name="money-check-dollar" size={24} color=:{COLORS.white} /> */}
                    <FontAwesome name="plus-square" size={24} color={COLORS.white} />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Transaction"
            component={Transaction}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={focused ? icons.transaction : icons.transactionOutline}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused ? COLORS.primary : COLORS.black
                    }}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Profil"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={focused ? icons.user : icons.userOutline}
                    resizeMode="contain"
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused ? COLORS.primary : COLORS.black
                    }}
                  />
                );
              },
            }}
          />
          
        </Tab.Navigator>
      );
}

export default BottomTabs