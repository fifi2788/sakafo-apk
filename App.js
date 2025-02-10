import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Login from "./src/Login";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./src/Navigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Connexion", headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{ title: "Inscription", headerShown: false }}
          />
          <Stack.Screen
            name="Navigation"
            component={Navigation}
            options={{ title: "Navigation", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
