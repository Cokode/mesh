import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Button,
  Switch,
} from "react-native";

const LostView = (props) => {
  const { stashName, SerialNum, desc } = props;
  const [showModal, setShowModal] = useState(false);
  const [isRewardEligible, setIsRewardEligible] = useState(false);
  const [priorityStatus, setPriorityStatus] = useState(false);

  const toggleRewardEligibility = () => {
    setIsRewardEligible(!isRewardEligible);
  };

  const togglePriorityStatus = () => {
    setPriorityStatus(!priorityStatus);
  };

  const handleSubmit = () => {
    // Handle the submit logic here if needed
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={styles.touchable}
        activeOpacity={0.7}
      >
        <Text style={styles.ownerName}>{stashName}</Text>
        <Text style={styles.serialNumber}>Serial: {SerialNum}</Text>
        <Text style={styles.serialNumber}>Description: {desc}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Item Details</Text>
            <Text style={styles.modalText}>{stashName}</Text>
            <Text style={styles.modalText}>{SerialNum}</Text>

            <View style={styles.rewardContainer}>
              <Text style={styles.rewardText}>Reward Eligible:</Text>
              <Switch
                value={isRewardEligible}
                onValueChange={toggleRewardEligibility}
                thumbColor={isRewardEligible ? "#1B6B93" : "#888"}
                trackColor={{ false: "#ddd", true: "#81C1D3" }}
              />
            </View>

            <View style={styles.rewardContainer}>
              <Text style={styles.rewardText}>priorityStatus</Text>
              <Switch
                value={priorityStatus}
                onValueChange={togglePriorityStatus}
                thumbColor={priorityStatus ? "#1B6B93" : "#888"}
                trackColor={{ false: "#ddd", true: "#81C1D3" }}
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={()=> setShowModal(!showModal)}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  touchable: {
    padding: 15,
    margin: 10,
    backgroundColor: "#1B6B93",
    borderRadius: 10,
    elevation: 5,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  serialNumber: {
    fontSize: 14,
    color: "#D9D9D9",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1B6B93",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
  },
  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  rewardText: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#1B6B93",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LostView;