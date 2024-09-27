import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import IMAGES from './../assets/index';
import { StatusBar } from 'expo-status-bar';

const Welcome = () => {

  const navigation = useNavigation();

  const _carousel = useRef();
  const [activeDotIndex, setActiveDotIndex] = useState(0);

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
        "Créez et  suivez votre budget personnel pour atteindre vos objectifs financiers. Notre application vous permet de définir des limites budgétaires, de suivre vos dépenses par rapport à celles-ci et de recevoir des alertes pour vous aider à rester sur la bonne voie",
      image: IMAGES.BANKING,
    },
  ];

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={item.image}
          style={{
            height: Dimensions.get("window").width,
            width: Dimensions.get("window").width,
          }}
        />
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ fontSize: 15, marginTop: 10 }}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#078ECB" color="#fff"/>
      <View style={{alignItems: "flex-end", marginTop:40, marginEnd:10}}>
        <TouchableOpacity
          onPress={()=>{navigation.navigate('Login')}}
        >
          <Text
            style={{
              fontSize:15,
              fontWeight:'bold',
              color:"#078ECB"
            }}
          >Sauter</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        
        
      </View>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent:"space-between",
  },
  slide: {}
})