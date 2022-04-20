import React from "react";
import { StyleSheet, Modal } from "react-native";
import PropTypes from "prop-types";

const ModalSlide = (props) => {
  const { visible, children, onRequestClose } = props;
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={onRequestClose}
      style={styles.centeredView}
    >
      {children}
    </Modal>
  );
};

ModalSlide.defaultProps = {};

ModalSlide.propTypes = {
  visible: PropTypes.bool,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default ModalSlide;
