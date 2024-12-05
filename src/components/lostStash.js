import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { stashProp } from "../urls/stashObject";



const LostStash = (props) => {
  const navigation = useNavigation();

  const { ownerNames, picture,
    stashName,
    desc,
    SerialNum,
    date,
    timePosted,
    rewardEligibility,
    priorityStatus,
    lastKLoc,
    imageAddress} = props;

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('View', {stash: props})}
        activeOpacity={0.6}
        underlayColor ='red'
      >
        <View style={styles.picture}>
        <Image style={styles.pictureImage} source={require('../../assets/myIMGs/image2.png' )}/>
        </View>
        <View style={styles.view}>
        <Text style={{fontSize: 16, fontWeight: 500}}>{ownerNames}</Text>
        <Text>{stashName}</Text>
        <Text>{desc}</Text>
        <Text>{SerialNum}</Text>
        </View>
        <View style={styles.viewImage}>
          <Image style={styles.image} source={require('../../assets/myIMGs/image.png' )}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',//'#9ABF80', //'#B3C8CF',
    height: '50px',
    width: "102%",
    alignSelf: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#EEEEEE', //#EEEEEE',
    padding: 10,
    marginRight: 5,
    flexDirection: 'row'
  },
  picture: {
    width: '10%',
    height: '34%',
    margin: 1,
    // backgroundColor: '#CCD5AE',
    borderRadius: 20,
  },
  pictureImage: {
    width: '100%',
    height: '90%',
    borderRadius: 20,
  },
  view: {
    flex: 4,
    margin: 3,
    backgroundColor: '#CCD5AE',
    borderRadius: 15,
    padding: 15
  },
  viewImage: {
    flex: 2,
    margin: 3,
    height: '80%',
    width: '100%',
    // backgroundColor: '#CCD5AE',
    borderRadius: 20,
    paddingBottom: 15
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  }
})


export default LostStash;