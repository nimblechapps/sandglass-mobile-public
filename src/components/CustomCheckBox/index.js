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
import Label from "../Label";

const CustomCheckBox = (props) => {
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
      onPress={onPress}
    >
      {title && <Label style={[styles.titleStyle, titleStyle]}>{title}</Label>}

      <View
        style={[
          styles.checkBox,
          { borderColor: checked ? Color.BLUE_500 : Color.GREY_500 },
          { backgroundColor: checked ? Color.BLUE_500 : Color.WHITE },
        ]}
      >
        {checked && <CustomIcon style={styles.iconStyle} name="check" />}
      </View>
    </TouchableOpacity>
  );
};

CustomCheckBox.propTypes = {
  style: ViewPropTypes.style,
  //   onPress: PropTypes.func,
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
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    color: Color.GREY_500,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
    paddingLeft: 8,
  },
  children: {
    paddingLeft: 8,
  },
  iconStyle: {
    fontSize: Font.SIZE_12,
    color: Color.WHITE,
  },
});

export default CustomCheckBox;
