import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import NumericInput from "react-native-numeric-input";
import AuthContext from "../context";

export default ProductDetils = ({
  route: { params },
  navigation: { navigate },
}) => {
  const { user, setUser } = React.useContext(AuthContext);
  const [inValid, setinValid] = useState(false);
  const { id, product, femail } = params.farmdata;
  const [qty, setqty] = useState(0);
  const [data, setdata] = useState({});

  const setproduct = (val) => {
    setqty(val);
    console.log(user);
  };

  useEffect(() => {
    let Data = { ...product, farmerId: id };
    Data.qauntity = Data.qauntity + qty;
    setdata(Data);
  }, [qty]);

  const makeOrder = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let order = { ...data };
    totalprice = order.price * order.qauntity;
    let req = {
      user_id: user.userInfo._id,
      email: user.userInfo.email,
      order: [{ ...order }],
      totalprice: totalprice,
    };
    let res = await fetch(`http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/customers/orders/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    });
    let result = await res.json();

    if (!result.msg) {
      navigate("review", { id: id });
    }
  };

  const addtoCart = async () => {
    let token = await AsyncStorage.getItem("userToken");

    cusId = user.userInfo._id;
    console.log("check", cusId);
    let req = await fetch(`http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/customers/${cusId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    let result = await req.json();
    console.log("cart===>", result);
    if (result.msg) {
      console.log(result.msg);
      setinValid(true);
    } else {
      navigate("cart", { farmerId: id });
    }
  };

  return (
    <View>
      {console.log(data)}
      <Card>
        <Card.Title title={product.name} />
        <Card.Content>
          <Title>
            {"$"} {product.price}
          </Title>
          <Paragraph>{product.description}</Paragraph>
        </Card.Content>
        <Card.Cover
          source={{
            uri: `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/file/upload/${product.image}`,
          }}
        />
        <Card.Actions>
          {/*
        <Button> Add to cart</Button> <Button> order now </Button> */}
        </Card.Actions>
      </Card>
      <NumericInput
        style={styles.inpt}
        minValue={0}
        onChange={(value) => setproduct(value)}
      ></NumericInput>
      <Button
        icon="cart"
        onPress={addtoCart}
        style={styles.btn}
        mode="contained"
      >
        Add to cart
      </Button>
      {inValid == true ? (
        <Text style={styles.txxt}>
          shoping allowed from one farmer at time !!
        </Text>
      ) : null}

      <Button onPress={makeOrder} style={styles.btn2} mode="contained">
        order now
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginLeft: 80,
    marginTop: 60,
    width: 200,
    borderRadius: 2,
    backgroundColor: "#05705D",
  },
  btn2: {
    marginLeft: 80,
    marginTop: 20,
    width: 200,
    borderRadius: 2,
    backgroundColor: "#05705D",
  },
  inpt: {
    marginTop: 40,
  },
  txxt: {
    color: "#FF0000",
    marginLeft: 80,
  },
});
