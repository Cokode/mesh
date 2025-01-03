import React, { useState } from "react";
import { 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  Text 
} from "react-native";
import { Input } from "@rneui/base";
import ModalSelector from "react-native-modal-selector";
import { renderItem, ListEmptyComponent } from "./imageUpload";
import selectImage from "./lib/imagePicker";

const RegisterInput = ({ bottomPad, showModal }) => {
  const [value, setValue] = useState({
    hasPicture: false,
    category: "",
    other: "",
    stashName: "",
    desc: "",
    sp_number: "",
    tagNumber: "",
  });
  
  const [imageUrl, setImageUrl] = useState([{ imgUrl: "uploader" }]);

  const imageUpdater = async () => {
    const maxImages = 6;
    
    const remainingUploads = maxImages - imageUrl.length;

    if (remainingUploads <= 0) {
      return;
    }

    const results = await selectImage(remainingUploads);
    if (!results || results.canceled) return;

    const newImages = results.assets.map((img) => ({ imgUrl: img.uri }));
    setImageUrl([...imageUrl, ...newImages]);
  };

  const categories = [
    { key: 0, section: true, label: "All Categories" },
    { key: 1, label: "Vehicles", value: "Vehicle" },
    { key: 2, label: "Electronics", value: "Electronic" },
    { key: 3, label: "Pets", value: "Pet" },
    { key: 4, label: "Accessories", value: "Accessory" },
    { key: 5, label: "Clothings", value: "Clothing" },
    { key: 6, label: "Others", value: "Others" },
  ];

  return (
    <View>
      {/* Profile Picture */}
      <View style={styles.imageContainer}>
        {/* <Image 
          style={styles.image} 
          source={require("../../assets/myIMGs/image.png")} 
        /> */}
        <Text style={styles.imageText}>Your name</Text>
      </View>

      {/* Image Upload Section */}
      <FlatList
        style={styles.ListGroup}
        horizontal
        data={imageUrl}
        renderItem={({ item }) => renderItem({ item, imageUpdater })}
        ListEmptyComponent={ListEmptyComponent}
        showsHorizontalScrollIndicator={false}
      />

      {/* Category Selector */}
      <ModalSelector
        data={categories}
        initValue="Select category"
        style={styles.inputGroup}
        cancelText="Cancel"
        selectStyle={styles.modal}
        supportedOrientations={["landscape", "portrait"]}
        cancelButtonAccessibilityLabel="Cancel Button"
        onChange={(option) => setValue({ ...value, category: option.value })}
      >
        <Text style={styles.label}>Category</Text>
        <Input
          style={styles.View}
          editable={false}
          placeholder="Select category"
          value={value.category}
        />
      </ModalSelector>

      {/* Conditional Inputs */}
      {value.category === "Others" && (
        <InputSection
          label="Specify"
          value={value.other}
          onChangeText={(text) => setValue({ ...value, other: text })}
        />
      )}

      {value.category === "Pet" && (
        <InputSection
          label="Tag Number"
          value={value.tagNumber}
          onChangeText={(text) => setValue({ ...value, tagNumber: text })}
        />
      )}

      {value.category !== "Others" && value.category !== "Pet" && (
        <InputSection
          label="Serial / Product Number"
          value={value.sp_number}
          onChangeText={(text) => setValue({ ...value, sp_number: text })}
        />
      )}

      {/* Common Inputs */}
      <InputSection
        label="Stash Name"
        value={value.stashName}
        onChangeText={(text) => setValue({ ...value, stashName: text })}
      />
      <InputSection
        label="Description"
        value={value.desc}
        onChangeText={(text) => setValue({ ...value, desc: text })}
        multiline
        maxLength={300}
        onFocus={() => bottomPad(50)}
        onBlur={() => bottomPad(0)}
      />

      {/* Register Button */}
      <TouchableOpacity
        style={styles.buttonGroup}
        activeOpacity={0.6}
        onPress={showModal}
      >
        <Text style={styles.buttonText}>Register Stash</Text>
      </TouchableOpacity>
    </View>
  );
};

const InputSection = ({ label, value, onChangeText, ...props }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <Input
      errorMessage=""
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  View: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  label: {
    padding: 10,
    fontSize: 12,
  },
  inputGroup: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#B3C8CF",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  ListGroup: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#B3C8CF",
  },
  imageContainer: {
    flexDirection: "row",
  },
  imageText: {
    fontSize: 14,
    padding: 10,
    paddingTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  buttonGroup: {
    backgroundColor: "#1B6B93",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignSelf: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 14,
    alignSelf: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterInput;
