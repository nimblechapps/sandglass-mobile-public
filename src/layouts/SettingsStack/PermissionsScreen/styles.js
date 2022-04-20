import { StyleSheet, Platform } from "react-native";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleStyle: {
    textTransform: "capitalize",
    fontSize: Font.SIZE_17,
  },
  liveView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Color.GREY_200,
    paddingVertical: 10,
  },
  locationAccessStyle: {
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_14,
    color: Color.GREY_700,
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
    marginLeft: 4,
  },
});

export default styles;
