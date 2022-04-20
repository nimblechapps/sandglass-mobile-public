import React from "react";
import { TouchableOpacity, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import CustomIcon from "../CustomIcon";

const IconButton = (props) => {
  const { style, disabled, onPress, iconName, iconStyle } = props;

  return (
    <TouchableOpacity style={style} disabled={disabled} onPress={onPress}>
      <CustomIcon disabled={true} name={iconName} style={iconStyle} />
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  style: ViewPropTypes.style,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,

  iconName: PropTypes.string,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default IconButton;
