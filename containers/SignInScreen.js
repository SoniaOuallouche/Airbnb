import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  onChangeText,
  text,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.header}>
          <Image
            source={require("../assets/logo2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.Title}>
          <Text style={styles.Title}>Sign in</Text>
        </View>
        <View>
          <TextInput
            style={styles.Input}
            onChangeText={onChangeText}
            value={text}
            placeholder="email"
            keyboardType="email-address"
          ></TextInput>
        </View>
        <View>
          <TextInput
            style={styles.Input2}
            onChangeText={onChangeText}
            value={text}
            placeholder="password"
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
            <Text style={styles.buttonText}>Sign in</Text>
          </Button>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.linkText}>
              You don't have an account ? Sign up
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
    height: 30,
    width: 30,
    marginTop: 100,
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
    marginTop: 100,
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
  button: {
    borderRadius: 30,
    backgroundColor: "#fff",
    marginLeft: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#FF7F50",
    marginTop: 120,
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
