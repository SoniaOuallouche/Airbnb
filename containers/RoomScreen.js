import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {useState, useEffect} from "react"
import * as Location from "expo-location"
import MapView, {PROVIDER_GOOGLE} from "react-native-maps"

export default function RoomScreen(){
  const [latitude, setLatitude]=useState()
  const [longitude, setLongitude]=useState()
  const [isLoading, setIsLoading]=useState()

  const coords=[{latitude: 48.8589465, longitude: 2.2768234}]
  useEffect(()=>{
    const getPermission=async()=>{
      try{
const {status} = await Location.requestForegroundPermissionsAsync()

if (status==="granted"){
  const location = await Location.getCurrentPositionAsync()

  setLatitude(location.coords.latitude)
  setLongitude(location.coords.longitude)
  setIsLoading(false)
}else{
  alert("Permission refusée")
}
}catch (error){
console.log(error.message)
      }
    }
    getPermission()
  }, [])

  return isLoading === true ? (
<ActivityIndicator/>):(
  <View style={styles.container}>
<MapView
provider={PROVIDER_GOOGLE}
initialRegion={{
  latitude: latitude,
  longitude: longitude,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
}}
showsUserLocation={true}
style={styles.map}
>
{coords.map((item, index)=>{
  return(
    <MapView.Marker
    key={index}
    coordinate={{
    latitude: item.latitude,
    longitude: item.longitude
    }}
    />
  )
})}
</MapView>
  </View>
)



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: 500,
    width: "100%",
  },
});

export default RoomScreen;

