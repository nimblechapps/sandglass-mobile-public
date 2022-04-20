import { StyleSheet } from "react-native";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.GREY_100,
    width: "100%",
    paddingBottom: 8,
  },
  Title: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_24,
  },
  userInfo: {
    paddingVertical: 24,
    paddingHorizontal: 40,
    backgroundColor: Color.WHITE,
    marginBottom: 8,
  },
  profileMain: {
    justifyContent: "center",
    alignItems: "center",
  },
  captureImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Color.ALABASTER,
  },
  noImage: {
    display: "flex",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Color.GREY_800,
    justifyContent: "center",
    alignSelf: "center",
  },
  noImageText: {
    color: Color.WHITE,
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_36,
  },
  userName: {
    marginTop: 16,
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_18,
    lineHeight: 26,
    color: Color.GREY_900,
    textAlign: "center",
    marginBottom: 23,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    width: "33.33%",
    borderRightColor: Color.GREY_200,
    borderRightWidth: 1,
  },
  value: {
    fontFamily: Font.SFPROTEXTBOLD,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
    color: Color.GREY_900,
    marginBottom: 2,
  },
  subTitle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_10,
    lineHeight: 12,
  },
  supValue: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_10,
    lineHeight: 14,
    color: Color.GREY_900,
    marginLeft: 2,
  },

  chartSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: Color.WHITE,
    width: "100%",
  },
  segmentedControlTabStyleBack: {
    width: "100%",
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
    borderRadius: 14,
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
  chartContainer: {
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomColor: Color.GREY_200,
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "column",
  },
  chartValue: {
    fontFamily: Font.SFPROTEXTBOLD,
    fontSize: Font.SIZE_22,
    lineHeight: 28,
    color: Color.GREY_900,
  },
  chartSupValue: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_16,
    lineHeight: 22,
    marginLeft: 4,
  },
  chart: {
    width: "100%",
    height: 120,
  },
  chartStyle: {
    width: "100%",
    backgroundColor: Color.BLUE_200,
  },
  locationGroup: {
    paddingHorizontal: 16,
  },
  infoBox: {
    backgroundColor: Color.WHITE,
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  rowData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Color.GREY_200,
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  locationTitle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_12,
    lineHeight: 16,
    color: Color.GREY_700,
  },
  sessionTitle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_12,
    lineHeight: 16,
    color: Color.BLUE_500,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: 8,
    fontSize: 24,
    color: Color.BLUE_200,
  },
  infoBoxTitle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    lineHeight: 20,
    color: Color.GREY_700,
  },
});

export default styles;
