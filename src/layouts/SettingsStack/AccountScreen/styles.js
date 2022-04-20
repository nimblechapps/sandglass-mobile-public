import { StyleSheet } from "react-native";
import { Color, Font } from "../../../utils/theme";

const styles = StyleSheet.create({
  Main: {
    paddingHorizontal: 16,
    flex: 1,
    width: "100%",
    paddingVertical: 24,
  },
  profileMain: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
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
    backgroundColor: Color.GREY_600,
    justifyContent: "center",
    alignSelf: "center",
  },
  noImageText: {
    color: Color.WHITE,
    fontFamily: Font.SFPROTEXTMEDIUM,
    fontSize: Font.SIZE_36,
  },
  editbutton: {
    backgroundColor: Color.WHITE,
    position: "absolute",
    padding: 8,
    borderRadius: 20,
    bottom: 0,
    right: 0,
  },
  editPhoto: {
    paddingTop: 10,
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_12,
    lineHeight: 16,
    color: Color.GREY_700,
  },
});

export default styles;
