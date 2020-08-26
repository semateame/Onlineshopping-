import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  AsyncStorage,
} from "react-native";

import AuthContext from "../context";

import Icon from "react-native-vector-icons/FontAwesome";
export default ListofFarmers = ({ navigation }) => {
  const [farmers, setFarmer] = useState([]);
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    getfarmers();
  }, []);

  const getfarmers = async () => {
    let token = await AsyncStorage.getItem("userToken") ;
   console.log(token)
    let res = await fetch("http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/customers/farmers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'authorization':`Bearer ${token}`
      },
    });
    let Farmers = await res.json();
    setFarmer(Farmers);
  }

  const pressHandler = (farmer) => {
    navigation.navigate("tab", { screen: "products", params: { farmer } });
  };

  return (
    

    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={farmers}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => {
          return item._id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                pressHandler(item);
              }}
            >
              <View style={styles.cardHeader}>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/file/upload/${item.image}`,
                  }}
                />
              </View>
              <Image
                style={styles.userImage}
                source={{
                  uri: `http://neighborhoodonlinemarket-env.eba-mkbgjfpb.us-east-1.elasticbeanstalk.com/file/upload/${item.image}`,
                }}
              />
              <View style={styles.cardFooter}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.position}>{item.email}</Text>
                  <View style={styles.star}>
                    {[1, 2, 3, 4, 5].map((i) => {
                      return (
                        <Icon
                          name="star"
                          size={25}
                          color={i <= item.rate ? "#FFD64C" : "#CCCCCC"}
                        />
                      );
                    })}
                  </View>
                 
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: "46%",
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderColor: "#DCDCDC",
    borderWidth: 3,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#008080",
    fontWeight: "bold",
  },
  position: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  icon: {
    // height: 40,
    // width: 80,
  },
});
