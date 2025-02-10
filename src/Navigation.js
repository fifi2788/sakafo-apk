import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Home from "./components/Home";
import Commandes from "./components/Commandes";
import Notification from "./components/Notification";
import Profils from "./components/Profils";

const Navigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "accueil",
      title: "Accueil",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "commandes",
      title: "Commandes",
      focusedIcon: "food",
      unfocusedIcon: "food-outline",
    },
    {
      key: "profil",
      title: "Profils",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    accueil: Home,
    commandes: Commandes,
    notifications: Notification,
    profil: Profils,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Navigation;
