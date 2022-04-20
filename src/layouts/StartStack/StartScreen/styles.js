import { Platform, StyleSheet } from "react-native";
import { screenWidth } from "../../../utils/globals";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gpsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  gpsTitle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_12,
    color: Color.GREY_700,
    marginRight: 4,
    top: 2,
  },
  signleStrenth: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  signleArrow: {
    marginHorizontal: 1,
    borderRadius: 6,
    height: 4,
    width: 3,
  },
  userNameMain: {
    width: 250,
    alignSelf: "center",
    marginTop: 32,
  },
  userName: {
    textAlign: "center",
    fontFamily: Font.SFPROTEXTBOLD,
    fontSize: Font.SIZE_32,
    color: Color.GREY_900,
  },
  startButton: {
    alignSelf: "center",
    borderRadius: 72,
    width: 144,
    height: 144,
    borderWidth: 8,
    borderColor: Color.BLUE_100,
    fontFamily: Font.SFPROTEXTBOLD,
    fontSize: Font.SIZE_18,
  },
  titleStyle: {
    fontFamily: Font.SFPROTEXTBOLD,
    fontSize: Font.SIZE_18,
    color: Color.WHITE,
  },
  buttonWithSetting: {
    marginTop: "auto",
    paddingBottom: 24,
  },
  settingBack: {
    alignSelf: "center",
    marginTop: 32,
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.WHITE,
    ...Platform.select({
      ios: {
        shadowColor: "#003362",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconStyle: {
    fontSize: Font.SIZE_24,
    color: Color.BLUE_500,
  },
  modalBack: {
    flex: 1,
    backgroundColor: Color.BLACK,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelTextStyle: {
    position: "absolute",
    bottom: 60,
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_14,
    color: Color.WHITE,
    alignSelf: "center",
    padding: 3,
  },
  contentAlign: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    flexDirection: "column",
  },
  cancelText: {
    alignSelf: "flex-end",
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    color: Color.BLUE_500,
    marginBottom: 30,
  },
});

export default styles;
