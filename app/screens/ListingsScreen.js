import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import AppButton from "../components/Button";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";


function ListingsScreen({ navigation }) {
  const {request : loadListings , data : listings , error, loading} = useApi(listingsApi.getListings);


  useEffect(()=>{
    loadListings();
    },[]);
    
  return (
    <>
    <ActivityIndicator visible={loading} />
    <Screen style={styles.screen}>
      { error && 
      <> 
        <AppText>
        could not retrive page
        </AppText>
        <AppButton title='retry' onPress={loadListings}/>
      </>}
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal:15,
    paddingTop:15,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
