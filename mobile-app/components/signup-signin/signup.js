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
} from "react-native";
export default Signup = ({ navigation: { navigate } }) => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  // post request

  const submithandler = async () => {
    let result = await fetch("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    let res = await result.json();
    if (res.token) {
      navigate("login");
    }
    console.log(res);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        autoFocus="true"
        mode="flat"
        autoCorrect={false}
        autoCapitalize={false}
        placeholder="name"
        onChangeText={(name) => setCustomer({ ...customer, name: name })}
      ></TextInput>
      <TextInput
        mode="flat"
        autoCorrect={false}
        autoCapitalize={false}
        placeholder="email"
        onChangeText={(email) => setCustomer({ ...customer, email: email })}
      ></TextInput>
      <TextInput
        mode="flat"
        secureTextEntry="true"
        autoCorrect={false}
        autoCapitalize={false}
        placeholder="password"
        onChangeText={(password) =>
          setCustomer({ ...customer, password: password })
        }
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={submithandler}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex:1,
    marginTop: 40,
    justifyContent: "center",
    flexDirection: "column",
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
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center",
  },
  image: {
    height: 200,
    width: 400,
  },
});
