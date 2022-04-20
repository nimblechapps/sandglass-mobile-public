import { StyleSheet } from "react-native";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.GREY_100,
  },
  group: {
    marginBottom: 8,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  logoutBox: {
    paddingHorizontal: 17,
    paddingVertical: 14,
    backgroundColor: Color.WHITE,
  },
  logoutTitle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    color: Color.RED_200,
  },
  modalTitleStyle: {
    alignSelf: "center",
  },
  modalTxtStyle: {
    alignSelf: "center",
    textAlign: "center",
  },
});

export default styles;
