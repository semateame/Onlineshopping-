import React, { useState, useEffect, useContext } from "react";
import { View, Text, AsyncStorage, StyleSheet, Image } from "react-native";
import AuthContext from "../context";
// import { SafeAreaView } from "react-native-safe-area-context";

import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native-gesture-handler";

export default Products = (props) => {
  console.log(props);
  const { user, setUser } = useContext(AuthContext);

  const { farmer } = props.route.params;
  useEffect(() => {
    setFarmerID()
  }, []);

  const setFarmerID=()=>{
    setUser({ ...user, farmId: farmer._id });
  }

  const Data = farmer.products.map((item) => {
    return { ...item, qauntity: 0 };
  });

  const clickHandler = (product) => {
    props.navigation.navigate("details", {
      farmdata: { id: farmer._id, product: product, femail: farmer.email },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={Data}
        keyExtractor={(item) => {
          return item._id;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{farmer.name}</Text>
                  {/* <Text style={styles.time}>{item.time}</Text> */}
                </View>
              </View>
              <TouchableOpacity onPress={() => clickHandler(item)}>
                <Image
                  style={styles.cardImage}
                  source={{
                    uri: `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/file/upload/${item.image}`,
                  }}
                />
              </TouchableOpacity>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.description}> ${item.price}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </View>
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
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: "#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  description: {
    fontSize: 15,
    color: "#888",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
});
