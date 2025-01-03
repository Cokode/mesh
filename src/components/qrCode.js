import React, { useRef} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Spacer from './spacer';
import AntDesign from '@expo/vector-icons/AntDesign';
import ViewShot from 'react-native-view-shot';
import Feather from '@expo/vector-icons/Feather';
import captureAndSaveQRCode from './lib/viewShot';

const QRCodeGenerator = ({url, closeModal}) => {
  const viewShotRef = useRef();

  return (
    <View style={styles.container}>
      <Spacer />
      <Text 
        style={{
          fontSize: 15, 
          borderRadius: 20, 
          alignSelf: 'center',
        }
      }
        onPress={closeModal}></Text>
      <Spacer />

      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
        <View style={{padding: 20, backgroundColor: 'white', borderRadius: 15, marginBottom: 10, alignItems: 'center'}}>
          <QRCode
            value={url}
            size={250}
            color="black"
            backgroundColor="white"
            logo={require("../../assets/myIMGs/image.png")}
            logoMargin={3}
            logoSize={30}
            logoBackgroundColor='white'
            logoBorderRadius={5}
          />
          <Text 
            style={{
                fontSize: 10, 
                backgroundColor: 'white',
                borderRadius: 20, 
                padding: 5,
                alignSelf: 'center',
              }
            
            }>if i'm lost please scan me to reach owner</Text>
        </View>
    </ViewShot>
    <Spacer />
    <View
      style={
        {
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'space-between',
          flex: 1,
          width: "100%",
          marginBottom: 30
        }
      }>
    <Feather name="share" size={54} color="rgb(100, 100, 100)" onPress={() => captureAndSaveQRCode({viewShotRef})} />
    <AntDesign name="closecircleo" size={54} color="rgb(100, 100, 100)" onPress={closeModal} />
    </View>   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 37, 77, 0.98)',
    padding: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 120,
  },
});

export default QRCodeGenerator;