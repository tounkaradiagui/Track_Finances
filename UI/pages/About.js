import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Bienvenue dans notre application de gestion financière !
      </Text>
      <Text style={styles.description}>
        Cette application a été conçue pour vous aider à mieux gérer vos
        finances personnelles. Dans un monde où les dépenses et les revenus sont
        en constante évolution, il est essentiel de garder un œil sur votre
        situation financière. Que vous souhaitiez suivre vos dépenses
        quotidiennes, gérer votre budget ou épargner pour un projet futur, notre
        application est là pour vous accompagner.
      </Text>

      <Text style={styles.subtitle}>Importance de l'Application</Text>
      <Text style={styles.description}>
        Aujourd'hui, la gestion financière est plus importante que jamais. Avec
        l'augmentation des coûts de la vie et l'incertitude économique, savoir
        où va votre argent est essentiel pour prendre des décisions éclairées.
        Cette application vous permet de :
      </Text>
      <Text style={styles.bulletPoint}>- Suivre vos transactions</Text>
      <Text style={styles.bulletPoint}>- Gérer vos budgets</Text>
      <Text style={styles.bulletPoint}>- Catégoriser vos dépenses</Text>
      <Text style={styles.bulletPoint}>- Recevoir des notifications</Text>

      <Text style={styles.subtitle}>À propos de moi</Text>
      <Text style={styles.description}>
        Je m'appelle Diagui TOUNKARA, développeur web et mobile fullstack.
        Passionné de technologie et de finance, et j'ai créé cette application
        pour aider les gens à prendre le contrôle de leurs finances. Ayant
        moi-même rencontré des défis en matière de gestion financière, j'ai
        voulu développer un outil qui simplifie ce processus. Mon objectif est
        de fournir une solution accessible et efficace pour que chacun puisse
        gérer ses finances avec confiance.
      </Text>

      <Text style={styles.description}>
        Merci de faire partie de cette aventure ! J'espère que cette application
        vous sera utile et vous aidera à atteindre vos objectifs financiers.
      </Text>

      <Text style={styles.subtitle}>Contact</Text>
      <Text style={styles.description}>
        Si vous avez des questions, des commentaires ou des suggestions,
        n'hésitez pas à me contacter à tounkaradiagui@gmail.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
  },
  bulletPoint: {
    fontSize: 16,
    marginTop: 5,
    lineHeight: 24,
    marginLeft: 10,
  },
});

export default About;
