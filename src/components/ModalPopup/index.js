import React from "react";
import { StyleSheet, Modal } from "react-native";
import PropTypes from 'prop-types';

const ModalPopup = (props) => {
    const { visible, children } = props;
    return (
        <Modal
            animationType="none"
            visible={visible}
            transparent={true}
            style={styles.centeredView}
        >
            {children}
        </Modal>
    )
}

ModalPopup.defaultProps = {
};

ModalPopup.propTypes = {
    visible: PropTypes.bool,
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1
    }
});

export default ModalPopup;
