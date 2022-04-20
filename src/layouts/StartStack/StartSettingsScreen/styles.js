import { Platform, StyleSheet } from "react-native";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Color.GREY_100,
  },
  back: {
    backgroundColor: Color.WHITE,
    paddingHorizontal: 16,
  },
  liveViewBorder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Color.GREY_200,
  },
  liveView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWithText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 16,
  },
  iconStyle: {
    color: Color.BLUE_200,
    fontSize: Font.SIZE_18,
    marginRight: 8,
  },
  rightIconStyle: {
    color: Color.BLUE_500,
    fontSize: Font.SIZE_18,
    marginLeft: 8,
  },
  iconTextStyle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    color: Color.GREY_700,
  },
  rightTextStyle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    color: Color.GREY_600,
  },
  texWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  switch: {
    ...Platform.select({
      ios: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
      },
      android: {
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
      },
    })
  },
  switchTextStyle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_12,
    color: Color.GREY_600,
    textTransform: "uppercase",
    marginLeft: 10
  },
  clickView: {
    padding: 16,
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
