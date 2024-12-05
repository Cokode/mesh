import React, { useState } from "react";
import { Button, Input, Text } from "@rneui/base";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import ModalSelector from 'react-native-modal-selector';
import AntDesign from '@expo/vector-icons/AntDesign';

const ReportComp = (props) => {
  const { bottomPad } = props;

  const [value, setValue] = useState({
    hasPicture: false,
    category: '',
    other: '',   // 'other' is part of the state object
    stashName: '',
    desc: '',
    sp_number: '',
    tagNumber: ''
  });

  let index = 0;

  const categories = [
    { key: index++, section: true, label: "All Categories" },
    { key: index++, label: 'Vehicles', value: 'Vehicle' },
    { key: index++, label: 'Electronics', value: 'Electronic' },
    { key: index++, label: 'Pets', value: 'Pet' },
    { key: index++, label: 'Accessories', value: 'Accessory' },
    { key: index++, label: 'Clothings', value: 'Clothing' },
    { key: index++, label: 'Others', value: 'Others' },
  ];

  return (
    <ScrollView 
      // stickyHeaderIndices={[0]}
      bounces={true}
    >
    <View style={styles.inputGroup}>
      <Text style={styles.label}>images</Text>
      <View style={styles.imageContainer}>

      <AntDesign name="picture" size={54} color="grey" paddingTop={15} />
      </View>

    </View>

    <ModalSelector
      data={categories}
      initValue={'Me'}
      style={styles.inputGroup}
      // onLayout={50}
      cancelText='Cancel'
      selectStyle={styles.modal} // Todo 
      supportedOrientations={['landscape', 'portrait']}
      cancelButtonAccessibilityLabel={'Cancel Button'}
      onChange={(e) => setValue({ ...value, category: e.value })} 
    >
      <Text style={styles.label}>Category</Text>
      <Input
        style={styles.View}
        editable={false}
        placeholder={'Select category'}
        value={value.category}
      />
    </ModalSelector>

    {value.category === 'Others' &&  
      <View style={styles.inputGroup}>
        <Text style={[{ color: value.other ? 'defaultColor' : 'red' }, styles.label]}>Specify</Text>
        <Input
          errorMessage={''}
          value={value.other}
          onChangeText={(e) => setValue({ ...value, other: e })}
        />
      </View>
    }

    {value.category === 'Pet' &&  
      <View style={styles.inputGroup}>
        <Text style={[{ color: value.tagNumber ? 'defaultColor' : 'red' }, styles.label]}>Tag number</Text>
        <Input
          errorMessage={''}
          value={value.tagNumber}
          onChangeText={(e) => setValue({ ...value, tagNumber: e })}
        />
      </View>
    }

    <View style={styles.inputGroup}>
      <Text style={styles.label}>Stash name</Text>
      <Input
        errorMessage={''}
        value={value.stashName}
        onChangeText={(e) => setValue({ ...value, stashName: e })}
      />
    </View>
    
    { (value.category !== 'Others' && value.category !== 'Pet') &&  
      <View style={styles.inputGroup}>
        <Text style={[{ color: value.sp_number ? 'defaultColor' : value.category ? 'red': 'defaultColor' }, styles.label]}>Serial / Product number</Text>
        <Input
          errorMessage={''}
          value={value.sp_number}
          onChangeText={(e) => setValue({ ...value, sp_number: e })}
        />
      </View>
    }

    <View style={styles.inputGroup}>
      <Text style={styles.label}>Description</Text>
      <Input
        errorMessage={''}
        value={value.desc}  
        onChangeText={(e) => setValue({ ...value, desc: e })} 
        onFocus={() => bottomPad(50)}
        multiline
        maxLength={300}
        scrollEnabled
        onBlur={() => bottomPad(0)} 
      />
    </View>

    <TouchableOpacity style={styles.buttonGroup} activeOpacity={.6} onPress={() => alert('Registered!')}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  View: {
    padding: 10,
    backgroundColor: '#f9f9f9',//'#fff',
    borderRadius: 5
  },
  label: {
    padding: 10,
    fontSize: 12
  },
  inputGroup: {
    marginBottom: 15,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#B3C8CF',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#f9f9f9'
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageText: {
    fontSize: 14,
    padding: 10,
    paddingTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 20
  },
  buttonGroup: {
    backgroundColor: '#1B6B93',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 15
  },
  buttonText: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
});

export default ReportComp;
