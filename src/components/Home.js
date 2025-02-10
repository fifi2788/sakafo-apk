import React from "react";
import { SafeAreaView, FlatList, TouchableOpacity, Image, View, StyleSheet, Dimensions } from "react-native";
import { Text, Card } from "react-native-paper";
// import { SliderBox } from "react-native-image-slider-box";

const { width: screenWidth } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    name: "Pizza Margherita",
    price: "25000 Ar",
    image: "https://images.radio-canada.ca/v1/alimentation/recette/1x1/pizza-margherita-ogleman.jpg",
  },
  {
    id: "2",
    name: "Spaghetti Carbonara",
    price: "12000 Ar",
    image: "https://www.starfrit.com/media/amasty/webp/contentmanager/content/crop/recipes/e1_r1_spaghetti_jpg.webp",
  },
  {
    id: "3",
    name: "Salade César",
    price: "8000 Ar",
    image: "https://assets.afcdn.com/recipe/20190704/94705_w1024h1024c1cx2336cy1552cxt0cyt0cxb4672cyb3104.webp",
  },
];

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", { item })}>
            <Card style={styles.card}>
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop:5
  },
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },
});

export default Home;
