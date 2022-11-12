import { View, Text, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserCtx from "../userCtx";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConItem from "./ConItem";
import { FlatList, StyleSheet, StatusBar, TextInput } from "react-native";

const auth = getAuth();

const width = "95%";

const MainScreen = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    console.log(data);
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const { user, setUser } = useContext(UserCtx);

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser({ email: "" });
        deleteUserFromAsyncStorage("email");
      })
      .catch((err) => console.log(err));
  };

  const deleteUserFromAsyncStorage = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.containerr}>
      <StatusBar backgroundColor={"#141414"} />

      <View style={styles.header}>
        <View>
          <Text style={styles.text}>CoinStart App</Text>

          <TextInput
            style={styles.searchInput}
            maxLength={40}
            placeholder="Buscar una Coin"
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <Button title="Cerrar Sesión" onPress={logout}></Button>
      </View>

      <FlatList
        style={styles.list}
        data={coins.filter(
          (coin) =>
            coin.name.includes(search) ||
            coin.symbol.toUpperCase().includes(search)
        )}
        renderItem={({ item }) => {
          return <ConItem coin={item} />;
        }}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerr: {
    backgroundColor: "#242424",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 25,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#fff",
    textAlign: "center",
  },
  header: {
    marginBottom: 30,
  },
  list: {
    width: width,
  },
});

export default MainScreen;
