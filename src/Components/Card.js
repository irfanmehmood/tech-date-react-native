import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../Libs/style";

const Card = ({match}) => {
  return (
    <View style={(styles.card, { backgroundColor: "white" })}>
      <Image
        style={{ height: 500 }}
        name="user"
        source={{
          uri: match.imageUrl,
        }}
      />
      <Text style={styles.text}>{match.name}</Text>
      <Text style={styles.text}>Age: {match.age}</Text>
      <Text style={styles.text}>Country: {match.countryCode}</Text>
    </View>
  );
};

export default Card;
