import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  Text,
  View,
} from "react-native";
import PropTypes from "prop-types";
import { Color, Font } from "../../utils/theme";
import CustomIcon from "../CustomIcon";

const Checkbox = (props) => {
  const { style, isChecked, titleStyle, title, onPress, disabled, children } =
    props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isChecked ? isChecked : false);
  }, [isChecked]);

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      disabled={disabled}
      onPress={() => {
        setChecked(!checked);
        onPress(!checked);
      }}
    >
      <View
        style={[
          styles.checkBox,
          { borderColor: checked ? Color.GREY_500 : Color.GREY_300 },
        ]}
      >
        {checked && <CustomIcon style={styles.iconStyle} name="check" />}
      </View>
      {title && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}
      <View style={styles.children}>{children}</View>
    </TouchableOpacity>
  );
};

Checkbox.propTypes = {
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  checkBox: {
    position: "relative",
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titleStyle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    color: Color.GREY_500,
    fontSize: Font.SIZE_14,
    paddingLeft: 8,
  },
  children: {
    paddingLeft: 8,
  },
  iconStyle: {
    fontSize: Font.SIZE_12,
    color: Color.GREY_700,
  },
});

export default Checkbox;
