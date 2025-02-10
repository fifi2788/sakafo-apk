import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Profils = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'email:", error);
      }
    };

    fetchEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace("Login"); // Redirige vers l'écran de connexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar.Icon size={50} icon="account" />
        <Text style={styles.email}>{email || "Utilisateur inconnu"}</Text>
      </View>
      <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
        Déconnexion
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  email: {
    marginLeft: 10,
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 20,
    width: "80%",
  },
});

export default Profils;
