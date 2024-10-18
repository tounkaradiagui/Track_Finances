import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import Carousel from 'react-native-snap-carousel';

const { width: windowWidth } = Dimensions.get("window");

const WelcomeScreen = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      title: "Bienvenue",
      description:
        "Découvrez notre application et comment elle peut vous aider à gérer vos finances.",
      image: require("../assets/images/balance.png"), // Remplacez par le chemin de votre image
    },
    {
      title: "Suivi des Dépenses",
      description: "Gardez une trace de vos dépenses et économisez davantage.",
      image: require("../assets/images/banking.png"), // Remplacez par le chemin de votre image
    },
    {
      title: "Objectifs Financiers",
      description: "Définissez et suivez vos objectifs financiers facilement.",
      image: require("../assets/images/balance.png"), // Remplacez par le chemin de votre image
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#078ECB" style="light" />
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        ref={carouselRef}
        onSnapToItem={index => setActiveIndex(index)}
        autoplay
        loop
      />
      <Text>WelcomeScreen</Text>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Naviguer vers la page de connexion")}
      >
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    width: windowWidth,
    alignItems: "center",
  },
  image: {
    width: windowWidth,
    height: 300,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: "row",
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E9B94E",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#078ECB",
  },
  button: {
    backgroundColor: "#078ECB",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});