import React, { useRef} from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const captureAndSaveQRCode = async ({ viewShotRef }) => {
    try {
      const uri = await viewShotRef.current.capture();
      console.log('Captured URI:', uri);
  
      const filePath = `${FileSystem.documentDirectory}qrcode.png`;
      console.log('File Path:', filePath);
  
      // Copy the file instead of moving
      await FileSystem.copyAsync({
        from: uri,
        to: filePath,
      });
  
      console.log('File saved to:', filePath);
  
      // Share the file
      await Sharing.shareAsync(filePath);
      console.log('Success', 'QR Code saved and shared!', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Error saving QR Code:', error.message, error);
      console.log('Error', 'Failed to save QR Code.', [{ text: 'OK' }]);
    }
  };


export default captureAndSaveQRCode;