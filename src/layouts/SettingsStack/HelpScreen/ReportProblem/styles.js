import { StyleSheet } from "react-native";
import { Color, Font } from "../../../../utils/theme";

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    // backgroundColor: Color.GREY_100,
    width: "100%",
    padding: 16,
  },
  titleStyle: {
    textTransform: "capitalize",
    fontSize: Font.SIZE_17,
  },
  sendButton: {
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
});

export default styles;
