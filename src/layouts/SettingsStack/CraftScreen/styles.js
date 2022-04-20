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
  craftBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: Color.GREY_200,
    borderBottomWidth: 1,
  },
  group: {
    marginBottom: 8,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
  },
  iconStyle: {
    fontSize: Font.SIZE_16,
    color: Color.BLUE_500,
  },
  craftType: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
    color: Color.GREY_700,
    marginBottom: 2,
  },
  craftModel: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_10,
    lineHeight: 14,
    color: Color.GREY_600,
  },
  ButtonContainer: {
    alignItems: "center",
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
});

export default styles;
