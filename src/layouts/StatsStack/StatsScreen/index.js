import React, { useLayoutEffect, useState } from "react";
import { View, Text, processColor, ScrollView, TouchableOpacity, } from "react-native";
import { useTranslation } from "react-i18next";
import HeaderTitle from "../../../components/HeaderTitle";
import Label from "../../../components/Label";
import SegmentedControlTab from "react-native-segmented-control-tab";
import styles from "./styles";
import { BarChart } from "react-native-charts-wrapper";
import { Color, Font } from "../../../utils/theme";
import { FlatList } from "react-native-gesture-handler";
import CustomIcon from "../../../components/CustomIcon";
import Routes from "../../../navigation/Routes";

const StatsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigate } = navigation;
  const [userPic, setUserPic] = useState({ uri: "", type: "", name: "" });
  const [option, setOption] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerTitle: () => <HeaderTitle title={t("stats")} />,
    });
  }, [navigation]);

  const weekChart = {
    legend: {
      enabled: false,
    },
    data: {
      dataSets: [
        {
          values: [
            { y: 100 },
            { y: 105 },
            { y: 102 },
            { y: 110 },
            { y: 114 },
            { y: 109 },
            { y: 105 },
          ],
          config: {
            color: processColor(Color.BLUE_300),
            barShadowColor: 0,
            holeRadius: 10,
            highlightAlpha: 90,
            drawValues: false,
          },
        },
      ],

      config: {
        barWidth: 0.2,
      },
    },
    xAxis: {
      valueFormatter: ["M", "T", "W", "T", "F", "S", "S"],
      granularityEnabled: true,
      granularity: 1,
      position: "BOTTOM",
      drawGridBackground: false,
      drawGridLines: false,
      drawAxisLine: false,
      textColor: processColor(Color.GREY_400),
    },
    yAxis: {
      granularityEnabled: true,
      granularity: 1,
      drawAxisLine: false,
      drawGridLines: false,
      left: {
        enabled: true,
        textColor: processColor(Color.GREY_400),
        gridColor: processColor(Color.GREY_100),
        drawGridLines: true,
        drawAxisLine: false,
      },
      right: {
        enabled: false,
      },
    },
  };

  const distanceChart = {
    legend: {
      enabled: false,
    },
    data: {
      dataSets: [
        {
          values: [
            { y: 18 },
            { y: 22 },
            { y: 20 },
            { y: 17 },
            { y: 15 },
            { y: 18 },
            { y: 21 },
            { y: 18 },
            { y: 22 },
            { y: 20 },
            { y: 17 },
            { y: 15 },
            { y: 18 },
            { y: 21 },
            { y: 18 },
            { y: 22 },
            { y: 20 },
            { y: 17 },
            { y: 15 },
            { y: 18 },
            { y: 21 },
            { y: 18 },
            { y: 22 },
            { y: 20 },
            { y: 17 },
            { y: 15 },
            { y: 18 },
            { y: 21 },
            { y: 18 },
            { y: 22 },
            { y: 17 },
            { y: 15 },
          ],
          config: {
            color: processColor(Color.BLUE_300),
            barShadowColor: 0,
            holeRadius: 10,
            highlightAlpha: 90,
            drawValues: false,
          },
        },
      ],

      config: {
        barWidth: 0.3,
      },
    },
    xAxis: {
      valueFormatter: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
      ],
      granularityEnabled: false,
      granularity: 5,
      position: "BOTTOM",
      drawGridBackground: false,
      drawGridLines: false,
      drawAxisLine: false,
      labelCount: 7,
      // labelCountForce: true,
      textColor: processColor(Color.GREY_400),
    },
    yAxis: {
      granularityEnabled: true,
      granularity: 1,
      drawAxisLine: false,
      drawGridLines: false,

      left: {
        enabled: true,
        textColor: processColor(Color.GREY_400),
        axisMinimum: 0,
        axisMaximum: 30,
        gridColor: processColor(Color.GREY_100),
        drawGridLines: true,
        drawAxisLine: false,
      },
      right: {
        enabled: false,
      },
    },
  };

  const speedChart = {
    legend: {
      enabled: false,
    },
    data: {
      dataSets: [
        {
          values: [
            { y: 18 },
            { y: 22 },
            { y: 20 },
            { y: 17 },
            { y: 15 },
            { y: 18 },
            { y: 21 },
            { y: 18 },
            { y: 22 },
            { y: 20 },
            { y: 22 },
            { y: 20 },
          ],
          config: {
            color: processColor(Color.BLUE_300),
            barShadowColor: 0,
            holeRadius: 10,
            highlightAlpha: 90,
            drawValues: false,
          },
        },
      ],

      config: {
        barWidth: 0.2,
      },
    },
    xAxis: {
      valueFormatter: [
        "J",
        "F",
        "M",
        "A",
        "M",
        "J",
        "J",
        "A",
        "S",
        "O",
        "N",
        "D",
      ],
      granularityEnabled: true,
      granularity: 1,
      position: "BOTTOM",
      drawGridBackground: false,
      drawGridLines: false,
      drawAxisLine: false,
      labelCount: 12,
      textColor: processColor(Color.GREY_400),
    },
    yAxis: {
      granularityEnabled: true,
      granularity: 1,
      drawAxisLine: false,
      drawGridLines: false,

      left: {
        enabled: true,
        textColor: processColor(Color.GREY_400),
        axisMinimum: 0,
        axisMaximum: 30,
        gridColor: processColor(Color.GREY_100),
        drawGridLines: true,
        drawAxisLine: false,
      },
      right: {
        enabled: false,
      },
    },
  };

  const locationSession = [
    { location: "Rose Bay, NSW", session: "30" },
    { location: "Gunnamatta Bay, NSW", session: "5" },
    { location: "Bondi Beach, NSW", session: "3" },
    { location: "Kurnell Beach, NSW", session: "1" },
  ];

  const craftSession = [
    { craft: "Ares Pro, Outrigger Canoe", session: "30" },
    { craft: "V8, Surf Ski", session: "5" },
    { craft: "V12, Surf Ski", session: "3" },
    { craft: "Atlantis, SUP", session: "1" },
  ];

  const renderLocationSession = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.rowData,
          { borderBottomWidth: locationSession.length === index + 1 ? 0 : 1 },
        ]}
        onPress={() => {
          navigate(Routes.ActivityList),
          {
            sessionsDetails: true,
          };
        }}
      >
        <Label style={styles.locationTitle}>{item.location}</Label>
        <Label style={styles.sessionTitle}>{item.session}</Label>
      </TouchableOpacity>
    );
  };

  const renderCraftSession = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.rowData,
          { borderBottomWidth: craftSession.length === index + 1 ? 0 : 1 },
        ]}
      >
        <Label style={styles.locationTitle}>{item.craft}</Label>
        <Label style={styles.sessionTitle}>{item.session}</Label>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.Main}>
          <View style={styles.userInfo}>
            <View style={styles.profileMain}>
              <View style={styles.image_row}>
                {userPic.uri ? (
                  <ProgressiveImage
                    source={{ uri: userPic.uri }}
                    style={styles.captureImg}
                  />
                ) : (
                  <View style={styles.noImage}>
                    <Label style={styles.noImageText}>J</Label>
                  </View>
                )}
              </View>
              <View>
                <Label style={styles.userName}>Joseph Flatman</Label>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Label style={styles.value}>120</Label>
                  <Label style={styles.subTitle}>{t("totalSessions")}</Label>
                </View>
                <View style={styles.column}>
                  <View style={[styles.row, { alignItems: "flex-start" }]}>
                    <Label style={styles.value}>1,340</Label>
                    <Label style={styles.supValue}>{t("km")}</Label>
                  </View>
                  <Label style={styles.subTitle}>{t("totalDistance")}</Label>
                </View>
                <View style={[styles.column, { borderRightWidth: 0 }]}>
                  <View style={[styles.row, { alignItems: "flex-start" }]}>
                    <Label style={styles.value}>10.24</Label>
                    <Label style={styles.supValue}>{t("kmPerH")}</Label>
                  </View>
                  <Label style={styles.subTitle}>{t("avgSpeed")}</Label>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.chartSection}>
            <View style={styles.segmentedControlTabStyleBack}>
              <SegmentedControlTab
                tabsContainerStyle={styles.tabsContainerStyle}
                firstTabStyle={styles.firstTabStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
                selectedIndex={option}
                allowFontScaling={false}
                borderRadius={16}
                values={[t("w"), t("m"), t("y")]}
                onTabPress={(index) => {
                  setOption(index);
                }}
              />
            </View>
            <View style={styles.chartContainer}>
              <Label style={styles.chartValue}>01:29:32</Label>
              <Label>{t("time")}</Label>
              <BarChart
                style={styles.chart}
                data={weekChart.data}
                xAxis={weekChart.xAxis}
                yAxis={weekChart.yAxis}
                chartDescription={{ text: "" }}
                legend={weekChart.legend}
                animation={{ durationX: 2000 }}
                drawHighlightArrow={false}
                touchEnabled={false}
                drawBarShadow={true}
                scaleEnabled={false}
                isDrawRoundedBarEnabled={true}
                doubleTapToZoomEnabled={false}
                marker={{
                  enabled: false,
                }}
                highlightPerTapEnabled={false}
              />
            </View>

            <View style={styles.chartContainer}>
              <View style={[styles.row, { alignItems: "flex-start" }]}>
                <Label style={styles.chartValue}>68.2</Label>
                <Label style={styles.chartSupValue}>{t("km")}</Label>
              </View>
              <Label>{t("distance")}</Label>

              <BarChart
                style={styles.chart}
                data={distanceChart.data}
                xAxis={distanceChart.xAxis}
                yAxis={distanceChart.yAxis}
                chartDescription={{ text: "" }}
                legend={distanceChart.legend}
                animation={{ durationX: 2000 }}
                drawHighlightArrow={false}
                touchEnabled={false}
                drawBarShadow={true}
                scaleEnabled={false}
                isDrawRoundedBarEnabled={true}
                doubleTapToZoomEnabled={false}
                marker={{
                  enabled: false,
                }}
                highlightPerTapEnabled={false}
              />
            </View>

            <View style={styles.chartContainer}>
              <View style={[styles.row, { alignItems: "flex-start" }]}>
                <Label style={styles.chartValue}>9.28</Label>
                <Label style={styles.chartSupValue}>{t("kmPerH")}</Label>
              </View>
              <Label>{t("avgSpeed")}</Label>
              <BarChart
                style={styles.chart}
                data={speedChart.data}
                xAxis={speedChart.xAxis}
                yAxis={speedChart.yAxis}
                chartDescription={{ text: "" }}
                legend={speedChart.legend}
                animation={{ durationX: 2000 }}
                drawHighlightArrow={false}
                touchEnabled={false}
                drawBarShadow={true}
                scaleEnabled={false}
                isDrawRoundedBarEnabled={true}
                doubleTapToZoomEnabled={false}
                marker={{
                  enabled: false,
                }}
                highlightPerTapEnabled={false}
              />
            </View>
          </View>
          <View style={styles.locationGroup}></View>
          <View style={styles.infoBox}>
            <View style={styles.rowData}>
              <View style={styles.iconText}>
                <CustomIcon name="location" style={styles.leftIcon} />
                <Label style={styles.infoBoxTitle}>{t("locations")}</Label>
              </View>
              <Label style={styles.infoBoxTitle}>{t("sessions")}</Label>
            </View>
            <FlatList
              data={locationSession}
              renderItem={renderLocationSession}
              horizontal={false}
            />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.rowData}>
              <View style={styles.iconText}>
                <CustomIcon name="craft" style={styles.leftIcon} />
                <Label style={styles.infoBoxTitle}>{t("craft")}</Label>
              </View>
              <Label style={styles.infoBoxTitle}>{t("sessions")}</Label>
            </View>
            <FlatList
              data={craftSession}
              renderItem={renderCraftSession}
              horizontal={false}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default StatsScreen;
