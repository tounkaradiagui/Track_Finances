import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { UserType } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { useUser } from "../UserContext";

const Home = () => {
  const navigation = useNavigation();
  const {user, setUser} = useUser();

  const fetchUserInfo = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUser(JSON.parse(storedUserInfo));
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur :",
        error
      );
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#078ECB" style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.headerTop}>
            <Text style={styles.salutation}>Bonjour</Text>
          </View>

          <View style={styles.header}>
            <View>
              <Text style={styles.name}>{user.prenom} {user.nom}</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Ionicons name="notifications" size={24} color="#078ECB" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            marginTop: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 28,
              backgroundColor: "#078ECB",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                Revenu
              </Text>
              <MaterialIcons
                name="account-balance-wallet"
                size={30}
                color="white"
                style={{ marginLeft: 15 }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff",
                marginTop: 5,
              }}
            >
              25000 F CFA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 30,
              backgroundColor: "#078ECB",
              borderBottomLeftRadius: 20,
              paddingHorizontal: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
              >
                Dépenses
              </Text>
              <FontAwesome5
                name="money-check-alt"
                size={24}
                color="white"
                style={{ marginLeft: 15 }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff",
                marginTop: 5,
              }}
            >
              34000 F CFA
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 15,
              padding: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#E9B94E",
              marginHorizontal: 15,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View>
              <Text style={styles.name}>Transactions</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("Transaction")}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
                >
                  All
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 15,
              // borderBottomLeftRadius: 20,
              // borderBottomRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Entypo name="shopping-cart" size={24} color="white" />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Achats
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                {/* <Text style={{ fontSize: 10, fontWeight: "bold", color: "white", marginLeft:5 }}>Date</Text> */}
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Vendredi 18/10/2023 15:20 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              {" "}
              - 30.000 F CFA{" "}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 15,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome name="wifi" size={24} color="white" />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Abonnement
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                {/* <Text style={{ fontSize: 10, fontWeight: "bold", color: "white", marginLeft:5 }}>Date : </Text> */}
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Lundi 12/10/2023 09:30 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              {" "}
              - 200.000 F CFA{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerTop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },

  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  salutation: {
    fontSize: 20,
    fontWeight: "bold",
  },

  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
