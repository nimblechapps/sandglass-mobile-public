import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ScrollView, StatusBar, View, TouchableOpacity, processColor } from "react-native";
import { useTranslation } from "react-i18next";
import { useForm, Controller, useWatch } from "react-hook-form";
import MapView, { Polyline, Circle, Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { BarChart } from "react-native-charts-wrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SegmentedControlTab from "react-native-segmented-control-tab";
import HeaderTitle from "../../../components/HeaderTitle";
import HeaderRight from "../../../components/HeaderRight";
import Label from "../../../components/Label";
import CustomIcon from "../../../components/CustomIcon";
import ModalSlide from "../../../components/ModalSlide";
import FloatingInput from "../../../components/FloatingInput";
import CustomButton from "../../../components/CustomButton";
import { Color } from "../../../utils/theme";
import { screenHeight } from "../../../utils/globals";
import Routes from "../../../navigation/Routes";
import { REGEX } from "../../../utils/validation";
import ConformModal from '../../../components/ConformModal';
import { TripAction } from '../../../state/ducks/trip';

import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { SessionAction } from "../../../state/ducks/sessionType";
import { CraftAction } from "../../../state/ducks/craft";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const ResultScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { navigate } = navigation;
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [editNote, setEditNote] = useState(false);
  const [speedSegment, setSpeedSegment] = useState(1);
  const [editTags, setEditTags] = useState(false);
  const myLatLongs = [
    { latitude: -33.84102207270321, longitude: 151.2769591821764 },
    // { latitude: -33.84155326449, longitude: 151.27598106129789 },
    { latitude: -33.84260001513944, longitude: 151.2721376796392 },
    { latitude: -33.84283436054095, longitude: 151.26814074874272 },
    { latitude: -33.84463098726733, longitude: 151.26509045689903 },
    { latitude: -33.85010033581985, longitude: 151.26176966938814 },
    { latitude: -33.85665471016543, longitude: 151.25946116882935 },
    { latitude: -33.870099277752146, longitude: 151.2691328600535 },
  ];
  const [tagList, setTagList] = useState([]);

  let note = "";

  let tagArray = ["Sunday", "Downwinder", "OC1", "Eastcoast"];

  const weekChart = {
    legend: {
      enabled: false,
    },
    data: {
      dataSets: [
        {
          values:
            speedSegment === 0
              ? [
                { y: 100 },
                { y: 105 },
                { y: 102 },
                { y: 110 },
                { y: 114 },
                { y: 109 },
                { y: 105 },
                { y: 110 },
                { y: 114 },
                { y: 109 },
                { y: 105 },
                { y: 105 },
                { y: 110 },
              ]
              : [
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
        barWidth: 0.2,
      },
    },
    xAxis: {
      valueFormatter:
        speedSegment === 0
          ? [
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
          ]
          : [
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

  const mapviewRef = useRef(null);
  const noteRef = useRef(null);

  const [sessionTypeModal, setSessionTypeModal] = useState(false);
  const [sessionType, setSessionType] = useState("Training");
  const [sessionArray, setSessionArray] = useState([]);

  const [craftModal, setCraftModal] = useState(false);
  const [craft, setCraft] = useState("Ares, OC1");
  const [craftArray, setCraftArray] = useState([]);
  const [deleteResultModal, setDeleteResultModal] = useState(false);

  const [lapsArray, setLapsArray] = useState([]);

  const [avgPace, setAvgPace] = useState();
  const [bestPace, setBestPace] = useState();

  const [locationArray, setLocationaArray] = useState([]);
  const [lapLocation, setLapLocation] = useState();

  const [path, setPath] = useState([]);

  const dispatch = useDispatch();
  const tripDetails = useSelector(state => state.trip.tripDetails);
  const tripPath = useSelector(state => state.trip.tripPath);

  const [isPathAdded, setIsPathAdded] = useState(false);

  const [dateTime, setDateTime] = useState('');

  const tripId = route.params.tripId;

  // console.log("tripDetails", tripPath);

  useLayoutEffect(() => {
    const action = [
      {
        buttonTitle: t("delete"),
        titleStyle: { color: Color.BLUE_500 },
        onPress: onDeletePress,
      },
    ];
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title={t("result")} />,
      headerRight: () => <HeaderRight actions={action} />,
    });
  }, [navigation]);

  useEffect(() => {
    note =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.";
    setValue("note", note, { shouldValidate: true });
    setTagList(tagArray);
  }, [0]);

  useEffect(() => {
    const params = {
      data: {
        tripId: tripId
      }
    }

    getSessionType();

    getCraftList();

    dispatch(TripAction.getTrip(params, (success) => {
      let lapDetails = success?.payload?.tripData?.lapDetails;
      setLapsArray(lapDetails)
      lapDetails.map((item, index) => {
        console.log("---index---", item.startLocation);
        setLapLocation(item.startLocation)
        if (index == lapDetails.length - 1) {
          setLapLocation(item.endLocation)
        }
      })

    }, (error) => { }))

  }, [])

  const getSessionType = async () => {
    dispatch(SessionAction.getSessionType(
      (success) => {
        let temp = success.payload;
        setSessionArray(temp);
      },
      (error) => { }))
  }

  const getCraftList = async () => {
    dispatch(CraftAction.getCraftListAction(
      (success) => {
        const temp = success?.payload;
        setCraftArray(temp)
      },
      (error) => { }))
  }
  useEffect(() => {
    if (sessionArray) {
      setSessionType(sessionArray.length > 0 && sessionArray[0])
    }
    if (craftArray) {
      setCraft(craftArray.length > 0 && craftArray[0])
    }

  }, [sessionArray, craftArray])

  const onDeletePress = () => {
    setDeleteResultModal(true)
  };

  useEffect(() => {
    let avgPace = formatPace(tripDetails.avgPace ? tripDetails.avgPace : '0.0');
    let bestPace = formatPace(tripDetails.bestPace ? tripDetails.bestPace : '0.0');
    setAvgPace(avgPace)
    setBestPace(bestPace)
    concateDateTime();
    // getLapLocations()
  }, [tripDetails])

  useEffect(() => {
    tripPath && setIsPathAdded(true)
  }, [tripPath])

  useEffect(() => {
    // console.log('Location Array => ', locationArray, lapLocation);
    lapLocation && setLocationaArray([...locationArray, lapLocation])
  }, [lapLocation])

  const formatPace = (pace) => {
    console.log("---pace---", pace, typeof pace);
    if (pace) {
      const arr = pace?.toString().split(".");
      const mPace = arr[0] + "'" + (typeof arr[1] !== 'undefined' ? arr[1] : '0') + "''";
      return mPace;
    } else {
      return '0.0';
    }
  }
  const concateDateTime = () => {
    let startDateTime = formatDate(tripDetails?.startDate)
    let endDateTime = formatDate(tripDetails?.endDate)
    console.log("Date Time ==> ", startDateTime, endDateTime);
    let finalDateTime = startDateTime + " -" + formateEndDate(endDateTime);
    setDateTime(finalDateTime)

  }
  const formateEndDate = (date) => {
    let arr = date.split(",")
    return arr.length > 1 && arr[1];
  }

  const formatDate = (date) => {
    if (typeof date != 'undefined') {
      let formattedDate = moment(date).format('DD MMM YYYY, hh:mm a')
      return formattedDate;
    } else {
      return '';
    }
  }

  const getLapLocations = () => {
    tripDetails?.lapDetails?.map((item, index) => {
      console.log("---index---", item.startLocation);
      setLapLocation(item.startLocation)
      // if (index == tripDetails.lapDetails.length - 1) {
      //   setLapLocation(item.endLocation)
      // }
    })
  }

  // console.log("--- Location Array ---", locationArray);

  const detailList = [
    {
      number: tripDetails.distance,
      sub: "km",
      title: "Distance",
    },
    {
      number: tripDetails.duration,
      title: "Duration",
    },
    {
      number: tripDetails.avgSpeed,
      sub: "km/h",
      title: "Avg. speed",
    },
    {
      number: tripDetails.maxSpeed,
      sub: "km/h",
      title: "Max Speed",
    },
    {
      number: avgPace,
      title: "Avg. pace",
    },
    {
      number: bestPace,
      title: "Best pace",
    },
  ];



  const healthPartList = [
    {
      number: "125",
      sub: "bpm",
      title: "Avg. heart rate",
    },
    {
      number: "147",
      sub: "bpm",
      title: "Max. heart rate",
    },
    {
      number: "543",
      title: "Calories",
    },
  ];

  const lapList = [
    {
      lap: "K 1",
      speed: "10.1 km/h",
      pace: "6’45”",
    },
    {
      lap: "K 2",
      speed: "10.1 km/h",
      pace: "6’45”",
    },
    {
      lap: "K 3",
      speed: "10.1 km/h",
      pace: "6’45”",
    },
    {
      lap: "K 4",
      speed: "10.1 km/h",
      pace: "6’45”",
    },
    {
      lap: "K 5",
      speed: "10.1 km/h",
      pace: "6’45”",
    },
    {
      lap: "K 6",
      speed: "10.1 km/h",
      pace: "6’45”",
    },
    {
      lap: "K 7",
      speed: "10.1 km/h",
      pace: "6’45”",
    },
    {
      lap: "K 8",
      speed: "10.1 km/h",
      pace: "6’45”",
    },
  ];

  const sessionTypeData = ["Training", "Casual", "Race"];
  const craftData = ["Ares, OC1", "Euhkai, OC1", "V10 Sport, Surf Ski"];

  const onSavePress = () => {
    const params = {
      data: {
        tripId: tripId
      },
      result: {
        sessionType: sessionType.sessionType,
        craft: craft.type,
        tags: tagList,
        notes: getValues("note"),
      }
    }

    dispatch(TripAction.saveCompleteTrip(params, (success) => {
      setEditNote(false);
      setEditTags(false);
      navigate(Routes.Start);
    }, (error) => { }))

  };

  const onDeleteClick = () => {
    const params = {
      data: {
        tripId: tripId
      }
    }
    dispatch(TripAction.deleteTrip(params, (success) => {
      setDeleteResultModal(false);
      navigate(Routes.Start);
    }, (error) => { }))
  };

  const fitMarkers = () => {
    setTimeout(() => {
      mapviewRef.current.FitToSuppliedMarkers(
        {
          latitude: -33.84087856153924,
          longitude: 151.2765380628495,
        },
        {
          edgePadding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          },
        }
      );
    }, 100);
  };

  const onTagEnter = () => {
    let dupTagArray = tagList;
    dupTagArray.push(getValues("tag"));
    setTagList([...dupTagArray]);
    setValue("tag");
  };

  const removeTag = (value) => {
    let newTagArray = tagList.filter((item) => item !== value);
    setTagList([...newTagArray]);
  };

  const onMapLayout = () => {
    setTimeout(() => {
      tripPath.length > 0 &&
        mapviewRef?.current?.fitToCoordinates({
          tripPath,
          edgePadding: { top: 10, right: 10, bottom: 0, left: 10 },
          animated: true,
        });
    }, 100);
  };

  return (
    <>
      <MyStatusBar backgroundColor="dark-content" />
      <View style={styles.contentMain}>
        <KeyboardAwareScrollView
          scrollEnabled={scrollEnabled}
          enableResetScrollToCoords={false}
          extraHeight={20}
          enableOnAndroid={true}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.addressView}>
            <View>
              <Label style={styles.locationText}>{tripDetails.startAddress}</Label>
              <Label style={styles.timeAddress}>
                {dateTime}
              </Label>
            </View>
            <CustomIcon
              name="share"
              style={styles.sendIcon}
              onPress={() => {
                console.log("Send");
                navigate(Routes.Share);
              }}
            />
          </View>
          <View style={{ position: "relative" }}>
            <MapView
              ref={mapviewRef}
              minZoomLevel={13.25}
              loadingEnabled
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude:
                  isPathAdded && tripPath[parseInt((tripPath.length + 1) / 2)]?.latitude,
                longitude:
                  isPathAdded && tripPath[parseInt((tripPath.length + 1) / 2)]?.longitude,
                latitudeDelta: 0.06,
                longitudeDelta: 0.06,
              }}
              region={{
                latitude:
                  isPathAdded && tripPath[parseInt((tripPath.length + 1) / 2)]?.latitude,
                longitude:
                  isPathAdded && tripPath[parseInt((tripPath.length + 1) / 2)]?.longitude,
                latitudeDelta: 0.058,
                longitudeDelta: 0.058,
              }}
              style={{ height: 375 }}
              onMapReady={() => onMapLayout()}
            >
              {locationArray.map((item, index) => {
                return index === 0 ? (
                  <Marker coordinate={item} key={index.toString()}>
                    <View style={styles.sourceCircleMarker}></View>
                  </Marker>
                ) : index === locationArray.length - 1 ? (
                  <Marker coordinate={item} key={index.toString()}>
                    <View style={styles.destinatonCircleMarker}></View>
                  </Marker>
                ) : locationArray.length > 2 && (
                  <Marker coordinate={item} key={index.toString()}>
                    <View style={styles.circleMarker}>
                      <Label style={styles.MarkerText}>{index}</Label>
                    </View>
                  </Marker>
                );
              })}
              <Polyline
                coordinates={typeof tripPath !== 'undefined' && tripPath}
                strokeColor="#005AAD"
                strokeColors={["#70F3AC", "#FFD342", "#FF7081", "#FFAC5B"]}
                strokeWidth={4}
              />
            </MapView>
          </View>
          <View style={styles.detailsPart}>
            {detailList.map((item) => {
              return (
                <View style={styles.detailConten}>
                  <View style={styles.textAlign}>
                    <Label style={styles.numberText}>{item.number}</Label>
                    <Label style={styles.subText}>{item.sub}</Label>
                  </View>
                  <Label style={styles.timeAddress}>{item.title}</Label>
                </View>
              );
            })}
          </View>

          <View style={styles.healthPart}>
            <Label style={styles.healthText}>{t("health")}</Label>
            <View style={styles.healthPartList}>
              {healthPartList.map((item, index) => {
                return (
                  <View style={styles.detailConten}>
                    <View style={styles.textAlign}>
                      <Label style={styles.numberText}>{item.number}</Label>
                      <Label style={styles.subText}>{item.sub}</Label>
                    </View>
                    <Label style={styles.timeAddress}>{item.title}</Label>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.liveViewBack}>
            <TouchableOpacity
              style={styles.liveViewBorder}
              onPress={() => {
                setSessionTypeModal(true);
              }}
            >
              <Label style={styles.iconTextStyle}>{t("sessionType")}</Label>
              <View style={styles.texWithIcon}>
                <Label style={styles.rightTextStyle}>{sessionType.sessionType}</Label>
                <CustomIcon
                  name="chevron-right"
                  style={styles.rightIconStyle}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.liveViewBack}>
            <TouchableOpacity
              style={styles.liveViewNoBorder}
              onPress={() => {
                setCraftModal(true);
              }}
            >
              <Label style={styles.iconTextStyle}>{t("craft")}</Label>
              <View style={styles.texWithIcon}>
                <Label style={styles.rightTextStyle}>{craft.type}</Label>
                <CustomIcon
                  name="chevron-right"
                  style={styles.rightIconStyle}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.healthPart}>
            <View style={styles.titleWithTab}>
              <View style={styles.speedWithkm}>
                <Label style={styles.healthText}>
                  {speedSegment === 0 ? t("pace") : t("speed")}
                </Label>
                <Label style={styles.healthSubText}>({t("kmPerH")})</Label>
              </View>
              <View style={styles.segmentedControlTabStyleBack}>
                <SegmentedControlTab
                  tabsContainerStyle={styles.tabsContainerStyle}
                  firstTabStyle={styles.firstTabStyle}
                  tabStyle={styles.tabStyle}
                  tabTextStyle={styles.tabTextStyle}
                  activeTabStyle={styles.activeTabStyle}
                  activeTabTextStyle={styles.activeTabTextStyle}
                  selectedIndex={speedSegment}
                  allowFontScaling={false}
                  borderRadius={16}
                  values={[t("pace"), t("speed")]}
                  onTabPress={(index) => {
                    setSpeedSegment(index);
                  }}
                />
              </View>
            </View>

            <BarChart
              style={styles.chart}
              data={weekChart.data}
              xAxis={weekChart.xAxis}
              yAxis={weekChart.yAxis}
              animation={{ durationX: 2000 }}
              chartDescription={{ text: "" }}
              legend={weekChart.legend}
              drawValueAboveBar={true}
              drawHighlightArrow={true}
              touchEnabled={true}
              drawBarShadow={true}
              scaleEnabled={false}
              doubleTapToZoomEnabled={false}
              highlightPerTapEnabled={true}
            />
          </View>

          <View style={styles.splitsPart}>
            <Label style={styles.healthText}>{t("splits")}</Label>
            <View style={styles.tableHeaderMain}>
              <View style={styles.tableHeaderPart}>
                <Label style={styles.headerTitle}>{t("lap")}</Label>
                <Label style={styles.headerTitleTwo}>{t("speed")}</Label>
                <Label style={styles.headerTitleThree}>{t("pace")}</Label>
              </View>
            </View>
            {lapsArray.length > 0 && lapsArray?.map((item, index) => {
              return (
                <View style={styles.tableBodyMain}>
                  <View style={styles.tableHeaderPart}>
                    <Label style={styles.headerTitle}>{item.lapName}</Label>
                    <Label style={styles.headerTitleTwo}>{item?.speed}</Label>
                    <Label style={styles.headerTitleThree}>{formatPace(item.pace || '0.0')}</Label>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.tagsPart}>
            <View style={styles.titleWithTab}>
              <Label style={styles.healthText}>{t("tags")}</Label>
              {!editTags && (
                <CustomIcon
                  name="edit"
                  style={styles.editIconStyle}
                  onPress={() => setEditTags(true)}
                />
              )}
            </View>
            <View style={styles.tagListContainer}>
              {tagList.map((item, index) => {
                return (
                  <View
                    style={
                      editTags ? styles.editTagContainer : styles.tagContainer
                    }
                  >
                    <Label style={styles.tagText}>{item}</Label>
                    {editTags && (
                      <CustomIcon
                        name="cross"
                        style={styles.crossIcon}
                        onPress={() => {
                          removeTag(item);
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
            {editTags && (
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FloatingInput
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors?.tag?.message}
                      autoCapitalize="none"
                      returnKeyType={"next"}
                    />
                  )}
                  name="tag"
                  rules={{
                    required: {
                      value: false,
                      message: JSON.stringify([
                        { valid: false, title: t("tagEmpty") },
                      ]),
                    },
                    pattern: {
                      value: REGEX.NON_SPACE_CHARACTER,
                      message: JSON.stringify([
                        { valid: false, title: t("tagValidation") },
                      ]),
                    },
                  }}
                />
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={t("create")}
                    disabled={
                      !(
                        watch("tag") !== "" &&
                        typeof watch("tag") !== "undefined" &&
                        isValid
                      )
                    }
                    onPress={() => onTagEnter()}
                    buttonCustomStyle={styles.buttonStyle}
                    titleStyle={styles.buttonTitleStyle}
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.tagsPart}>
            <View style={styles.titleWithTab}>
              <Label style={styles.healthText}>{t("notes")}</Label>
              {!editNote && (
                <CustomIcon
                  name="edit"
                  style={styles.editIconStyle}
                  onPress={() => {
                    setEditNote(!editNote);
                  }}
                />
              )}
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <FloatingInput
                  inputContainerMainStyle={styles.inputContainerMainStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.inputStyle}
                  multiline={true}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors?.note?.message}
                  autoCapitalize="sentences"
                  returnKeyType={"default"}
                  editable={editNote ? true : false}
                  reference={noteRef}
                  isAutoFocus={editNote ? true : false}
                />
              )}
              name="note"
              rules={{
                required: { value: true },
              }}
            />
          </View>

          <View style={styles.tagsPart}>
            <CustomButton
              buttonCustomStyle={styles.buttonCustomStyle}
              disabled={!isValid}
              title={t("save")}
              onPress={() => {
                onSavePress();
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>

      <ModalSlide
        visible={sessionTypeModal}
        onRequestClose={() => {
          setSessionTypeModal(!sessionTypeModal);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setSessionTypeModal(false);
          }}
          style={{ flex: 1 }}
        ></TouchableOpacity>
        <View style={styles.modalView}>
          <View style={styles.line}></View>
          <Label style={styles.delayStartText}>{t("sessionType")}</Label>
          <ScrollView
            style={{ height: screenHeight / 2.5 - 70 }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {sessionArray.length > 0 && sessionArray.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={1}
                  onPress={() => {
                    setSessionType(item);
                    setSessionTypeModal(false);
                  }}
                  style={styles.listText}
                >
                  <Label
                    style={[
                      styles.itemText,
                      {
                        color:
                          sessionType.sessionType === item.sessionType
                            ? Color.BLUE_500
                            : Color.GREY_600,
                      },
                    ]}
                  >
                    {item.sessionType}
                  </Label>
                  {sessionType.sessionType === item.sessionType && (
                    <CustomIcon name="check" style={styles.checkIconStyle} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ModalSlide>

      <ModalSlide
        visible={craftModal}
        onRequestClose={() => {
          setCraftModal(!craftModal);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setCraftModal(false);
          }}
          style={{ flex: 1 }}
        ></TouchableOpacity>
        <View style={styles.modalView}>
          <View style={styles.line}></View>
          <Label style={styles.delayStartText}>{t("craft")}</Label>
          <ScrollView
            style={{ height: screenHeight / 2.5 - 70 }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {craftArray.length > 0 && craftArray.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={1}
                  onPress={() => {
                    setCraft(item);
                    setCraftModal(false);
                  }}
                  style={styles.listText}
                >
                  <Label
                    style={[
                      styles.itemText,
                      {
                        color: craft.type === item.type ? Color.BLUE_500 : Color.GREY_600,
                      },
                    ]}
                  >
                    {item.type}
                  </Label>
                  {craft.type === item.type && (
                    <CustomIcon name="check" style={styles.checkIconStyle} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ModalSlide>

      <ConformModal
        visible={deleteResultModal}
        modaltitle={t('delete')}
        modalTitleStyle={styles.modalTitleStyle}
        alertText={t('areYouDelete')}
        modalTxtStyle={styles.modalTxtStyle}
        onConfirmPress={() => {
          onDeleteClick()
        }}
        onCancelPress={() => { setDeleteResultModal(false) }}
      />

    </>
  );
};

export default ResultScreen;
