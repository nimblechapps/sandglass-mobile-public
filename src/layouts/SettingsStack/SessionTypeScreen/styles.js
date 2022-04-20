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
  sessionGroup: {
    paddingHorizontal: 16,
    backgroundColor: Color.WHITE,
  },
  ButtonContainer: {
    alignItems: "center",
  },
  sessionTypeMain: {
    borderBottomColor: Color.GREY_200,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  sessionType: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_14,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Color.GREY_100,
    borderColor: Color.BLUE_500,

    borderRadius: 16,
    borderWidth: 1,
  },
  addButtonText: {
    color: Color.GREY_700,
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_12,
    lineHeight: 16,
  },
  leftIcon: {
    fontSize: Font.SIZE_16,
    marginRight: 4,
    color: Color.BLUE_500,
  },
  modalView: {
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
    borderTopColor: "#3c3c434a",
    borderTopWidth: 1,
    width: "100%",
  },
  actionButton: {
    borderRadius: 0,
    width: "50%",
    backgroundColor: "#f2f2f2cc",
    borderRightColor: "#3c3c434a",
    borderRightWidth: 1,
  },
  modelButtonTitle: {
    color: Color.BLUE,
  },
});

export default styles;
