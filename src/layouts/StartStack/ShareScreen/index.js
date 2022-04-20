import React, { useLayoutEffect, useRef, useState } from "react";
import { View, StatusBar } from "react-native";
import { useTranslation } from "react-i18next";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView, { Polyline, Marker } from "react-native-maps";
import LinearGradient from "react-native-linear-gradient";
import { SvgCssUri } from "react-native-svg";
import HeaderRight from "../../../components/HeaderRight";
import HeaderLeft from "../../../components/HeaderLeft";
import Label from "../../../components/Label";
import { Color } from "../../../utils/theme";
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import styles from "./styles";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const ShareScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigate } = navigation;
  const mapviewRef = useRef(null);
  const [mapSegment, setMapSegment] = useState(1);
  const [scale, setScale] = useState(false);
  const viewShot = useRef(null);

  const myLatLongs = [
    // { latitude: -33.80102207270321, longitude: 151.2769591821764 },
    // { latitude: -33.82260001513944, longitude: 151.2721376796392 },
    // { latitude: -33.84283436054095, longitude: 151.26814074874272 },
    // { latitude: -33.84463098726733, longitude: 151.26509045689903 },
    // { latitude: -33.85010033581985, longitude: 151.26176966938814 },
    // { latitude: -33.85665471016543, longitude: 151.25946116882935 },
    // { latitude: -33.870099277752146, longitude: 151.2691328600535 },
    { latitude: -33.784840870678515, longitude: 150.59688573352636 },
    { latitude: -33.888643937894074, longitude: 150.66829686466386 },
    { latitude: -33.9479033432879, longitude: 150.66623692818877 },
    { latitude: -33.961003222429945, longitude: 150.68065648351458 },
    { latitude: -34.0424050289237, longitude: 150.63396459007853 },
  ];

  const onIconPress = () => {
    setScale(!scale);
  };

  const onShare = () => {
    console.log("OnShare....")
    viewShot.current.capture().then(uri => {
      // loading(false);
      console.log("URL : ", uri)
      shareImage(uri)
    })
  };


  const shareImage = (uri) => {
    // Share.open(options)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     err && console.log(err);
    //   });
    Share.open({ url: uri, filename: 'Ranking' }).then((res) => {
      console.log(res);
    })
      .catch((err) => {
        err && console.log(err);
      });
  }

  useLayoutEffect(() => {
    const action = [
      {
        iconName: "share",
        iconStyle: { color: Color.WHITE },
        onPress: onShare,
      },
      {
        iconName: !scale ? "scale-down" : "scale-up",
        iconStyle: { color: Color.WHITE },
        onPress: onIconPress,
      },
    ];
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft
          iconName="cross"
          iconStyle={{ color: Color.WHITE }}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <View style={styles.tabContainer}>
          <SegmentedControlTab
            tabsContainerStyle={styles.tabsContainerStyle}
            firstTabStyle={styles.firstTabStyle}
            tabStyle={styles.tabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
            selectedIndex={mapSegment}
            allowFontScaling={false}
            borderRadius={16}
            values={[t("satelite"), t("plain")]}
            onTabPress={(index) => {
              setMapSegment(index);
            }}
          />
        </View>
      ),
      headerRight: () => <HeaderRight actions={action} />,
      headerStyle: {
        backgroundColor: Color.BLACK,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
    });
  }, [navigation, mapSegment, scale]);

  const detailList = [
    {
      number: "01:29:32",
      title: "Duration",
    },
    {
      number: "45.03",
      title: "Distance",
      sub: "km",
    },
    {
      number: "12.28",
      title: "Avg. speed",
      sub: "km/h",
    },
  ];

  const onMapLayout = () => {
    setTimeout(() => {
      // fitAllMarkers() {
      mapviewRef?.current?.fitToCoordinates(myLatLongs, {
        edgePadding: { top: 10, right: 10, bottom: 400, left: 10 },
        animated: true,
      });
      // }
      // mapviewRef?.current?.fitToCoordinates({
      //   myLatLongs,
      //   edgePadding: { top: 10, right: 10, bottom: 0, left: 10 },
      //   animated: true,
      // });
    }, 100);
  };

  return (
    <>
      <MyStatusBar
        backgroundColor={Color.TRANSPARENT}
        barStyle="light-content"
      />
      <View
        style={[
          styles.backgroundColor,
          { paddingTop: scale ? 70 : 0, paddingBottom: scale ? 100 : 0 },
        ]}
      >
        {/* <View style={styles.backgroundColor}> */}
        <ViewShot
          ref={viewShot} style={{ flex: 1 }}>
          <View style={{ position: "relative", flex: 1 }}>
            <LinearGradient
              style={styles.topGradient}
              colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.01)"]}
            >
              <View style={styles.addressView}>
                <View>
                  <Label style={styles.locationText}>{"Rose Bay, NSW"}</Label>
                  <Label style={styles.timeAddress}>
                    {"30 May 2021, 05:15pm - 06:45pm"}
                  </Label>
                </View>
                <SvgCssUri
                  uri="https://res.cloudinary.com/djyl1goby/image/upload/v1649494013/Sandglass/kc3zmhtenk2dfgpudr63_vjcqtd.svg"
                  width={90}
                  height={21}
                />
              </View>
            </LinearGradient>
            <MapView
              mapType={mapSegment === 1 ? "standard" : "satellite"}
              ref={mapviewRef}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude:
                  myLatLongs[parseInt((myLatLongs.length + 1) / 2)].latitude,
                longitude:
                  myLatLongs[parseInt((myLatLongs.length + 1) / 2)].longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09,
              }}
              initialRegion={{
                latitude:
                  myLatLongs[parseInt((myLatLongs.length + 1) / 2)].latitude,
                longitude:
                  myLatLongs[parseInt((myLatLongs.length + 1) / 2)].longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09,
              }}
              style={styles.mapContainer}
              onMapReady={() => onMapLayout()}
              onLayout={() => console.log("onLayout")}
            >
              {myLatLongs.map((item, index) => {
                return index === 0 ? (
                  <Marker coordinate={item} key={index.toString()}>
                    <View style={styles.sourceCircleMarker}></View>
                  </Marker>
                ) : index === myLatLongs.length - 1 ? (
                  <Marker coordinate={item} key={index.toString()}>
                    <View style={styles.destinatonCircleMarker}></View>
                  </Marker>
                ) : (
                  <Marker coordinate={item} key={index.toString()}>
                    <View style={styles.circleMarker}>
                      <Label style={styles.MarkerText}>{index}</Label>
                    </View>
                  </Marker>
                );
              })}

              <Polyline
                coordinates={myLatLongs}
                strokeColor="#005AAD"
                strokeColors={["#70F3AC", "#FFD342", "#FF7081", "#FFAC5B"]}
                strokeWidth={4}
              />
            </MapView>
            <View style={styles.bottomGradientMain}>
              <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}>
                <View style={styles.detailsPart}>
                  {detailList.map((item, index) => {
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
                <LinearGradient
                  style={styles.LineGradient}
                  colors={['#F50000', '#F0F500', '#14F500']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                />
              </LinearGradient>
              <View style={styles.blackView}></View>
            </View>
          </View>
        </ViewShot>
      </View>
    </>
  );
};

export default ShareScreen;
