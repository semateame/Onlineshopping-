import React, { useState, useContext } from "react";
import { View, StyleSheet, Text ,TouchableOpacity, AsyncStorage} from "react-native";
import { RadioButton, Button, Divider } from "react-native-paper";
import AuthContext from "../context";

export default Review = () => {
  const {user} = useContext(AuthContext)
  const {farmId}= user
  const [value, setValue] = useState("");

  const addreview = async () => {
    let token = await AsyncStorage.getItem("userToken")

    const req = { id: farmId, comment: value };
    await fetch(`http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/customers`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,

       },
      body: JSON.stringify(req),
    });
  };

  return (
    <View>
      <Text style={styles.txt}>
        Your rating are important, tell us how we doing!!
      </Text>
      <Divider />
      <RadioButton.Group
        style={styles.radio}
        onValueChange={(value) => setValue(value)}
        value={value}
      >
        <RadioButton.Item label="Excellent" value="excellent" />
        <Divider />
        <RadioButton.Item label="Good" value="good" />
        <Divider />

        <RadioButton.Item label="Bad" value="bad" />
        <Divider />
      </RadioButton.Group>
      <TouchableOpacity onPress={addreview} style={styles.btn}>
        <Text style={styles.btntxt}>add comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    marginTop: 20,
  },
  txt: {
    marginLeft: 20,
    fontSize: 15,
    marginTop: 20,
  },
  btn: {
    marginLeft: 30,
    marginRight: 30,
    height: 50,
    backgroundColor: "#F0813E",
    marginTop: 10,
    borderRadius: 5,
  },
  btntxt: {
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
});
