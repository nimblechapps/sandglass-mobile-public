import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import HeaderTitle from "../../../components/HeaderTitle";
import CustomIconButton from "../../../components/CustomIconButton";
import styles from "./styles";
import { Color } from "../../../utils/theme";
import CardBox from "../../../components/CardBox";
import Label from "../../../components/Label";
import ModalSlide from "../../../components/ModalSlide";
import { screenHeight } from "../../../utils/globals";
import HeaderRight from "../../../components/HeaderRight";
import CustomButton from "../../../components/CustomButton";
import CustomCheckBox from "../../../components/CustomCheckBox";
import _ from 'lodash';
import { useRoute } from '@react-navigation/native';
import HeaderLeft from "../../../components/HeaderLeft";
import Routes from "../../../navigation/Routes";

const ActivityListScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigate } = navigation;
  const [modalType, setModalType] = useState("");
  const [locations, setLocations] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [locationFilter, setLocationFilter] = useState(false);
  const [craftFilter, setCraftFilter] = useState(false);
  const [sessionFilter, setSessionFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(false);
  const [durationFilter, setDurationFilter] = useState(false);
  const [durations, setDurations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activityDates, setActivityDates] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const route = useRoute();
  const sessionsDetails = _.get(route, 'params.sessionsDetails', false)

  useLayoutEffect(() => {
    const action = [
      {
        buttonTitle: t("clearFilter"),
        disabled: !filterApplied,
        titleStyle: { color: filterApplied ? Color.BLUE_500 : Color.GREY_400 },
        onPress: () => onDonePress(),
      },
    ];
    navigation.setOptions({
      // headerLeft: () => !sessionsDetails ? <HeaderLeft onPress={() => { navigation.goBack() }} /> : null,
      headerTitle: () => <HeaderTitle title={t("activity")} />,
      headerRight: () => <HeaderRight actions={action} />
    });
  }, [navigation, filterApplied]);

  const dropDownData = [
    { title: "location", value: "location", filter: locationFilter },
    { title: "sessionType", value: "sessionType", filter: sessionFilter },
    { title: "craft", value: "craft", filter: craftFilter },
    { title: "date", value: "date", filter: dateFilter },
    { title: "duration", value: "duration", filter: durationFilter },
  ];

  const openModal = (value) => {
    setModalType(value);
  };

  const onDonePress = () => {
    let dupLocationdata = locations;
    let dupCraftsData = crafts;
    let dupDuration = durations;
    let dupSessionData = sessions;
    let dupActivityDateData = activityDates;

    for (var i in dupLocationdata) {
      dupLocationdata[i].selected = false;
    }

    for (var i in dupCraftsData) {
      dupCraftsData[i].selected = false;
    }

    for (var i in dupDuration) {
      dupDuration[i].selected = false;
    }

    for (var i in dupSessionData) {
      dupSessionData[i].selected = false;
    }

    for (var i in dupActivityDateData) {
      dupActivityDateData[i].selected = false;
    }
    setFilterApplied(false);
    setDateFilter(false);
    setCraftFilter(false);
    setSessionFilter(false);
    setLocationFilter(false);
    setDurationFilter(false);
    setSessions(dupSessionData);
    setActivityDates(dupActivityDateData);
    setDurations(dupDuration);
    setLocations(dupLocationdata);
    setCrafts(dupCraftsData);
  };

  const renderDropDownButtons = ({ item }) => {
    return (
      <CustomIconButton
        title={t(item.title)}
        iconLeftName={"chevron-down"}
        buttonCustomStyle={{
          backgroundColor: item.filter ? Color.BLUE_100 : Color.WHITE,
          borderColor: item.filter ? Color.BLUE_500 : Color.GREY_200,
        }}
        onPress={() => openModal(item.title)}
      />
    );
  };

  const juneData = [
    {
      title: "Rose Bay",
      date: "TUE, 04/06/21",
      time: "02:57:00",
      location: "Outrigger Canoe",
      distance: "14.1",
    },
    {
      title: "Bondi Beach",
      date: "WED, 05/06/21",
      time: "02:57:00",
      location: "Surf Ski",
      distance: "14.1",
    },
    {
      title: "Kurnell Beach",
      date: "THU, 06/06/21",
      time: "02:57:00",
      location: "SUP",
      distance: "14.1",
    },
    {
      title: "Rose Bay",
      date: "THU, 06/06/21",
      time: "02:57:00",
      location: "SUP",
      distance: "14.1",
    },
  ];

  const mayData = [
    {
      title: "Palm Beach",
      date: "FRI, 04/05/21",
      time: "02:57:00",
      location: "Outrigger Canoe",
      distance: "14.1",
    },
    {
      title: "Rose Bay",
      date: "SAT, 05/05/21",
      time: "02:57:00",
      location: "Surf Ski",
      distance: "14.1",
    },
    {
      title: "Kurnell Beach",
      date: "SUN, 06/05/21",
      time: "02:57:00",
      location: "SUP",
      distance: "14.1",
    },
  ];

  const locationArray = [
    { name: "All", selected: false },
    { name: "Rose Bay", selected: false },
    { name: "Bondi Beach", selected: false },
    { name: "Little Bay", selected: false },
  ];

  const craftArray = [
    { name: "All", selected: false },
    { name: "Outrigger Canoe", selected: false },
    { name: "Surf Ski", selected: false },
    { name: "SUP", selected: false },
  ];

  const durationData = [
    { name: "1 min", selected: false },
    { name: "2 min", selected: false },
    { name: "3 min", selected: false },
    { name: "4 min", selected: false },
    { name: "5 min", selected: false },
  ];

  const sessionData = [
    { name: "Training", selected: false },
    { name: "Casual", selected: false },
    { name: "Race", selected: false },
  ];

  const activityDateData = [
    { name: "TUE, 04/06/21", selected: false },
    { name: "WED, 05/06/21", selected: false },
    { name: "THU, 06/06/21", selected: false },
    { name: "FRI, 04/05/21", selected: false },
    { name: "FRI, 05/05/21", selected: false },
  ];

  useEffect(() => {
    setLocations(locationArray);
    setCrafts(craftArray);
    setDurations(durationData);
    setSessions(sessionData);
    setActivityDates(activityDateData);
  }, [0]);

  const onLocationCheckBoxes = (value, selected) => {
    let dupLocationData = locations;
    let temp = [];
    if (value === "All") {
      for (var i in dupLocationData) {
        temp.push({
          ...dupLocationData[i],
          selected: !selected,
        });
      }
    } else {
      let countChecked = 0;
      dupLocationData[0].selected = false;
      for (var i in dupLocationData) {
        if (dupLocationData[i].name === value) {
          temp.push({
            ...dupLocationData[i],
            selected: !dupLocationData[i].selected,
          });
        } else {
          temp.push({
            ...dupLocationData[i],
            selected: dupLocationData[i].selected,
          });
        }

        if (temp[i].selected === true) {
          countChecked += 1;
        }
      }
      if (countChecked >= temp.length - 1) {
        temp[0].selected = true;
      } else {
        temp[0].selected = false;
      }
    }
    setLocations(temp);
  };

  const onLocationFilter = () => {
    let dupLocationData = locations;
    let countChecked = 0;
    for (var i in dupLocationData) {
      if (dupLocationData[i].selected === true) {
        countChecked += 1;
      }
    }
    countChecked === 0 ? setLocationFilter(false) : setLocationFilter(true);
    checkFilterApplied();
  };

  const onCraftChecked = (value, selected) => {
    let dupCraftsData = crafts;
    let temp = [];
    if (value === "All") {
      for (var i in dupCraftsData) {
        temp.push({
          ...dupCraftsData[i],
          selected: !selected,
        });
      }
    } else {
      let countChecked = 0;
      dupCraftsData[0].selected = false;
      for (var i in dupCraftsData) {
        if (dupCraftsData[i].name === value) {
          temp.push({
            ...dupCraftsData[i],
            selected: !dupCraftsData[i].selected,
          });
        } else {
          temp.push({
            ...dupCraftsData[i],
            selected: dupCraftsData[i].selected,
          });
        }

        if (temp[i].selected === true) {
          countChecked += 1;
        }
      }
      if (countChecked >= temp.length - 1) {
        temp[0].selected = true;
      } else {
        temp[0].selected = false;
      }
    }
    setCrafts(temp);
  };

  const onCraftsFilter = () => {
    let dupCraftsData = crafts;
    let countChecked = 0;
    for (var i in dupCraftsData) {
      if (dupCraftsData[i].selected === true) {
        countChecked += 1;
      }
    }
    countChecked === 0 ? setCraftFilter(false) : setCraftFilter(true);
    checkFilterApplied();
  };

  const onDurationChecked = (value, selected) => {
    let dupDurationData = durations;
    let temp = [];
    let countChecked = 0;
    for (var i in dupDurationData) {
      if (dupDurationData[i].name === value) {
        temp.push({
          ...dupDurationData[i],
          selected: !dupDurationData[i].selected,
        });
      } else {
        temp.push({
          ...dupDurationData[i],
          selected: dupDurationData[i].selected,
        });
      }

      if (temp[i].selected === true) {
        countChecked += 1;
      }
    }
    setDurations(temp);
  };

  const onDurationFilter = () => {
    let dupDurationData = durations;
    let countChecked = 0;
    for (var i in dupDurationData) {
      if (dupDurationData[i].selected === true) {
        countChecked += 1;
      }
    }
    countChecked === 0 ? setDurationFilter(false) : setDurationFilter(true);
    checkFilterApplied();
  };

  const onSessionChecked = (value, selected) => {
    let dupSessionData = sessions;
    let temp = [];
    let countChecked = 0;
    for (var i in dupSessionData) {
      if (dupSessionData[i].name === value) {
        temp.push({
          ...dupSessionData[i],
          selected: !dupSessionData[i].selected,
        });
      } else {
        temp.push({
          ...dupSessionData[i],
          selected: dupSessionData[i].selected,
        });
      }

      if (temp[i].selected === true) {
        countChecked += 1;
      }
    }
    setSessions(temp);
  };

  const onSessionFilter = () => {
    let dupSessionData = sessions;
    let countChecked = 0;
    for (var i in dupSessionData) {
      if (dupSessionData[i].selected === true) {
        countChecked += 1;
      }
    }
    countChecked === 0 ? setSessionFilter(false) : setSessionFilter(true);
    checkFilterApplied();
  };

  const onActivityDateChecked = (value, selected) => {
    let dupActivityDateData = activityDates;
    let temp = [];
    let countChecked = 0;
    for (var i in dupActivityDateData) {
      if (dupActivityDateData[i].name === value) {
        temp.push({
          ...dupActivityDateData[i],
          selected: !dupActivityDateData[i].selected,
        });
      } else {
        temp.push({
          ...dupActivityDateData[i],
          selected: dupActivityDateData[i].selected,
        });
      }

      if (temp[i].selected === true) {
        countChecked += 1;
      }
    }
    setActivityDates(temp);
  };

  const onActivityDateFilter = () => {
    let dupActivityDateData = activityDates;
    let countChecked = 0;
    for (var i in dupActivityDateData) {
      if (dupActivityDateData[i].selected === true) {
        countChecked += 1;
      }
    }
    countChecked === 0 ? setDateFilter(false) : setDateFilter(true);
    checkFilterApplied();
  };

  const checkFilterApplied = () => {
    let dupLocationdata = locations;
    let dupCraftsData = crafts;
    let dupDuration = durations;
    let dupSessionData = sessions;
    let dupActivityDateData = activityDates;
    let countChecked = 0;

    for (var i in dupLocationdata) {
      if (dupLocationdata[i].selected === true) {
        countChecked += 1;
      }
    }

    for (var i in dupCraftsData) {
      if (dupCraftsData[i].selected === true) {
        countChecked += 1;
      }
    }

    for (var i in dupDuration) {
      if (dupDuration[i].selected === true) {
        countChecked += 1;
      }
    }

    for (var i in dupSessionData) {
      if (dupSessionData[i].selected === true) {
        countChecked += 1;
      }
    }

    for (var i in dupActivityDateData) {
      if (dupActivityDateData[i].selected === true) {
        countChecked += 1;
      }
    }

    countChecked > 0 ? setFilterApplied(true) : setFilterApplied(false);
  };

  return (
    <>
      <View style={styles.Main}>
        <View style={styles.DropDownArea}>
          <FlatList
            data={dropDownData}
            renderItem={renderDropDownButtons}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ScrollView contentContainerStyle={styles.ActivityList}>
          <View>
            <Label style={styles.monthTitle}>{"June 2021"}</Label>
            {juneData.map((item, index) => {
              return (
                <CardBox
                  title={item.title}
                  date={item.date}
                  location={item.location}
                  distance={item.distance}
                  time={item.time}
                  onPress={() => {
                    navigate(Routes.Result)
                  }}
                />
              );
            })}
          </View>

          <View>
            <Label style={styles.monthTitle}>{"May 2021"}</Label>
            {mayData.map((item, index) => {
              return (
                <CardBox
                  title={item.title}
                  date={item.date}
                  location={item.location}
                  distance={item.distance}
                  time={item.time}
                  onPress={() => {
                    navigate(Routes.Result)
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ModalSlide
        visible={modalType === "location"}
        onRequestClose={() => {
          setModalType("");
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ height: screenHeight / 2 - 70 }}
          onPress={() => {
            setModalType("");
          }}
          style={{ flex: 1 }}
        ></TouchableOpacity>
        <View style={[styles.modalView]}>
          <View style={styles.line}></View>
          <Label style={styles.delayStartText}>{t("location")}</Label>
          <ScrollView
            // style={{ height: screenHeight / 2 - 70 }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {locations.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={1}
                  onPress={() => {
                    // setDelayTime(item);
                    // setDelayTimeModal(false);
                  }}
                  style={styles.listText}
                >
                  <CustomCheckBox
                    style={styles.checkboxMain}
                    title={item.name}
                    isChecked={item.selected}
                    onPress={() => {
                      onLocationCheckBoxes(item.name, item.selected);
                    }}
                  ></CustomCheckBox>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.applyButton}>
            <CustomButton
              title={t("apply")}
              titleStyle={styles.ApplyButtonTitle}
              buttonCustomStyle={styles.customButtonStyle}
              onPress={() => {
                onLocationFilter();
                setModalType("");
              }}
            />
          </View>
        </View>
      </ModalSlide>
      <ModalSlide
        visible={modalType === "craft"}
        onRequestClose={() => {
          setModalType("");
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ height: screenHeight / 2 - 70 }}
          onPress={() => {
            setModalType("");
          }}
          style={{ flex: 1 }}
        ></TouchableOpacity>
        <View style={[styles.modalView]}>
          <View style={styles.line}></View>
          <Label style={styles.delayStartText}>{t("craft")}</Label>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
            {crafts.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={1}
                  onPress={() => { }}
                  style={styles.listText}
                >
                  <CustomCheckBox
                    style={styles.checkboxMain}
                    title={item.name}
                    isChecked={item.selected}
                    onPress={() => {
                      onCraftChecked(item.name, item.selected);
                    }}
                  ></CustomCheckBox>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.applyButton}>
            <CustomButton
              title={t("apply")}
              titleStyle={styles.ApplyButtonTitle}
              buttonCustomStyle={styles.customButtonStyle}
              onPress={() => {
                onCraftsFilter();
                setModalType("");
              }}
            />
          </View>
        </View>
      </ModalSlide>
      <ModalSlide
        visible={modalType === "duration"}
        onRequestClose={() => {
          setModalType("");
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ height: screenHeight / 2 - 70 }}
          onPress={() => {
            setModalType("");
          }}
          style={{ flex: 1 }}
        ></TouchableOpacity>
        <View style={[styles.modalView]}>
          <View style={styles.line}></View>
          <Label style={styles.delayStartText}>{t("duration")}</Label>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
            {durations.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={1}
                  onPress={() => { }}
                  style={styles.listText}
                >
                  <CustomCheckBox
                    style={styles.checkboxMain}
                    title={item.name}
                    isChecked={item.selected}
                    onPress={() => {
                      onDurationChecked(item.name, item.selected);
                    }}
                  ></CustomCheckBox>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.applyButton}>
            <CustomButton
              title={t("apply")}
              titleStyle={styles.ApplyButtonTitle}
              disabled={false}
              buttonCustomStyle={styles.customButtonStyle}
              onPress={() => {
                onDurationFilter();
                setModalType("");
              }}
            />
          </View>
        </View>
      </ModalSlide>
      <ModalSlide
        visible={modalType === "sessionType"}
        onRequestClose={() => {
          setModalType("");
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ height: screenHeight / 2 - 70 }}
          onPress={() => {
            setModalType("");
          }}
          style={{ flex: 1 }}
        ></TouchableOpacity>
        <View style={[styles.modalView]}>
          <View style={styles.line}></View>
          <Label style={styles.delayStartText}>{t("sessionType")}</Label>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
            {sessions.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={1}
                  onPress={() => { }}
                  style={styles.listText}
                >
                  <CustomCheckBox
                    style={styles.checkboxMain}
                    title={item.name}
                    isChecked={item.selected}
                    onPress={() => {
                      onSessionChecked(item.name, item.selected);
                    }}
                  ></CustomCheckBox>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.applyButton}>
            <CustomButton
              title={t("apply")}
              titleStyle={styles.ApplyButtonTitle}
              buttonCustomStyle={styles.customButtonStyle}
              onPress={() => {
                onSessionFilter();
                setModalType("");
              }}
            />
          </View>
        </View>
      </ModalSlide>

      <ModalSlide
        visible={modalType === "date"}
        onRequestClose={() => {
          setModalType("");
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ height: screenHeight / 2 }}
          onPress={() => {
            setModalType("");
          }}
          style={{ flex: 1 }}
        ></TouchableOpacity>
        <View style={[styles.modalView]}>
          <View style={styles.line}></View>
          <Label style={styles.delayStartText}>{t("date")}</Label>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
            {activityDates.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={1}
                  onPress={() => { }}
                  style={styles.listText}
                >
                  <CustomCheckBox
                    style={styles.checkboxMain}
                    title={item.name}
                    isChecked={item.selected}
                    onPress={() => {
                      onActivityDateChecked(item.name, item.selected);
                    }}
                  ></CustomCheckBox>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.applyButton}>
            <CustomButton
              title={t("apply")}
              titleStyle={styles.ApplyButtonTitle}
              buttonCustomStyle={styles.customButtonStyle}
              onPress={() => {
                onActivityDateFilter();
                setModalType("");
              }}
            />
          </View>
        </View>
      </ModalSlide>
    </>
  );
};

export default ActivityListScreen;
