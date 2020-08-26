import React, { useState, useEffect } from "react";
import AuthContext from "../context";
import { Avatar, Button, Card } from "react-native-paper";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, AsyncStorage } from "react-native";

export default Cart = ({ navigation: { navigate } }) => {
  //const {farmerId} = params;
  const [cart, setCart] = useState({});
  const [items, setItem] = useState([]);
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    let token = await AsyncStorage.getItem("userToken")

    let resp = await fetch(
      `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/customers/${user.userInfo._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${token}`,
        },
      }
    );
    let result = await resp.json();
    setCart(result.cart);
    setItem(result.cart.item);
  };

  const Makeorder = async () => {
    let token = await AsyncStorage.getItem("userToken")

    console.log("farmer,id", user.farmId);
    const req = {
      user_id:user.userInfo._id,
      email: user.userInfo.email,
      totalprice: cart.totalprice,
      order: cart.item,
    };

    let res = await fetch(
      `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/customers/orders/${user.farmId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(req),
      }
    );
    let result = await res.json();
    emptyCart();
    navigate("review", { id: user.farmId });
    console.log(result);
  };

  const emptyCart = async () => {
    let token = await AsyncStorage.getItem("userToken")

    fetch(`http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/customers/${user.userInfo._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {items.map((item) => {
          return (
            <Card>
              <Avatar.Image
                size={70}
                source={{
                  uri: `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/file/upload/${item.image}`,
                }}
              />
              <Card.Content>
                <Text>product name : {item.name}</Text>
                <Text>price : ${item.price} </Text>
                <Text>qtty: {item.qauntity}</Text>
              </Card.Content>

              <Card.Actions></Card.Actions>
            </Card>
          );
        })}
        <Text style={styles.txt}>subtotal:${cart.totalprice}</Text>
        <Button onPress={Makeorder} style={styles.btn2}>
          order now
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn2: {
    marginLeft: 30,
    marginTop: 5,
    width: 300,
    borderRadius: 2,
    backgroundColor: "#05705D",
    height: 40,
  },
  txt: {
    marginTop: 10,
    marginLeft: 80,
  },
});
