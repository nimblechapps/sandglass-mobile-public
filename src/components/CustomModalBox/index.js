import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Color, Font } from "../../utils/theme";
import Label from "../Label";
import Dialog from "react-native-dialog";

function CustomModalBox(props) {
  const {
    modalVisible,
    children,
    handleCancel,
    handleConfirm,
    leftButtonName,
    rightButtonName,
    dialogTitle,
    dialogSubTitle,
    customTitle,
    customSubtitle,
  } = props;
  const { t } = useTranslation();

  return (
    <>
      <View>
        <Dialog.Container visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Dialog.Description style={[styles.modalTitle, customTitle]}>
              {dialogTitle}
            </Dialog.Description>
            {dialogSubTitle && (
              <Label style={[styles.modalSubtitle, customSubtitle]}>
                {dialogSubTitle}
              </Label>
            )}
            {children}
          </View>
          <Dialog.Button label={leftButtonName} onPress={handleCancel} />
          <Dialog.Button label={rightButtonName} onPress={handleConfirm} />
        </Dialog.Container>
      </View>
    </>
  );
}

CustomModalBox.propTypes = {
  modalVisible: PropTypes.bool,
  children: PropTypes.any,
  rightButtonName: PropTypes.string,
  leftButtonName: PropTypes.string,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
  dialogTitle: PropTypes.string,
  dialogSubTitle: PropTypes.string,
};

const styles = StyleSheet.create({
  modalContainer: {
    ...Platform.select({
      ios: {
        paddingHorizontal: 16,
      },
      android: {
        paddingHorizontal: 10
      },
    }),
  },
  modalTitle: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_17,
    lineHeight: 22,
    color: Color.BLACK,
    textAlign: "center",
  },
  modalSubtitle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_14,
    lineHeight: 18,
    color: Color.BLACK,
    textAlign: "center",
  },
});

export default CustomModalBox;
