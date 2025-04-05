import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, Dimensions, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Google icons
const { width: screenWidth } = Dimensions.get("window");

const ItemDisplay = ({ itemData, onButtonPress }) => {


  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View contentContainerStyle={styles.container}>
      {/* Item Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{itemData?.itemName}</Text>
        <Text style={styles.description}>{itemData?.itemDesc}</Text>

        <View style={styles.detailRow}>
          <Icon name="confirmation-number" size={18} color="#1B6B93" />
          <Text style={styles.detailText}> Serial/Product No: {itemData?.sp_Number || "N/A"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="qr-code" size={18} color="#1B6B93" />
          <Text style={styles.detailText}> Barcode Number: {itemData?.barcodeNumber || "N/A"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="category" size={18} color="#1B6B93" />
          <Text style={styles.detailText}> Category: {itemData?.category || "Others"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="priority-high" size={18} color="#1B6B93" />
          <Text style={styles.detailText}> Priority Status: {itemData?.priorityStatus || "N/A"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="local-offer" size={18} color="#1B6B93" />
          <Text style={styles.detailText}> Tag Number: {itemData?.tagNumber || "N/A"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="location-off" size={18} color="#1B6B93" />
          <Text style={styles.detailText}> Lost Status: {itemData?.LostStatus ? "Lost" : "Not Lost"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="location-on" size={18} color="#1B6B93" />
          <Text style={styles.detailText}> Found Status: {itemData?.FoundStatus ? "Found" : "Safe"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="calendar-today" size={18} color="#1B6B93" />
          <Text style={styles.detailText}> Date Added: {itemData?.dateAdded}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="access-time" size={18} color="#1B6B93" />
          <Text style={styles.detailText}> Time Added: {itemData?.timeAdded}</Text>
        </View>
      </View>

      {/* Picture Gallery */}
      <View style={styles.imageGallery}>
        <Text style={styles.sectionTitle}>Pictures</Text>
        {itemData?.pictures?.length > 0 ? (
          <FlatList
            data={itemData?.pictures}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: item?.pictureUrls }} style={styles.imageThumbnail} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noImageText}>No pictures available</Text>
        )}
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.button} onPress={() => onButtonPress(itemData?._id)}>
        <Icon name="edit-note" size={22} color="#fff" />
        <Text style={styles.buttonText}>Delete stash</Text>
      </TouchableOpacity>

      {/* Modal Full Image View */}
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Image source={{ uri: itemData?.pictures[0].pictureUrls }} style={styles.fullSizeImage} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: "#f2f5f7",
    width: screenWidth,
  
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: "100%", // ✅ Ensures it stretches full width within container
  },
 
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B6B93",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B6B93",
    marginBottom: 10,
    marginTop: 15
  },
  imageGallery: {
    marginBottom: 20,
    width: "100%",
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  noImageText: {
    color: "#888",
    fontStyle: "italic",
  },
  button: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#1B6B93",
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  fullSizeImage: {
    width: "90%",
    height: "70%",
    borderRadius: 16,
    resizeMode: "contain",
  },
});

export default ItemDisplay;
