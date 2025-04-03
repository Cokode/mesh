import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";

const ProfileEdit = ({ style, onClose, user, onSubmit }) => {
  const { container } = style;

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
    username: user.username,
    address: user.address,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    address: '',
  });

  const validateInput = (field, value) => {
    let error = '';
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'firstName':
      case 'lastName':
      case 'username':
        if (value?.length <= 3) {
          error = `${field} must be at least 4 characters`;
        }
        else if (/[^a-zA-Z0-9\s]/.test(value)) {
          error = `${field} should not contain special characters`;
        }
        break;
      case 'password':
        // No specific rules here, you can add them
        break;
      case 'address':
        if (value?.length <= 10) {
          error = 'address must be at least 4 characters';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (field, value) => {
    validateInput(field, value);
    setFormData({ ...formData, [field]: value });
  };

  // Validate all fields on submit
  const handleSubmit = () => {
    // Trigger validation for all fields
    Object.keys(formData).forEach(field => validateInput(field, formData[field]));
    
    // Check if there are any errors
    if (Object.values(errors).some(error => error)) {
      alert('Please fix the errors before submitting.');
      return;
    } else {
      // Handle valid form submission (e.g., send data to API)
      onSubmit(formData);
      onClose();  // Optionally close the modal or navigate away
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={container}>
          <Text style={{ alignSelf: "center", fontSize: 20, padding: 10, color: "blue" }}>Update Profile Information</Text>

          <FormField label="First name" error={errors.firstName}>
            <TextInput 
              value={formData.firstName} 
              style={styles.inputStyle} 
              onChangeText={(e) => handleChange('firstName', e)} 
            />
          </FormField>

          <FormField label="Last name" error={errors.lastName}>
            <TextInput 
              value={formData.lastName} 
              style={styles.inputStyle} 
              onChangeText={(e) => handleChange('lastName', e)} 
            />
          </FormField>

          <FormField label="Email*" error={errors.email}>
            <TextInput 
              value={formData.email} 
              style={styles.inputStyle} 
              onChangeText={(e) => handleChange('email', e)} 
              keyboardType="email-address" 
            />
          </FormField>

          <FormField label="Password*" error={errors.password}>
            <TextInput 
              value={formData.password} 
              style={styles.inputStyle} 
              onChangeText={(e) => handleChange('password', e)} 
              secureTextEntry 
            />
          </FormField>

          <FormField label="Username" error={errors.username}>
            <TextInput 
              value={formData.username} 
              style={styles.inputStyle} 
              onChangeText={(e) => handleChange('username', e)} 
            />
          </FormField>

          <FormField label="address" error={errors.address}>
            <TextInput 
              value={formData.address} 
              style={styles.inputStyleaddress} 
              onChangeText={(e) => handleChange('address', e)} 
              multiline
            />
          </FormField>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <Text onPress={onClose} style={styles.closeText}>Close Modal</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const FormField = ({ label, children, error }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.labelStyle}>{label}</Text>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    marginBottom: 15,  // Increased marginBottom
    padding: 10,
    borderRadius: 5,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputStyle: {
    height: 45,  // Increased height for better visibility
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,  // Added bottom margin for spacing
  },
  inputStyleaddress: {
    height: 100,
    maxHeight: 100,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,  // Added bottom margin for spacing
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",  // Center the button
    width: '80%',  // Make button width responsive
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  closeText: {
    fontSize: 16,
    color: "blue",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ProfileEdit;
