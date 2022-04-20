import React from "react";
import { StyleSheet, TouchableOpacity, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import Label from "../Label";
import { Color, Font } from "../../utils/theme";
import IconButton from "../IconButton";

const CustomButton = (props) => {
  const {
    style,
    buttonCustomStyle,
    activeOpacity,
    disabled,
    onPress,
    titleStyle,
    title,
    iconLeftName,
    iconCustomLeftStyle,
  } = props;

  let buttonStyle = [];
  buttonStyle.push(styles.button);
  buttonStyle.push(style);

  let textStyle = [];
  textStyle.push(styles.title);
  textStyle.push(titleStyle);

  return (
    <TouchableOpacity
      style={[styles.buttonStyle, buttonCustomStyle]}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
    >
      <Label style={styles.textStyle}>{title}</Label>
      <IconButton
        disabled={true}
        iconName={iconLeftName}
        iconStyle={[styles.iconLeftStyle, iconCustomLeftStyle]}
      />
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  style: ViewPropTypes.style,
  buttonCustomStyle: PropTypes.any,
  activeOpacity: PropTypes.number,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,

  title: PropTypes.string,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconCustomLeftStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Color.GREY_200,
    backgroundColor: Color.WHITE,
    flexDirection: "row",
    // paddingHorizontal: 24,
  },
  textStyle: {
    color: Color.GREY_700,
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_12,
    lineHeight: 16,
  },
  iconLeftStyle: {
    fontSize: Font.SIZE_16,
    marginLeft: 4,
    color: Color.BLUE_500,
  },
});

export default CustomButton;
