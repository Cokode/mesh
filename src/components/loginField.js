import React, {useState} from "react";
import { Input, Button, color } from "@rneui/base";
import Spacer from "./spacer";
import { View, StyleSheet } from "react-native";

const LoginField = ({onSubmit}) => {

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [errMessage, setErrMessage] = useState({
    default: "",
    email: "Invalid email or password",
    password: "Bad password"
  });

  return (
    <View style={styles.container}>
      <Spacer>
      <Input 
        style={styles.inputStyle}
          label="Email"
          inputMode="email"
          value={login["email"]}
          onChangeText={(e) => {
            setErrMessage({...errMessage, default: errMessage['']});
            setLogin({...login, email: e})
          }}
          labelStyle={styles.labelStyle}
          keyboardAppearance="dark"
          // errorMessage= {errMessage.default}
          errorStyle={{color: 'orange', fontSize: 14}}
          shake={true}
      />
      </Spacer>
      <Spacer>
      <Input 
        style={styles.inputStyle}
          label="Password"
          inputMode="text"
          value={login["password"]}
          secureTextEntry={true}
          errorMessage= {errMessage.default}
          onChangeText={(e) => {
            setErrMessage({...errMessage, default: errMessage['']});
            setLogin({...login, email: e})
          }}
          labelStyle={styles.labelStyle}
          keyboardAppearance="dark"
          errorStyle={{color: 'orange', fontSize: 14}}
      />
       </Spacer>
       <Spacer/>
       <Button
        title="Login"
        buttonStyle={styles.buttonStyle} // For the button itself
        titleStyle={styles.titleStyle}  // For the text inside the button
        onPress={()=> {
          setErrMessage({...errMessage, default: errMessage['email']});
          onSubmit(login)
        }}
        disabled={login['password'] && login['email']? false: true}
        disabledStyle={{backgroundColor: '#A6AEBF'}} 
    />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    // backgroundColor: 'orange',
    borderColor: '#1B6B93',
    borderWidth: 2,
    borderRadius: 10,
    padding: 2
  },
  inputStyle: {
    fontSize: 18, 
    width: '80%',
    padding: 5,
    borderRadius: 10
  },
  labelStyle: {
    color: "black", // Change label color
    fontSize: 18, // Change font size
    fontWeight: "bold", // Make it bold
  },
  buttonStyle: {
    backgroundColor: "#0C356A", //"#841584",
    borderRadius: 7,
    height: 60,
    shadowColor: "#000", // Shadow color (black)
    shadowOffset: {
      width: 0,  // Horizontal shadow offset
      height: 3, // Vertical shadow offset
    },
    shadowOpacity: 0.3, // Shadow transparency (0 to 1)
    shadowRadius: 4.65, // Blur radius for shadow
    elevation: 8, // Android shadow (higher number = deeper shadow)
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
});
//onPress={()=> onSubmit(login)}

export default LoginField;