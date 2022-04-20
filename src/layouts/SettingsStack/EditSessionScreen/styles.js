import { StyleSheet } from "react-native";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: Color.GREY_100,
  },
  titleStyle: {
    textTransform: "capitalize",
    fontSize: Font.SIZE_17,
  },
  group: {
    marginBottom: 8,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  sessionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: Color.GREY_200,
  },
  sessionType: {
    paddingLeft: 8,
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
    color: Color.GREY_700,
  },
  iconSession: {
    flexDirection: "row",
    alignItems: "center",
  },
  removeIconStyle: {
    color: Color.RED_200,
    fontSize: Font.SIZE_16,
  },
  removeText: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_12,
    lineHeight: 16,
    color: Color.GREY_700,
  },
  alertModalView: {
    width: 270,
    borderRadius: 14,
    backgroundColor: "#f2f2f2cc",
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
  alertInfo: {
    backgroundColor: "#f2f2f2cc",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  alertTitle: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_17,
    lineHeight: 22,
    color: Color.BLACK,
    textAlign: "center",
  },
  alertSubtitle: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    marginTop: 2,
    fontSize: Font.SIZE_12,
    lineHeight: 18,
    color: Color.BLACK,
    textAlign: "center",
    marginBottom: 16,
  },
  textInput: {
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: Color.WHITE,
    fontSize: Font.SIZE_14,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#3c3c434d",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderTopColor: "#3c3c434a",
    borderTopWidth: 1,
    width: "100%",
  },
  actionButton: {
    borderRadius: 0,
    width: "50%",
    backgroundColor: "#f2f2f2cc",
    marginRight: 0,
    marginLeft: 0,
    color: Color.BLUE,
    borderRightColor: "#3c3c434a",
    borderRightWidth: 1,
  },
  modelButtonTitle: {
    color: Color.BLUE,
  },
});

export default styles;
