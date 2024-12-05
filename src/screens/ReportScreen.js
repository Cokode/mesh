import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import Spacer from "../components/spacer"; 
import KeyboardAvoiding from "../components/keyBoardAvoidingView";
import ReportChoice from "../components/reportChoice";
import ReportComp from "../components/reportComp";
import { items } from "../urls/stashObject";
import LostView from "../components/lostView";
import { StatusBar } from "expo-status-bar";

const ReportScreen = () => {
  const [reportDecision, setReportDecision] = useState(false);
  const [padding, setPadding] = useState(0);

  const bottomPadding = height => {
    setPadding(height);
  };

  const reportType = () => {
    setReportDecision(!reportDecision);
    console.log("choice is: " + reportDecision);
    return reportDecision;
  };

  const renderItems = ({ item }) => {
    return (
      <LostView 
        stashName={item.stashName}
        SerialNum={item.SerialNum}
        desc={item.desc}
      />
    );
  };

  const Empty = () => {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoiding>
      <View style={styles.container}>
        <ReportChoice type={reportType} />
        <Spacer />
        <StatusBar backgroundColor="red"/>
        <View style={styles.divider}></View>

        {!reportDecision ? (
          <>
            <ReportComp bottomPad={bottomPadding} />
            <View style={{ backgroundColor: 'orange', height: padding, marginTop: 20 }}></View>
          </>
        ) : (
          <FlatList 
            data={items}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View 
                style={{ 
                  height: 3, 
                  backgroundColor: 'white',
                }} 
              />
            )}
            ListEmptyComponent={<Empty />}
          />
        )}
      </View>
    </KeyboardAvoiding>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderColor: '#1B6B93',
    marginBottom: 5,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ReportScreen;
