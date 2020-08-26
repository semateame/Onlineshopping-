import React from "react";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import {
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
import AuthContext from "../../context";

export default Login = ({ navigation: { navigate } }) => {
  const [customer, setCustomer] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  

  const { login,user, setUser ,err} = React.useContext(AuthContext);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
      autoFocus="true"
        mode="flat"
        autoCorrect={false}
        autoCapitalize={false}
        placeholder="email"
        onChangeText={(email) => setCustomer({ ...customer, email: email })}
      ></TextInput>
      <TextInput
        mode="flat"
        autoCapitalize={false}
        autoCorrect={false}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) =>
          setCustomer({ ...customer, password: password })
        }
      ></TextInput>
      {err ? <Text>Invalid password or email</Text> : null}
      <TouchableOpacity style={styles.button} onPress={()=>login(customer)}>
        <Text style={styles.Btntxt}> log-in</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex:1,
    marginTop: 40,
    justifyContent: "center",
  },
  button: {
    height: 50,
    backgroundColor:"#1B93EC",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  Btntxt: {
    alignSelf: "center",
    fontSize: 18,
    
  },
});
