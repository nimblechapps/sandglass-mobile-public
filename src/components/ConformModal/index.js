
import React from "react";
import { StyleSheet, Modal, View, TouchableOpacity, Text } from "react-native";
import PropTypes from 'prop-types';
import { Color, Font } from '../../utils/theme';
import Label from '../Label';

const ConformModal = (props) => {
    const {
        disabled,
        visible,
        alertText,
        modalTitleStyle,
        modalTxtStyle,
        confirmText,
        onConfirmPress,
        cancelText,
        onCancelPress,
        modaltitle,
        children,
        centerContainerStyle
    } = props;

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}>
            <View style={styles.container}>
                <View style={[styles.centerContainer, centerContainerStyle]}>
                    <Label style={[styles.modalTitle, modalTitleStyle]}>{modaltitle}</Label>
                    <Label style={[styles.alertText, modalTxtStyle]}>{alertText}</Label>
                    {children}
                    <View style={styles.bottonView}>
                        <TouchableOpacity disabled={disabled} style={styles.confirmTextbutton} onPress={onConfirmPress} >
                            <Text style={styles.confirmText}>{confirmText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={disabled} style={styles.cancelTextbutton} onPress={onCancelPress} >
                            <Text style={styles.cancelText}>{cancelText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

ConformModal.defaultProps = {
    confirmText: "Yes",
    cancelText: "No"
};

ConformModal.propTypes = {
    visible: PropTypes.bool,

    alertText: PropTypes.string,

    confirmText: PropTypes.string,
    onConfirmPress: PropTypes.func,

    cancelText: PropTypes.string,
    onCancelPress: PropTypes.func,
};

const centerViewWidth = 280;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1
    },
    centerContainer: {
        width: centerViewWidth,
        borderRadius: 8,
        backgroundColor: Color.WHITE,
        padding: 16,
        alignItems: 'flex-start',
    },
    modalTitle: {
        fontFamily: Font.SFPROTEXTMEDIUM,
        fontSize: Font.SIZE_18,
        color: Color.BLACK,
        paddingBottom: 16,
        paddingVertical: 12,
    },
    alertText: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_14,
        color: Color.BLACK,
        paddingBottom: 20
    },
    bottonView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between"
    },
    confirmTextbutton: {
        backgroundColor: Color.RED_200,
        width: 110,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelTextbutton: {
        backgroundColor: Color.GREY_400,
        width: 110,
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmText: {
        fontFamily: Font.SFPROTEXTMEDIUM,
        fontSize: Font.SIZE_14,
        color: Color.WHITE,
        textTransform: 'uppercase'
    },
    cancelText: {
        fontFamily: Font.SFPROTEXTMEDIUM,
        fontSize: Font.SIZE_14,
        color: Color.WHITE,
        textTransform: 'uppercase'
    }
});

export default ConformModal;
