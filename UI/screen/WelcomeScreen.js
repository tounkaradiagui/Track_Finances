import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Swiper from "react-native-swiper";
import IMAGES from "../assets/index";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width: windowWidth } = Dimensions.get("window");

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null); // Référence pour le swiper

  const data = [
    {
      id: 2,
      title: "Le solde de votre compte",
      description:
        "Gardez une vue d'ensemble de vos finances en un coup d'oeil. Suivez et gérer facilement le solde de votre compte personnel et restez informé de vos disponibilités financières en temps réel.",
      image: IMAGES.BALANCE,
    },
    {
      id: 3,
      title: "Mes recettes",
      description:
        "Suivez vos sources de revenus et maximisez vos gains grâce à notre application. Identifiez et catégorisez vos différentes sources de revenus et obtenez une vision claire de vos rentrées d'argent.",
      image: IMAGES.CHECKING,
    },
    {
      id: 2,
      title: "Mes dépenses",
      description:
        "Contrôlez vos dépenses et améliorer votre gestion financière. Enregistrez et classez facilement vos dépenses dans différentes catégories et visualisez vos habitudes de dépenses pour mieux comprendre où va votre argent.",
      image: IMAGES.LOADING,
    },
    {
      id: 1,
      title: "Mon budget",
      description:
        "Créez et suivez votre budget personnel pour atteindre vos objectifs financiers. Notre application vous permet de définir des limites budgétaires, de suivre vos dépenses par rapport à celles-ci et de recevoir des alertes pour vous aider à rester sur la bonne voie",
      image: IMAGES.BANKING,
    },
  ];

  const goToNextSlide = () => {
    swiperRef.current.scrollBy(1); // Navigue vers le slide suivant
  };

  const goToPreviousSlide = () => {
    swiperRef.current.scrollBy(-1); // Navigue vers le slide précédent
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#078ECB" color="#fff" />
      <View style={{ alignItems: "flex-end", marginTop: 40, marginEnd: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#078ECB" }}>
            Sauter
          </Text>
        </TouchableOpacity>
      </View>

      <Swiper
        ref={swiperRef}
        autoplay
        autoplayTimeout={5}
        showsPagination={true}
        paginationStyle={styles.paginationStyle}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        {data.map((item, index) => (
          <View style={styles.slide} key={index}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </Swiper>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToPreviousSlide}>
          <View style={styles.button}>
            <FontAwesome name="arrow-left" size={18} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextSlide}>
          <View style={styles.button}>
            <FontAwesome name="arrow-right" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: windowWidth,
    height: 300,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },
  paginationStyle: {
    bottom: 10,
  },
  dot: {
    backgroundColor: "#E9B94E",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#078ECB",
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginHorizontal: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: "#078ECB",
    justifyContent: "center",
    alignItems: "center",
  },
});
