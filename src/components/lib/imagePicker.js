import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

const selectImage = async (allowed) => {
  // Request permission to access media library
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
     // alert("Permission to access camera roll is required!");
      return;
  }
  
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images', ], // 'videos'
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      selectionLimit: allowed,
      orderedSelection: true,
      allowsMultipleSelection: true
  });

  //console.log("Select Image." + result.assets[0].assetId);
  if (result.canceled) {
      console.log('result canceled');
      return;
  }

  return result;
};


export default selectImage;