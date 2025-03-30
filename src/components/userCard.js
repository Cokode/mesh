import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Card = ({ style, item }) => {
  const [expand, setExpand] = useState(false);

  const {
    rewardEligibility,
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
    ownerInfo,
  } = item;

  return (
    <Pressable style={styles.container} onPress={() => setExpand(!expand)}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={{uri: item?.ownerInfo.profilePicture}} />
        <Text style={styles.ownerText}>
          {ownerInfo.firstName} {ownerInfo.lastName}
        </Text>
      </View>

      {/* Tag Number & Priority Section */}
      <View style={styles.tagContainer}>
        <Image style={styles.tagIcon} source={require("../../assets/myIMGs/tagNmber.png")} />
        <Text style={styles.tagText}>{sp_Number}</Text>
        

        { !priorityStatus.length &&
          <>

          <Text style={styles.priorityText}>Priority Status</Text>
          <Image style={styles.priorityIcon} source={require("../../assets/myIMGs/priority_high.png")} />
          
          </> 
        }
      </View>

      {/* Expandable Comment Section */}
      {expand ? (
        <View style={styles.commentExpanded}>
          <Text style={styles.commentText} numberOfLines={8} >{lost_comment}</Text>
        </View>
      ) : (
        <Pressable onPress={() => setExpand(true)} style={styles.commentCollapsed}>
          <Text style={styles.commentText} numberOfLines={2}>
            {lost_comment}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    borderColor: "#CECECE",
    borderWidth: 1,
    backgroundColor: "#fff",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  ownerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tagIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  tagText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#555",
  },
  priorityText: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
    marginLeft: "auto",
  },
  priorityIcon: {
    width: 20,
    height: 20,
    tintColor: "red",
    marginLeft: 5,
  },
  commentCollapsed: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  commentExpanded: {
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
    height: "auto"
  },
  commentText: {
    fontSize: 14,
    color: "#444",
  },
});

export default Card;
