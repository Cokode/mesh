import React, {useState} from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = ({ image, style, item }) => {

  const [expand, setExpand] = useState(false);
  const navigation = useNavigation();


  const {rewardEligibility,
    dateAdded,
    itemName, 
    sp_Number, 
    ifOthers,
    lost_comment, 
    itemDesc,
    LostStatus,
    FoundStatus,
    priorityStatus,
    tagNumber,
  } = item;

  const {detailsWrapper, imageMemeStyle, imgeStyle, commenetStyle } = style;

  return (

    <>
      <Pressable
        style={styles.container}
        onPress={() => navigation.navigate('View', { stash: item })}
        activeOpacity={0.6}
        >

        <Pressable style={detailsWrapper}>
          <Image style={imageMemeStyle} source={require("../../assets/myIMGs/depo.jpg")}/>
          <Text style={{fontWeight: 500, marginBottom: 10}}> Fred Anderson</Text>
        </Pressable>

        <View style={detailsWrapper}>
          <Image style={imgeStyle} source={require("../../assets/myIMGs/tagNmber.png")}/>
          <Text>{ sp_Number }</Text>

          <Text> Priority Status</Text>
          <Image style={[imgeStyle, {color: "red"}]} source={require("../../assets/myIMGs/priority_high.png")}/>
        </View>

        { expand ? 
          (
            <View style={commenetStyle} onPress={setExpand(true)} >
              <Text>{ lost_comment }</Text>
            </View>
          )
          :
          (
            <View style={commenetStyle}>
              <Text>{ lost_comment }</Text>
            </View>
          ) 
        }
          
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, borderRadius: 10, borderBlockColor: "#CECECE", borderWidth: 1, marginTop: 5}, // backgroundColor: "#fff" },
  // image: { width: 100, height: 100 },
  // text: { fontSize: 16, marginTop: 5 },
  
});

export default Card;
