import React, { useContext, useEffect, useState } from "react";
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
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../UserContext";

const Home = () => {
  const navigation = useNavigation();
  const { user, setUser } = useUser();

    // Fonction pour obtenir la salutation selon le moment de la journée
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        return "Bonjour"; // Matin
      } else if (hour < 18) {
        return "Bon après-midi"; // Après-midi
      } else {
        return "Bonsoir"; // Soir
      }
    };

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
            <Text style={styles.salutation}>{getGreeting()},</Text>
          </View>

          <View style={styles.header}>
            <View>
              <Text style={styles.name}>{user.prenom} {user.nom} !</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Ionicons name="notifications" size={24} color="#078ECB" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Section des Statistiques */}
          <View style={styles.statsContainer}>
            
          </View>

          {/* Transactions */}
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
              <Text style={styles.name}>Dernières Transactions</Text>
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
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop:10
  },
  header: {
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
  statsContainer: {
    padding: 15,
    backgroundColor: "#E9B94E",
    borderRadius: 10,
    margin: 15,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsText: {
    fontSize: 16,
  },
  financialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  financialButton: {
    padding: 20,
    backgroundColor: "#078ECB",
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  financialText: {
    fontSize: 18,
    color: "#fff",
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#078ECB",
    borderRadius: 10,
    margin: 15,
  },
  seeAllText: {
    fontSize: 16,
    color: "#fff",
  },
  transactionItem: {
    padding: 15,
    backgroundColor: "#E9B94E",
    borderRadius: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionText: {
    fontSize: 16,
    color: "#fff",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
