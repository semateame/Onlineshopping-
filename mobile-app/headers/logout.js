import * as React from "react";
import { Button, View, AsyncStorage } from "react-native";
import AuthContext from "../context";

const Logout = () => {
  const { user, setUser } = React.useContext(AuthContext);

  

  return (
    <View>
      <Button
        onPress={async () => {
          try {
            console.log("====>", user);
            await AsyncStorage.removeItem("userToken");
            setUser({ userToken: null ,userInfo:{},farmId:null});
            //   navigation.navigate("login");
          } catch (e) {
            console.log(e);
          }
        }}
        title="logout"
        color="black"
      />
    </View>
  );
};

export default Logout;
