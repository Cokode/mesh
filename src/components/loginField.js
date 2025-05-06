import React, {useState, useRef} from "react";
import { Input, Button, color } from "@rneui/base";
import Spacer from "./spacer";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginField = ({ onSubmit }) => {

    const inputElement = useRef();

    const focusInput = () => {
      inputElement.current.focus();
    }
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
          ref={inputElement}
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
            errorStyle={{color: 'orange', fontSize: 14}}
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
              setLogin({...login, password: e})
            }}
            labelStyle={styles.labelStyle}
            keyboardAppearance="dark"
            errorStyle={{color: 'orange', fontSize: 14}}
        />
       </Spacer>
       <Button
        title="Login"
        buttonStyle={styles.buttonStyle} // For the button itself
        titleStyle={styles.titleStyle}  // For the text inside the button
        onPress={()=> {
          setErrMessage({...errMessage, default: errMessage['email']}); // ONLY set if login failed
          onSubmit(login);
        }}
        disabled={login['password'] && login['email']? false: true}
        disabledStyle={{backgroundColor: '#A6AEBF'}} 
    />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#1B6B93',
    borderWidth: 2,
    borderRadius: 10,
  },
  inputStyle: {
    fontSize: 18, 
    width: '80%',
    // padding: 5,
    borderRadius: 10
  },
  labelStyle: {
    color: "black", 
    fontSize: 18, 
    fontWeight: "bold", 
  },
  buttonStyle: {
    backgroundColor: "#0C356A", //"#841584",
    borderRadius: 7,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,  
      height: 3, 
    },
    shadowOpacity: 0.3, 
    shadowRadius: 4.65, 
    elevation: 8, 
  },
  titleStyle: {
    fontSize: 20,
    // fontWeight: "600",
    color: "#fff",
  },
});
//onPress={()=> onSubmit(login)}

export default LoginField;