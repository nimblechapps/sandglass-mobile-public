import { StyleSheet } from "react-native";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: Color.GREY_100,
  },
  Title: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_24,
  },
  ActivityList: {
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  monthTitle: {
    marginBottom: 8,
    marginTop: 24,
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_18,
    lineHeight: 26,
  },
  DropDownArea: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Color.WHITE,
    flexDirection: "row",
  },
  buttonCustomStyle: {
    backgroundColor: Color.RED_100,
  },
  modalView: {
    marginTop: "auto",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Color.WHITE,
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
    marginBottom: 20,
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
    fontSize: Font.SIZE_18,
    color: Color.BLUE_500,
  },
  segmentedControlTabStyle: {
    paddingHorizontal: 16,
  },
  segmentedControlTabStyleBack: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: Color.GREY_200,
    borderRadius: 18,
  },
  tabsContainerStyle: {
    height: 32,
  },
  firstTabStyle: {
    borderRightWidth: 0,
  },
  tabStyle: {
    borderRadius: 16,
    borderWidth: 0,
    backgroundColor: Color.TRANSPARENT,
  },
  tabTextStyle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_12,
    color: Color.GREY_700,
    borderWidth: 0,
  },
  activeTabStyle: {
    borderWidth: 0,
    backgroundColor: Color.WHITE,
    ...Platform.select({
      ios: {
        shadowColor: "#003362",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  activeTabTextStyle: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_12,
    color: Color.BLUE_500,
  },
  applyButton: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  ApplyButtonTitle: {
    textTransform: "uppercase",
    color: Color.GREY_700,
  },
  customButtonStyle: {
    backgroundColor: Color.WHITE,
    borderColor: Color.BLUE_300,
    borderWidth: 1,
  },
});

export default styles;
