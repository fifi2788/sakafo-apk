import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  TextInput,
  Button,
  Title,
  HelperText,
  DefaultTheme,
  Text,
} from "react-native-paper";

const Login = ({ navigation }) => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      tertiary: "#03dac6",
    },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const hasEmailError = () => !email.includes("@") && email.length > 0;

  const handleLogin = async () => {
    if (hasEmailError() || password.length === 0) {
      Alert.alert("Erreur", "Veuillez entrer des identifiants valides.");
      return;
    }

    setLoading(true);

    try {
      // console.log(
      //     {
      //     email,
      //     password,
      //   }
      // )
      const response = await axios.post(
        "https://symfony-back-kitchen-production.up.railway.app/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      const idToken = response.data?.idToken;
      const expiresIn = response.data?.expiresIn || 3600; // Défaut 1h si non fourni
      const expirationTime = Date.now() + parseInt(expiresIn, 10) * 1000;
      const userEmail = response.data?.user?.email;

      if (!idToken || !userEmail) {
        throw new Error("Données de connexion invalides!");
      }

      await AsyncStorage.setItem("token", idToken);
      await AsyncStorage.setItem("email", userEmail);
      await AsyncStorage.setItem("tokenExpiration", expirationTime.toString());

      Alert.alert("Succès", "Connexion réussie !");
      navigation.replace("Navigation"); // Redirige vers la page principale
    } catch (error) {
      console.error("Erreur de connexion:", error);
      Alert.alert("Erreur", "Échec de connexion. Vérifiez vos identifiants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Connexion</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        error={hasEmailError()}
      />
      <HelperText type="error" visible={hasEmailError()}>
        L'adresse e-mail n'est pas valide.
      </HelperText>

      <TextInput
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        right={
          <TextInput.Icon
            icon={secureText ? "eye" : "eye-off"}
            onPress={() => setSecureText(!secureText)}
          />
        }
        style={styles.input}
      />

      <Button
        mode="elevated"
        buttonColor={theme.colors.tertiary}
        textColor="white"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Se connecter
      </Button>

      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Pas de compte ? Inscrivez-vous ici</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  linkContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  linkText: {
    color: "#6200ee",
    textDecorationLine: "underline",
  },
});

export default Login;
