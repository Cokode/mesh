import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
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
  const { fetchStashes, loading, stashes } = useFetchStashes();
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
    fetchStashes();
    setReportDecision(!reportDecision);
    console.log("choice is: " + reportDecision);
    return reportDecision;
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchStashes();

    const timer = setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    fetchStashes();
  },[]);
  
  useEffect(() => {
    if (stashes?.length === 0 || stashes === null) {
      setNoData(false);
    }
    const timer = setTimeout(() => {
      setNoData(true);
    }, 3000);

  return () => clearTimeout(timer);
  },[]);

  return (
    <KeyboardAvoiding>
      <GestureHandlerRootView style={{ flex: 1 , padding: 10, backgroundColor: "#fff"}}>
        <>
          <ReportChoice type={reportType}/>
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
                  ListEmptyComponent={ noData? <NoStash /> : <Loading />}
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
    // backgroundColor: '#fff',
    backgroundColor: "red"
  },  
});

export default ReportScreen;
