import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import Spacer from "../components/spacer"; 
import KeyboardAvoiding from "../components/keyBoardAvoidingView";
import { RefreshControl, GestureHandlerRootView } from 'react-native-gesture-handler';
import useFetchStashes from "../hooks/useFetchData";
import ReportChoice from "../components/reportChoice";
import ReportComp from "../components/reportComp";
import LostView from "../components/lostView";
import Loading from "../components/loading";
import NoStash from "../components/noStash";

const ReportScreen = () => {

  const [padding, setPadding] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [reportDecision, setReportDecision] = useState(false);
  const { fetchStashes, errorMessage, stashes } = useFetchStashes();
  const [noData, setNoData] = useState(false);

  const FullImage = (value) => {
    console.log(value.assetId)
    setImage(value);
    setShowPicture(!showPicture);
  }
 
  const bottomPadding = height => {
    setPadding(height);
  };

  const reportType = () => {
    setReportDecision(!reportDecision);
    console.log("choice is: " + reportDecision);
    return reportDecision;
  };

    // Fectching stashes on every screen refresh.
  const onRefresh = () => {
    setRefreshing(true);
    fetchStashes();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Fectching stashes on every load / mount.
  useEffect(() => {
    fetchStashes();
  },[]);
  
 useEffect(() => {
 
     const timer = setTimeout(() => {
       setNoData(stashes?.length === 0);
     }, 4000);
 
     return () => clearTimeout(timer); // Clean up timer when component unmounts
   }, []);

  return (
    <KeyboardAvoiding>
      <GestureHandlerRootView style={{ flex: 1 , padding: 10, backgroundColor: "#fff"}}>
        <>
          <ReportChoice type={reportType} />
          <Spacer />
          <View style={styles.divider}></View>

          { !reportDecision ? 
            (
              <>
                <ReportComp bottomPad={bottomPadding} />
                <View style={{ backgroundColor: 'orange', height: padding, marginTop: 20 }}></View>
              </>
            ) 
            : 
            (
              <GestureHandlerRootView style={{ flex: 1 }}>
                <FlatList 
                  data={ stashes }
                  renderItem={({ item }) => <LostView item={item} />}
                  keyExtractor={ item =>  item.uri }
                  ItemSeparatorComponent={() => (
                    <View 
                      style={{ 
                        height: 1, 
                        // backgroundColor: 'grey',
                        // marginBottom: 3
                      }} 
                    />
                  )}
                  ListEmptyComponent={noData && true? <NoStash /> : <Loading />}
                  refreshControl={ <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } /> }
                  showsVerticalScrollIndicator
                    />
              </GestureHandlerRootView> 
            )
          }
       </>
      </GestureHandlerRootView>
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
