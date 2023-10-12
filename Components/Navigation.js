import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from '../Context/ThemeContext';

import Wanted from '../Pages/Wanted';
import Home from '../Pages/Home';
import AllItemsPage from '../Pages/AllItemsPage';
import Filters from '../Pages/Filters';
import ProductView from '../Pages/ProductView';
import More from '../Pages/More';
import SignIn from '../Pages/SignIn';
import Signup from '../Pages/Signup';
import MyProperties from '../Pages/MyProperties';
import Gallary from './ProductViewPageComponents/Gallary';
import InvestNowPage from '../Pages/InvestNowPage';
import ProjectView from '../Pages/ProjectView';
import AddProperty from '../Pages/AddProperty';
import ProfileSettings from '../Pages/ProfileSettings'
import AddFeatures from './NewPropertyPageComponents/AddFeatures';
import LikedPage from '../Pages/LikedPage';
import ContactUs from '../Pages/ContactUs';
import ImageView from './LoginedPageComponents/ImageView';
import SelectPage from './SelectPage';
import ChangeCoverScreen from './NewPropertyPageComponents/ChangeCoverScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabBar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: theme.background,
            ...Platform.select({
              android: {
                height: 70,
                paddingBottom: 0,
                paddingTop: 10
              }
            })
          },
          tabBarLabelStyle: {
            color: theme.text,
            ...Platform.select({
              android: {
                paddingBottom: 15
              }
            })
          },
          tabBarIcon: ({ color, size, focused }) => {
            // Determine the icon name based on the route name
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Wanted') {
              iconName = 'layers-search-outline';
            } else if (route.name === 'More') {
              iconName = 'dots-vertical';
            }

            // Set the icon color to theme.primary when focused, otherwise use the default color
            const iconColor = focused ? theme.primary : theme.text;

            return <MaterialCommunityIcons name={iconName} color={iconColor} size={size} />;
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Wanted"
          component={Wanted}
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            headerShown: false
          }}
        />
      </Tab.Navigator >
    </>
  );
}

const Navigation = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        headerShown: Platform.OS === "android" ? false : true,
        headerLeft: null,
        headerTitle: '',
        headerStyle: {
          shadowColor: 'transparent',
          backgroundColor: theme.background
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={BottomTabBar}
      />
      <Stack.Screen
        name="All Items Show Here"
        component={AllItemsPage}
      />

      <Stack.Screen
        name="Filters"
        component={Filters}
      />

      <Stack.Screen
        name="ProductView"
        component={ProductView}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileSettings}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
      />

      <Stack.Screen
        name="SignUp"
        component={Signup}
      />

      <Stack.Screen
        name="My Properties"
        component={MyProperties}
      />

      <Stack.Screen
        name="Gallary"
        component={Gallary}
        options={({ navigation, route }) => ({
          // headerShown: null
          headerStatusBarHeight: 0,
          headerStyle: {
            backgroundColor: 'black',
            shadowColor: 'black'
          }
        })}
      />

      <Stack.Screen
        name="InvestNow"
        component={InvestNowPage}
      />

      <Stack.Screen
        name="Project View"
        component={ProjectView}
      />

      <Stack.Screen
        name="New Property"
        component={AddProperty}
      />

      <Stack.Screen
        name='Select Page'
        component={SelectPage}
      />

      <Stack.Screen
        name='Add Features'
        component={AddFeatures}
      />

      <Stack.Screen
        name='Change Cover'
        component={ChangeCoverScreen}
      />

      <Stack.Screen
        name='Liked'
        component={LikedPage}
      />

      <Stack.Screen
        name='Contact us'
        component={ContactUs}
      />

      <Stack.Screen
        name='Image View'
        component={ImageView}
        options={({ navigation, route }) => ({
          // headerShown: null
          headerStatusBarHeight: 0,
          headerStyle: {
            backgroundColor: 'black',
            shadowColor: 'black'
          }
        })}
      />

    </Stack.Navigator>
  );
};

export default Navigation;