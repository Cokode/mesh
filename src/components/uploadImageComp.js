import React, { useState } from "react";
import { View, Button, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useUploadImage from "../hooks/useUploadImage";

const UploadImageComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState(null);

  // Call the custom hook with imageData
  const { uploadToIMGBB, errorMessage, loading, data } = useUploadImage(imageData);

  const pickImage = async () => {
    // Use expo-image-picker or any other library to select an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true, // Important: Get base64 data for upload
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Display image preview
      setImageData({
        base64: result.assets[0].base64, // Pass base64 data to hook
        assetId: result.assets[0].uri.split("/").pop(), // Optional asset identifier
      });
    }
  };

  const handleUpload = () => {
    if (imageData) {
      uploadToIMGBB(); // Call the function from the hook
    }
  };







  

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick an Image" onPress={pickImage} />

      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}

      <Button
        title={loading ? "Uploading..." : "Upload Image"}
        onPress={handleUpload}
        disabled={loading}
      />

      {data && (
        <Text style={{ marginTop: 10 }}>
          Image Uploaded! URL: {data.imgbbUrl}
        </Text>
      )}

      {errorMessage && (
        <Text style={{ color: "red", marginTop: 10 }}>
          Error: {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default UploadImageComponent;
