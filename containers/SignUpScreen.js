import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  text,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";
import { useState } from "react";

import Constants from "expo-constants";

export default function SignUp({ setToken }) {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [description, setDescription] = useState();

  const [error, setError] = useState();

  const createAccount = async () => {
    // console.log(email, username, password, confirmPassword, description);
    try {
      if (email && username && password && confirmPassword && description) {
        setError("");
        if (password === confirmPassword) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              password: password,
              username: username,
              description: description,
            }
          );
          console.log(response.data);
          setToken(response.data.token);
        } else {
          setError("Les 2 MDP ne sont pas identiques !");
        }
      } else {
        setError("Remplir tous les champs !");
      }
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);

      if (
        error.response.data.error === "This username already has an account." ||
        error.response.data.error === "This email already has an account."
      ) {
        setError(error.response.data.error);
      }
    }
  };
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/logo2.png")}
          />
        </View>
        <View style={styles.Title}>
          <Text style={styles.Title}>Sign up</Text>
        </View>
        <View>
          <TextInput
            style={styles.Input}
            onChangeText={(text) => setEmail(text)}
            value={text}
            placeholder="email"
            keyboardType="email-address"
          ></TextInput>
        </View>
        <View>
          <TextInput
            style={styles.Input2}
            onChangeText={(text) => setUsername(text)}
            value={text}
            placeholder="Username"
            keyboardType="default"
          ></TextInput>
        </View>
        <View>
          <TextInput
            style={styles.input3}
            onChangeText={(text) => setDescription(text)}
            value={text}
            placeholder="Describe yourself in a few words..."
            keyboardType="default"
          ></TextInput>
        </View>
        <View>
          <TextInput
            style={styles.Input2}
            onChangeText={(text) => setPassword(text)}
            value={text}
            placeholder="password"
            secureTextEntry={true}
            keyboardType="default"
          ></TextInput>
        </View>
        <View>
          <TextInput
            style={styles.Input2}
            onChangeText={(text) => setConfirmPassword(text)}
            value={text}
            placeholder="confirm password"
            secureTextEntry={true}
            keyboardType="default"
          ></TextInput>
        </View>
        <View>
          <Button
            style={styles.button}
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </Button>
        </View>
        <View>
          <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={createAccount}>
            <Text style={styles.linkText}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    height: 60,
    width: 60,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Title: {
    marginTop: 15,
    fontSize: 20,
    color: "grey",
    alignItems: "center",
    fontWeight: "bold",
  },
  Input: {
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#FF7F50",
  },
  Input2: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,

    borderBottomWidth: 1,
    borderBottomColor: "#FF7F50",
  },
  input3: {
    backgroundColor: "#fff",
    marginLeft: 30,
    marginTop: 30,
    height: 80,
    width: 310,
    borderColor: "#FF7F50",
    borderWidth: 1,
  },
  button: {
    borderRadius: 30,
    backgroundColor: "#fff",
    marginLeft: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#FF7F50",
    marginTop: 50,
    height: 60,
    width: 200,
    fontSize: 10,
    fontWeight: "bold",
    color: "grey",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
  },

  linkText: {
    fontSize: 10,
    color: "grey",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 120,
    marginTop: 10,
  },
});
