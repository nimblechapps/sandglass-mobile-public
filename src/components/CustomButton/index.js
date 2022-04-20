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
    onLongPress,
    delayLongPress,
    titleStyle,
    title,
    iconLeftName,
    iconCustomLeftStyle,
    mainStyle,
  } = props;

  let buttonStyle = [];
  buttonStyle.push(styles.button);
  buttonStyle.push(style);

  let textStyle = [];
  textStyle.push(styles.title);
  textStyle.push(titleStyle);

  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        { backgroundColor: disabled ? Color.GREY_300 : Color.BLUE_500 },
        buttonCustomStyle,
      ]}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
    >
      {iconLeftName && (
        <IconButton
          disabled={true}
          iconName={iconLeftName}
          iconStyle={[styles.iconLeftStyle, iconCustomLeftStyle]}
        />
      )}
      <Label
        style={[
          styles.textStyle,
          { color: disabled ? Color.BLACK : Color.WHITE },
          titleStyle,
        ]}
      >
        {title}
      </Label>
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
    borderRadius: 28,
    backgroundColor: Color.BLUE_500,
    flexDirection: "row",
    paddingHorizontal: 24,
    height: 48,
  },
  textStyle: {
    color: Color.WHITE,
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_16,
    textTransform: "uppercase",
  },
});

export default CustomButton;
