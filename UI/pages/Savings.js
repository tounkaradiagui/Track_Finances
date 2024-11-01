import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Savings = () => {



    const fetchGoals = async () => {
        setLoading(true);
        try {
          const token = await AsyncStorage.getItem("authToken");
          const userId = await AsyncStorage.getItem("userId");
          const response = await fetch(`${API_URL.fetchGoals}/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
        //   console.log("API Response:", data);
    
          // Trier les objectifs par date de création (plus récent en premier)
          const sortedGoals = Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)): [];
          setGoals(sortedGoals);
          // setGoals(Array.isArray(data) ? data : []);
        } catch (error) {
          console.log("Fetch goals error:", error);
        } finally {
          setLoading(false);
        }
    };
  return (
    <View>
      <Text>Savings</Text>
    </View>
  )
}


export default Savings

const styles = StyleSheet.create({})