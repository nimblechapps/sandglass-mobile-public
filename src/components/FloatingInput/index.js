import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ViewPropTypes,
  Animated,
} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Label from "../Label";
import CustomIcon from "../CustomIcon";
import IconButton from "../IconButton";
import { Color, Font } from "../../utils/theme";

const FloatingInput = (props) => {
  const {
    inputContainerMainStyle,
    inputContainerStyle,
    inputStyle,
    placeholder,
    value,
    editable,
    secureTextEntry,
    autoCorrect,
    autoCapitalize,
    multiline,
    textAlignVertical,
    textAlign,
    numberOfLines,
    maxLength,
    keyboardType,
    returnKeyType,
    onChangeText,
    onSubmitEditing,
    inputAccessoryViewID,
    onFocus,
    isAutoFocus,
  } = props;
  const { onPressIcon, disabledIcon, iconName } = props;
  const { errorMessage } = props;

  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(
    new Animated.Value(value === "" ? 0 : 1)
  ).current;
  const filedRef = useRef(null);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || !_.isEmpty(value) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  useEffect(() => {
    if (isAutoFocus) {
      handleFocus();
    }
  }, [isAutoFocus]);

  const handleFocus = () => {
    setIsFocused(true);
    filedRef.current.focus();
    props.onFocus && props.onFocus;
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelStyle = {
    position: "absolute",
    left: 0,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        Color.GREY_600,
        !_.isEmpty(errorMessage) ? Color.RED_200 : Color.GREY_500,
      ],
    }),
  };

  return (
    <View style={[styles.inputContainerMain, inputContainerMainStyle]}>
      <View
        style={[
          styles.textInputContainer,
          {
            borderBottomColor: isFocused
              ? !_.isEmpty(errorMessage)
                ? Color.RED_200
                : Color.GREY_700
              : Color.GREY_200,
          },
          inputContainerStyle,
        ]}
      >
        <TextInput
          style={[
            styles.textInput,
            { paddingRight: !_.isEmpty(errorMessage) ? 20 : 0 },
            inputStyle,
          ]}
          value={value}
          editable={editable}
          secureTextEntry={secureTextEntry}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={textAlignVertical}
          textAlign={textAlign}
          maxLength={maxLength}
          keyboardType={keyboardType}
          returnKeyType={keyboardType == "number-pad" ? "done" : returnKeyType}
          onChangeText={(value) => {
            value = value.trimStart();
            onChangeText(value);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          inputAccessoryViewID={inputAccessoryViewID}
          ref={filedRef}
          // ref={reference}
          blurOnSubmit
        />
        <View style={styles.errorIconView}>
          {iconName && (
            <IconButton
              style={styles.iconButtonStyle}
              onPress={onPressIcon}
              disabled={disabledIcon}
              iconName={iconName}
              iconStyle={styles.iconStyle}
            />
          )}
          {!_.isEmpty(errorMessage) && (
            <CustomIcon
              disabled={true}
              name="exclamation-mark"
              style={styles.exclamationIconStyle}
            />
          )}
        </View>
      </View>
      <Animated.Text onPress={handleFocus} style={labelStyle}>
        {placeholder}
      </Animated.Text>
      {errorMessage.length > 0 &&
        JSON.parse(errorMessage).map((item, index) => (
          <View key={index.toString()} style={styles.errorView}>
            <Label
              style={
                item.valid ? styles.succsesTextStyle : styles.errorTextStyle
              }
            >
              {item.title}
            </Label>
          </View>
        ))}
    </View>
  );
};

FloatingInput.defaultProps = {
  editable: true,
  secureTextEntry: false,
  autoCorrect: false,
  autoCapitalize: "none",
  multiline: false,
  textAlignVertical: "center",
  disabledIcon: true,
  errorMessage: "",
};

FloatingInput.propTypes = {
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.string,
  editable: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  textAlign: PropTypes.string,
  numberOfLines: PropTypes.number,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  inputAccessoryViewID: PropTypes.string,
  errorMessage: PropTypes.string,
  onPressIcon: PropTypes.func,
  disabledIcon: PropTypes.bool,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconName: PropTypes.string,
};

const styles = StyleSheet.create({
  inputContainerMain: {
    position: "relative",
    marginBottom: 16,
  },
  textInputContainer: {
    borderBottomWidth: 1,
    backgroundColor: Color.WHITE,
    height: 48,
  },
  textInput: {
    flex: 1,
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    color: Color.GREY_700,
    padding: 0,
    paddingTop: 10,
  },
  errorIconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    right: 0,
    top: "50%",
    marginTop: -8,
  },
  iconButtonStyle: {
    marginRight: 10,
  },
  iconStyle: {
    padding: 5,
    fontSize: Font.SIZE_16,
    color: Color.GREY_500,
  },
  exclamationIconStyle: {
    marginRight: 10,
    fontSize: Font.SIZE_16,
    color: Color.RED_200,
  },
  errorView: {
    width: "100%",
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  succsesTextStyle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_12,
    color: Color.GREEN_200,
  },
  errorTextStyle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_12,
    color: Color.RED_200,
  },
});

export default FloatingInput;
