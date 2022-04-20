import React, { useState } from "react";
import { StyleSheet, Modal, View, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

function CustomAlertBox(props) {
  const { modalVisible, children, onRequestClose, modalStyle } = props;

  return (
    <>
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={onRequestClose}
        >
          <View style={styles.centeredView}>{children}</View>
        </Modal>
      )}
    </>
  );
}

CustomAlertBox.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.any,
  rightButtonName: PropTypes.string,
  leftButtonName: PropTypes.string,
  onConfirmPress: PropTypes.func,
  onCancelPress: PropTypes.func,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomAlertBox;
