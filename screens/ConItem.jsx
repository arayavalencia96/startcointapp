import { View, Text, StyleSheet, Image } from "react-native";

const widthContainerCoin = "30%";
const widthContainerDescrip = "55%";

const ConItem = ({ coin }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerCoin}>
        <Text style={styles.containerText}>{coin.name}</Text>
        <Image style={styles.image} source={{ uri: coin.image }} />
      </View>
      <View style={styles.containerDescrip}>
        <Text style={styles.text}>Símbolo: {coin.symbol.toUpperCase()}</Text>
        <Text style={styles.text}>Precio: {coin.current_price} US$</Text>
        <View style={styles.price}>
          <Text style={styles.text}>24hs: </Text>
          <Text
            style={[
              styles.clrUp,
              coin.price_change_percentage_24h > 0
                ? styles.clrUp
                : styles.clrDown,
            ]}
          >
            {coin.price_change_24h} US$
          </Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.text}>% 24hs: </Text>
          <Text
            style={[
              styles.clrUp,
              coin.price_change_percentage_24h > 0
                ? styles.clrUp
                : styles.clrDown,
            ]}
          >
            {coin.price_change_percentage_24h}%
          </Text>
        </View>
        <Text style={styles.text}>Volumen total: {coin.total_volume} US$</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    marginBottom: 10,
  },
  container: {
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  containerCoin: {
    marginEnd: 20,
    width: widthContainerCoin,
    justifyContent: "center",
    alignItems: "center",
  },
  containerText: {
    marginBottom: 10,
    color: "white",
  },
  containerDescrip: {
    width: widthContainerDescrip,
  },
  textSymbol: {
    color: "white",
    textTransform: "uppercase",
  },
  clrUp: {
    color: "green",
    marginBottom: 10,
  },
  clrDown: {
    color: "red",
    marginBottom: 10,
  },
  price: {
    flexDirection: "row",
  },
});

export default ConItem;
