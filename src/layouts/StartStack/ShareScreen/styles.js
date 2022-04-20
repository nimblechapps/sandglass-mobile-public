import { Platform, StyleSheet } from "react-native";
import { screenWidth } from "../../../utils/globals";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    backgroundColor: Color.BLACK,
    // paddingVertical: 100
  },
  tabContainer: {
    width: 166,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.GREY_800,
    borderRadius: 16,
    paddingVertical: 1,
    paddingHorizontal: 4,
    height: 32,
  },
  segmentedControlTabStyleBack: {
    width: 80,
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: Color.GREY_800,
    borderRadius: 16,
  },
  tabsContainerStyle: {
    // height: 32,
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
    color: Color.GREY_300,
    borderWidth: 0,
  },
  activeTabStyle: {
    borderWidth: 0,
    backgroundColor: Color.GREY_900,
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
  topGradient: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    zIndex: 1
  },
  addressView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  locationText: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_18,
    color: Color.WHITE,
  },
  timeAddress: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_10,
    color: Color.WHITE,
    marginTop: 8,
  },
  mapContainer: {
    flex: 1,
    width: "100%",
  },
  sourceCircleMarker: {
    backgroundColor: Color.RED_100,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    width: 32,
    borderRadius: 16,
    borderColor: Color.WHITE,
    borderWidth: 4,
  },
  destinatonCircleMarker: {
    backgroundColor: Color.GREEN_100,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    width: 32,
    borderRadius: 16,
    borderColor: Color.WHITE,
    borderWidth: 4,
  },
  circleMarker: {
    backgroundColor: Color.BLUE,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    width: 32,
    borderRadius: 16,
    borderColor: Color.WHITE,
    borderWidth: 4,
  },
  tagListContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  tagContainer: {
    position: "relative",
    top: -5,
    width: "auto",
    borderRadius: 12,
    backgroundColor: Color.GREY_200,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    position: "relative",
    top: -1,
  },
  bottomGradientMain: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%'
  },
  detailsPart: {
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  detailConten: {
    marginTop: 16,
    width: "32%",
    borderLeftWidth: 1,
    borderLeftColor: Color.GREY_200,
    paddingHorizontal: 8,
  },
  textAlign: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  numberText: {
    fontFamily: Font.SFPROTEXTBOLD,
    fontSize: Font.SIZE_16,
    color: Color.WHITE,
  },
  subText: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_12,
    color: Color.WHITE,
    marginLeft: 5,
  },
  LineGradient: {
    width: screenWidth - 40,
    height: 5,
    alignSelf: 'center',
  },
  blackView: {
    backgroundColor: Color.BLACK,
    height: 34
  },
  MarkerText: {
    position: "relative",
    top: -1,
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    color: Color.WHITE,
  },
});

export default styles;
