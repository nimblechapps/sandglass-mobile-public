import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Color, Font } from "../../utils/theme";
import IconButton from "../IconButton";
import Label from "../Label";

const SettingButtons = (props) => {
  const { title, style, onPress } = props;
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={[styles.linkBox, style]} onPress={onPress}>
      <Label style={styles.textTitle}>{t(title)}</Label>
      <IconButton
        style={styles.settingBack}
        disabled={true}
        iconName="chevron-right"
        iconStyle={styles.iconStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkBox: {
    backgroundColor: Color.WHITE,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Color.GREY_200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconStyle: {
    fontSize: Font.SIZE_16,
    color: Color.BLUE_500,
  },
  textTitle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    color: Color.GREY_700,
  },
});
export default SettingButtons;
