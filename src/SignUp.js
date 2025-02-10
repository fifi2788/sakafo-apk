import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  TextInput,
  Button,
  Title,
  HelperText,
  DefaultTheme,
  Text,
} from "react-native-paper";

const SignUp = ({navigation}) => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      tertiary: "#03dac6", // Ta couleur tertiaire
    },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const hasEmailError = () => !email.includes("@") && email.length > 0;

  const handleSignUp = () => {
    if (!hasEmailError() && password.length > 0) {
      console.log("Inscription réussie :", { email, password });
    } else {
      console.log("Veuillez remplir correctement les champs.");
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate("Login"); // Redirige vers la page d'inscription
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Inscription</Title>
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
        onPress={handleSignUp}
        style={styles.button}
      >
        S'inscrire
      </Button>

      <TouchableOpacity
        onPress={handleLoginNavigation}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>
          Déjà un compte ? Connectez-vous ici!
        </Text>
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

export default SignUp;
