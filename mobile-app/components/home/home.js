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
  ImageBackground,
} from "react-native";

export default Home = ({ navigation: { navigate } }) => {
  const clickHandler = () => {
    navigate("signup");
  };
  const pressHandler = () => {
    navigate("login");
  };
  return (
    <ImageBackground
    source={{uri: 'http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/file/upload/Homestead-2.jpeg'}} 
    style={styles.bgImage}
    >
    <View style={styles.container}>
    
      <TouchableOpacity style={styles.btn} onPress={clickHandler}>
        <Text style={styles.btnTxt}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn2} onPress={pressHandler}>
        <Text style={styles.btnTxt}>Log-In</Text>
      </TouchableOpacity>
     
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  btn: {
    height: 50,
    backgroundColor: "#1B93EC",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center",
    marginRight: 30,
    marginLeft: 5,
    marginBottom: 60,
  },
  btnTxt: {
    alignSelf: "center",
    fontSize: 18,
  },
  btn2: {
    height: 50,
    backgroundColor:"#1B93EC",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    marginTop: 5,
  
    alignSelf: "stretch",
    justifyContent: "center",
    marginRight: 30,
    marginLeft: 5,
    marginBottom:70,
  },


  bgImage:{
    height:600,
    width:400
  }
});
