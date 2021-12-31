import React from "react";
import { View, Text, Image } from "react-native";
import { symbolicateLogLazy } from "react-native/Libraries/LogBox/Data/LogBoxData";
import { styles } from "../Libs/style";

const Card = ({match}) => {
  return (
    <View style={(styles.card, {borderRadius:10, backgroundColor: "transparent", opacity: 1,})}>
      <Image
        style={{ height: "95%", borderRadius:15, marginBottom:-7 }}
    
        name="user"
        source={{
          uri: match.imageUrl,
        }}
      />

      <View style={{borderBottomLeftRadius: 15 , borderBottomRightRadius: 15 ,padding:10, marginTop: -75,backgroundColor: "black", opacity: 0.75}}>
      <Image
            style={styles.countryCode}
            source={{
              uri: `https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/png250px/${match.countryCode.toLowerCase()}.png`,
            }}
          />
        <Text style={styles.cardText}>{match.name}</Text>
        <Text style={styles.cardText}>Age: {match.age}</Text>
        <Text style={styles.cardText}>Country: {match.countryCode}</Text>
        
      </View>
    </View>
  );
};

export default Card;
