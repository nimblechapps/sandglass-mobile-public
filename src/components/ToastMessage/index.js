import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CommonAction } from "../../state/ducks/common";
import { isIOS, screenWidth } from "../../utils/globals";
import { Color, Font } from "../../utils/theme";
import { Toast } from "../../utils/variable";
import CustomIcon from "../CustomIcon";
import Label from "../Label";

const ToastMessage = () => {
  const dispatch = useDispatch();

  const visible = useSelector((state) => state.common.visible);
  const message = useSelector((state) => state.common.message);
  const success = useSelector((state) => state.common.success);

  useEffect(() => {
    if (visible) {
      const timeOutSec = success ? 2000 : 3000;
      setTimeout(() => {
        dispatch(CommonAction.hideToast());
      }, timeOutSec);
    }
  }, [visible]);

  return (
    <>
      {visible && (
        <View style={styles.mainView}>
          <View style={styles.containerinfo}>
            <CustomIcon
              name={
                success
                  ? "check"
                  : "exclamation-mark"
              }
              style={[
                styles.iconStyle,
                {
                  color:
                    success
                      ? Color.GREEN_200 : Color.RED_200
                },
              ]}
            />
            <Label
              style={[
                styles.message,
                {
                  color: Color.GREY_900,
                },
              ]}
            >
              {message}
            </Label>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: isIOS() ? 50 : 30,
    left: 0,
    zIndex: 1,
  },
  containerinfo: {
    width: screenWidth - 90,
    backgroundColor: Color.WHITE,
    ...Platform.select({
      ios: {
        shadowColor: "#003362",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      },
      android: {
        elevation: 3,
      },
    }),
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconStyle: {
    fontSize: Font.SIZE_22,
    alignSelf: "center",
  },
  message: {
    marginTop: 10,
    textAlign: "center",
    fontSize: Font.SIZE_14,
    fontFamily: Font.SFPROTEXTMEDIUM,
  },
});

export default ToastMessage;
