import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen(props) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const generateStars = (numberOfStars) => {
    let starsArrays = [];
    for (let i = 0; i < 5; i++) {
      if (i < numberOfStars) {
        starsArrays.push(
          <Entypo name="star" size={22} color="#DAA520" key={i} />
        );
      } else {
        starsArrays.push(<Entypo name="star" size={22} color="grey" key={i} />);
      }
    }
    return starsArrays;
  };

  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        // console.log(item);
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              props.navigation.navigate("Room", {
                id: item._id,
              });
            }}
          >
            <ImageBackground
              source={{ uri: item.photos[0].url }}
              style={styles.bgImg}
            >
              <View style={styles.priceView}>
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
            </ImageBackground>
            <View style={styles.view}>
              <View style={{ flex: 1 }}>
                <Text>{item.title}</Text>
                <View style={styles.row}>
                  {/* <Text>PPPP</Text> */}
                  {generateStars(item.ratingValue)}
                </View>
              </View>
              <Image
                source={{ uri: item.user.account.photo.url }}
                style={styles.userImage}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 30 },
  bgImg: {
    height: 250,
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "flex-end",
  },
  priceView: {
    backgroundColor: "black",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  priceText: {
    color: "white",
    fontSize: 20,
  },
  view: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    marginTop: 15,
  },
  row: { flexDirection: "row" },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
