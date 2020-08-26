import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Alert,
  AsyncStorage,
  TextInput,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Authcontext from "../context";

export default Orders = () => {
  const { user } = React.useContext(Authcontext);
  const [OrderHistory, setOrderHistory] = useState([]);
  const [arr, setarr] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let result = await fetch(
      `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/customers/orders/${user.farmId}/${user.userInfo._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    let response = await result.json();
    setOrderHistory(response);
    setarr(response);
    console.log(response);
  };
  const filterBystatus = (e) => {
    if (e == "") {
      setOrderHistory(arr);
    } else {
      let filterd = OrderHistory.filter((item) => {
        return item.status.includes(e) == true;
      });
      setOrderHistory(filterd);
    }
  };
  const getCompletedIcon = (item) => {
    if (item.status == "complete") {
      return "https://img.icons8.com/flat_round/64/000000/checkmark.png";
    }
  };

  const getDescriptionStyle = (item) => {
    if (item.status == "complete") {
      return {
        textDecorationLine: "line-through",
        fontStyle: "italic",
        color: "#808080",
      };
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        autoCapitalize="none"
        placeholder="Search"
        onChangeText={(status) => filterBystatus(status)}
        style={styles.search}
      />
      <FlatList
        style={styles.tasks}
        columnWrapperStyle={styles.listContainer}
        data={OrderHistory}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.card, { borderColor: item.color }]}
            >
              <Image
                style={styles.image}
                source={{ uri: getCompletedIcon(item) }}
              />
              <View style={styles.cardContent}>
                <Text style={styles.description}>order#:{item.order_id}</Text>
                <Text style={[styles.description, getDescriptionStyle(item)]}>
                  status:{item.status}
                </Text>
                <Text style={styles.description}>
                  totalprice:{item.totalprice}
                </Text>

                <Text style={styles.date}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#eeeeee",
  },
  tasks: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 25,
    height: 25,
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexBasis: "46%",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    borderLeftWidth: 6,
  },

  description: {
    fontSize: 18,
    flex: 1,
    color: "#008080",
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: "#696969",
    marginTop: 5,
  },
  search:{
      marginTop:0,
      marginLeft:9,
      marginRight:9,
      shadowOpacity:0

  }
});
