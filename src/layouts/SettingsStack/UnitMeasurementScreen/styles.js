import { StyleSheet } from "react-native";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: 16,
  },
  main: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Color.GREY_200,
  },
  distanceStyle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    color: Color.GREY_700,
  },
  segmentedControlTabStyleBack: {
    width: 202,
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
        shadowOpacity: 0.06,
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
});

export default styles;
