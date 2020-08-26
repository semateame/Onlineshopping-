import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Signup from "./components/signup-signin/signup";
import Login from "./components/signup-signin/login";
import Home from "./components/home/home";
import Farmers from "./shop/list-farmers";
import Products from "./shop/products";
import Productdetails from "./shop/productdetails";
import Logout from "./headers/logout";
import Cart from "./shop/cart";
import Review from "./shop/review";
import Orderhistory from "./shop/orderhistory"
import { Icon } from 'react-native-elements'
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator>
      <Stack.Screen 
      name="products" 
      component={Products} 
      options={{ tabBarIcon:()=><Icon type="material-community" name="menu" size={30}/>} }
      />
      <Stack.Screen
      name="orders"
      component={Orderhistory}
      options={{ tabBarIcon:()=><Icon type="material-community" name="clipboard-text" size={30}/>} }

      />
      <Tab.Screen
        name="cart"
        component={Cart}
       options={{ tabBarIcon:()=><Icon type="material-community" name="cart" size={30}/>}}
      />
    </Tab.Navigator>
  );
};



import Authcontext from "./context";

export default function App() {
  const [err, setErr] = useState(false);
  const [user, setUser] = useState({
    userInfo: {},
    userToken: null,
    farmId:null
  });

  const userContext = React.useMemo(
    () => ({
      login: async (customer) => {
        let result = await fetch("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(customer),
        });

        let res = await result.json();

        if (!res.token) {
          setErr({ err: true });
        } else {
          setErr({ err: false });
          await AsyncStorage.setItem("userToken", res.token);
          let token = await AsyncStorage.getItem("userToken");
 
          setUser({ ...user, userInfo: res.customer, userToken: token });
        }
      },
    }),
    []
  );

  useEffect(async () => {
    let token = await AsyncStorage.getItem("userToken");
    setUser({ ...user, userToken: token });
  }, []);

  return (
    <Authcontext.Provider
      value={{ ...userContext, user, setUser, err, setErr,}}
    >
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#2C9DF0",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          {user.userToken === null ? (
            <>
              <Stack.Screen name="Neighborhood-Market" component={Home} />

              <Stack.Screen
                name="login"
                component={Login}
                options={{ title: "Log-in" }}
              />

              <Stack.Screen
                name="signup"
                component={Signup}
                options={{ title: "Sign_Up" }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="farmers"
                component={Farmers}
                options={{ title: "Farmers", headerRight: () => <Logout /> }}
              />

              <Stack.Screen
                name="tab"
                component={TabNav}
                options={{ title: "Products", headerRight: () => <Logout /> }}
              />

              <Stack.Screen
                name="details"
                component={Productdetails}
                options={{ title: "details", headerRight: () => <Logout /> }}
              />
              <Stack.Screen
                name="cart"
                component={Cart}
                options={{ title: "Cart", headerRight: () => <Logout /> }}
              />
              <Stack.Screen
                name="review"
                component={Review}
                options={{ title: "Review", headerRight: () => <Logout /> }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Authcontext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
