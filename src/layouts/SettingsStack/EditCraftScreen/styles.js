import { StyleSheet } from "react-native";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "column",
    paddingBottom: 59,
  },
  textStyles: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_16,
    color: Color.GREY_600,
    lineHeight: 20,
    marginBottom: 24,
  },
  cancelTitle: {
    paddingHorizontal: 14,
    paddingVertical: 2,
    color: Color.GREY_700,
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
  },
  craftRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomColor: Color.GREY_200,
    borderBottomWidth: 1,
  },
  inlineDataIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
    color: Color.GREY_700,
  },
  value: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
    color: Color.GREY_600,
  },
  rightIconStyle: {
    marginLeft: 8,
    color: Color.BLUE_500,
    fontSize: Font.SIZE_16,
  },
  modalView: {
    marginTop: "auto",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Color.WHITE,
    ...Platform.select({
      ios: {
        shadowColor: "#111111",
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
  },
  line: {
    marginVertical: 8,
    width: 92,
    height: 4,
    borderRadius: 2,
    backgroundColor: Color.GREY_300,
    alignSelf: "center",
  },
  delayStartText: {
    marginTop: 4,
    paddingHorizontal: 16,
    marginBottom: 29,
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_18,
    color: Color.GREY_700,
  },
  listText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: Color.GREY_200,
  },
  itemText: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
  },
  checkIconStyle: {
    fontSize: Font.SIZE_24,
    color: Color.BLUE_500,
  },
  deleteButton: {
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
    // color: Color.WHITE,
    color: Color.RED_300,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    // backgroundColor: Color.RED_300,
    borderColor: Color.RED_300,
    borderWidth: 1,
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
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginBottom: 20,
    marginTop: 16,
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
