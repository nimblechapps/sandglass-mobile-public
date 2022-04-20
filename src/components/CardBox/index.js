import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";
import { Color, Font } from "../../utils/theme";
import CustomIcon from "../CustomIcon";
import Label from "../Label";
import { useTranslation } from "react-i18next";

function CardBox(props) {
  let { CardBoxStyle, title, date, time, location, distance, onPress } = props;
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={[styles.CardBox, CardBoxStyle]} onPress={onPress}>
      <View style={styles.activityInfo}>
        <View style={styles.leftPart}>
          <CustomIcon name="Outrigger-canoe-paddle" style={styles.leftIcon} />
        </View>
        <View style={styles.rightPart}>
          <View style={styles.titleBar}>
            <Label style={styles.title}>{title}</Label>
          </View>
          <View style={styles.dateLocation}>
            <Label style={styles.date}>{date ? date : "-"}</Label>
            <View style={styles.dotIcon}></View>
            <Label style={styles.location}>{location ? location : "-"}</Label>
          </View>
          <View style={styles.inlineData}>
            <View style={styles.inlineBox}>
              <View style={styles.distance}>
                <Label style={styles.distanceValue}>
                  {distance ? distance : "00"}
                </Label>
                <Label style={styles.superText}>{t("km")}</Label>
              </View>
              <Label style={styles.subTitle}>{t("distance")}</Label>
            </View>
            <View style={styles.inlineBox}>
              <Label style={styles.timeValue}>{time ? time : "00:00:00"}</Label>
              <Label style={styles.subTitle}>{t("time")}</Label>
            </View>
          </View>
        </View>
      </View>
      <View>
        <CustomIcon name="chevron-right" style={styles.iconStyle} />
      </View>
    </TouchableOpacity>
  );
}

CardBox.propTypes = {
  CardBoxStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  title: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  distance: PropTypes.string,
};

const styles = StyleSheet.create({
  CardBox: {
    padding: 16,
    marginBottom: 8,
    width: "100%",
    backgroundColor: Color.WHITE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 8,
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
        elevation: 6,
      },
    }),
  },
  activityInfo: {
    flexDirection: "row",
  },
  leftPart: {
    marginRight: 16,
  },
  leftIcon: {
    fontSize: Font.SIZE_24,
    color: Color.BLUE_200,
  },
  rightPart: {},
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_16,
    lineHeight: 22,
    color: Color.GREY_900,
  },
  dateLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  date: {
    fontFamily: Font.SFPROTEXTREGULAR,
    color: Color.GREY_600,
  },
  dotIcon: {
    marginLeft: 6,
    marginRight: 6,
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: Color.GREY_600,
  },
  location: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    color: Color.GREY_600,
  },
  inlineData: {
    flexDirection: "row",
    margin: 0,
  },
  inlineBox: {
    borderLeftColor: Color.GREY_200,
    borderLeftWidth: 1,
    paddingLeft: 8,
    paddingRight: 25,
  },
  subTitle: {
    fontFamily: Font.SFPROTEXTREGULAR,
    fontSize: Font.SIZE_10,
    lineHeight: 14,
  },
  distance: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  distanceValue: {
    fontFamily: Font.SFPROTEXTBOLD,
    fontSize: Font.SIZE_16,
    lineHeight: 22,
    color: Color.GREY_900,
    marginRight: 2,
    marginBottom: 2,
  },
  superText: {
    fontFamily: Font.SFPROTEXTSEMIBOLD,
    fontSize: Font.SIZE_12,
    lineHeight: 16,
    color: Color.GREY_900,
  },
  timeValue: {
    fontFamily: Font.SFPROTEXTBOLD,
    fontSize: Font.SIZE_16,
    lineHeight: 22,
    color: Color.GREY_900,
    marginBottom: 2,
  },
  iconStyle: {
    fontSize: Font.SIZE_16,
    color: Color.BLUE_500,
  },
});

export default CardBox;
