import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import CustomIcon from "../CustomIcon";
import Label from "../Label";
import { Color, Font } from "../../utils/theme";

const HeaderRight = ({ actions }) => {
  const renderAction = (obj, key) => (
    <TouchableOpacity
      key={key}
      style={styles.buttonStyle}
      disabled={obj.disabled}
      onPress={obj.onPress}
    >
      {obj.iconName || !obj.buttonTitle ? (
        <CustomIcon
          name={obj.iconName}
          style={[styles.iconStyle, obj.iconStyle]}
        />
      ) : (
        <Label style={[styles.titleStyle, obj.titleStyle]}>
          {obj.buttonTitle}
        </Label>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {actions &&
        (Array.isArray(actions)
          ? actions.map((action, i) => renderAction(action, i))
          : renderAction(actions))}
    </View>
  );
};

HeaderRight.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonStyle: {
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  iconStyle: {
    fontSize: Font.SIZE_18,
    color: Color.BLUE_500,
    padding: 3
  },
  titleStyle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_14,
    padding: 3
  },
});

export default HeaderRight;
