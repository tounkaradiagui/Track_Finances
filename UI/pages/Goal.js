import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Goal = () => {
  return (
    <View>
      <Text>Goal</Text>
      
      <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: 2,
              borderBlockColor: "#078ECB",
              marginTop: 15,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Objectifs Financiers
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              marginTop: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 20,
              // borderTopLeftRadius: 20,
              // borderTopRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="cash-refund"
                  size={24}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Fond d'urgence
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
                  Mardi 24/10/2023 20:58 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              $300
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              marginTop: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 20,
              // borderTopLeftRadius: 20,
              // borderBottomRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="house-damage" size={24} color="white" />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Nouvelle maison
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
                  Mardi 24/10/2023 20:30 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              $2500
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              marginTop: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 20,
              // borderTopLeftRadius: 20,
              // borderBottomRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="credit-card-refund"
                  size={24}
                  color="white"
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Investissement
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
                  Mardi 24/10/2023 20:30 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              $1800
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 15,
              padding: 10,
              marginTop: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#078ECB",
              marginHorizontal: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 name="laptop-code" size={24} color="white" />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Mac Laptop
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
                  Mardi 24/10/2023 20:30 min
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#E9B94E" }}
            >
              $800
            </Text>
          </View>
    </View>
  )
}

export default Goal

const styles = StyleSheet.create({})