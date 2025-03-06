import React, { useState } from "react";
import { 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  Text ,
} from "react-native";
import { Input } from "@rneui/base";
import ModalSelector from "react-native-modal-selector";
import { renderItem, ListEmptyComponent}  from "./imageUpload";
import selectImage from "./lib/imagePicker";
import { myStash, newItem, categories } from "../urls/stashObject";
let base64Data = "";

const RegisterInput = ({ bottomPad, submitAction }) => {
 
  const [ form, setForm ] = useState (newItem);
  const [ imageData, setImageData ] = useState([]);
  const [ lockSubmit, setLockSubmit ] = useState(false);

  const imageUpdater = async () => {
    const isEmptySet = imageData.length <= 0;
    const maxImages = 6;
    const remainingUploads = maxImages - imageData.length;
  
    if (remainingUploads <= 0) {
      return;
    }

    const results = await selectImage(remainingUploads);
    if (!results || results.canceled) return;
  
    let newImages = results.assets.map(asset => ({ ...asset}));
    base64Data = newImages[0].base64; // can be rmeoved.

    if (isEmptySet) {
      newImages.push(myStash);
    } else {
      imageData.forEach(e => newImages.push(e));
    }

    newImages.forEach(e => console.log(e.fileSize)); // To be removed

    setImageData(newImages);
    console.log("ending line..........");
  };

  const preSubmit = () => {
    if (imageData.length < 1) return;

    console.log("Length ImageData: " + imageData.length);
    console.log("Length ImageData: " + imageData.uri);
       
    setLockSubmit(lockSubmit);
   // imageData.forEach(e => e.base64 = "");

    let copyImage = imageData.filter((e) => e.uri !== "uploader");
    
     
    let copy = {...form};
    copy.pictures = [...copyImage];
    // let copy = {...form, pictures: [...copyImage]};
    console.log("Pictures: "+ copy.pictures.length);

    submitAction(copy);
  };

  const handleDelete = (item) => {
    const result = (prev) => prev.filter((i) => i.uri !== item.uri)
    setImageData(result);
  };

  return (
    <View>
      {/* Profile Picture */}
      <View style={styles.imageContainer}>
        {/* <Image  style={styles.image} 
            source={{ uri: `data:image/png;base64,${base64Data}`}} 
        />  */}
        <Text style={styles.imageText}>Upload Image</Text>
      </View>

      {/* Image Upload Section */}
      <FlatList
        style={styles.ListGroup}
        horizontal
        data={imageData}
        keyExtractor={item => item.uri}
        renderItem={({ item }) => renderItem({ item, imageUpdater, onDelete: handleDelete })}
        ListEmptyComponent={<ListEmptyComponent imageUpdater={imageUpdater} />}
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
        onChange={(option) => setForm({ ...form, category: option.value })}
      >
        <Text style={styles.label}>Category</Text>
        <Input
          style={styles.View}
          editable={false}
          placeholder="Select category"
          value={form.category}
        />
      </ModalSelector>

      {/* Conditional Inputs */}
      {form.category === "Others" && (
        <InputSection
          label="Specify"
          value={form.other}
          onChangeText={(text) => setForm({ ...form, ifOthers: text })}
        />
      )}

      {form.category === "Pets" && (
        <InputSection
          label="Tag Number"
          value={form.tagNumber}
          onChangeText={(text) => setForm({ ...form, tagNumber: text })}
        />
      )}

      {form.category !== "Others" && form.category !== "Pets" && (
        <InputSection
          label="Serial / Product Number"
          value={form.sp_Number}
          onChangeText={(text) => setForm({ ...form, sp_Number: text })}
        />
      )}

      {/* Common Inputs */}
      <InputSection
        label="Stash Name"
        value={form.itemName}
        onChangeText={(text) => setForm({ ...form, itemName: text })}
      />
      <InputSection
        label="Description"
        value={form.itemDesc}
        onChangeText={(text) => setForm({ ...form, itemDesc: text })}
        multiline
        maxLength={300}
        onFocus={() => bottomPad(50)}
        onBlur={() => bottomPad(0)}
      />

      {/* Register Button */}
      <TouchableOpacity
        style={styles.buttonGroup}
        activeOpacity={0.6}
        onPress={preSubmit}
        disabled={lockSubmit}
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
