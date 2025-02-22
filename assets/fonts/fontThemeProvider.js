import React, { useState, useEffect, createContext, useContext } from "react";
import { Text, useColorScheme } from "react-native";
import * as Font from "expo-font";

const FontThemeContext = createContext();

export const FontThemeProvider = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const colorScheme = useColorScheme(); // Detect light or dark mode

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const theme = {
    fontFamily: "Poppins-Regular",
    fontSize: colorScheme === "dark" ? 20 : 16,
    color: colorScheme === "dark" ? "#fff" : "#000",
  };

  return (
    <FontThemeContext.Provider value={theme}>{children}</FontThemeContext.Provider>
  );
};

export const ThemedText = ({ style, children }) => {
  const theme = useContext(FontThemeContext);
  return <Text style={[{ fontFamily: theme.fontFamily, fontSize: theme.fontSize, color: theme.color }, style]}>{children}</Text>;
};
