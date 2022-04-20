import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import HeaderTitle from "../../../components/HeaderTitle";
import styles from "./styles";
import Label from "../../../components/Label";
import IconButton from "../../../components/IconButton";
import CustomButton from "../../../components/CustomButton";
import Routes from "../../../navigation/Routes";
import CountDown from "react-native-countdown-component";
import { Color, Font } from "../../../utils/theme";
import ModalPopup from "../../../components/ModalPopup";
import { useSelector } from "react-redux";
import { LocationPermission } from "../../../utils/LocationPermission";

const StartScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigate } = navigation;
  const [countDownModal, setCountDownModal] = useState(false);
  const [strength, setStrength] = useState(75);
  const [startTime, setStartTime] = useState();
  const delayStart = useSelector(state => state.auth.delayStart);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerTitle: () => <HeaderTitle title={t("Start")} />,
    });
  }, [navigation]);

  useEffect(() => {
    delayStart && setStartTime(delayStart)
  }, [delayStart])

  // const onSettings = (items) => {
  //   console.log('items: ', items);
  //   setStartTime(items.delayTime)
  // }
  return (
    <>
      <ScrollView contentContainerStyle={styles.content} bounces={false}>
        <View style={styles.gpsWithNameView}>
          <View style={styles.gpsView}>
            <Label style={styles.gpsTitle}>{t("gps")}</Label>
            <View style={styles.signleStrenth}>
              <View
                style={[
                  styles.signleArrow,
                  {
                    height: 4,
                    backgroundColor:
                      strength > 0 ? Color.BLUE_500 : Color.GREY_200,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.signleArrow,
                  {
                    height: 6,
                    backgroundColor:
                      strength > 49 ? Color.BLUE_500 : Color.GREY_200,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.signleArrow,
                  {
                    height: 9,
                    backgroundColor:
                      strength > 74 ? Color.BLUE_500 : Color.GREY_200,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.signleArrow,
                  {
                    height: 12,
                    backgroundColor:
                      strength > 100 ? Color.GREY_300 : Color.GREY_200,
                  },
                ]}
              ></View>
            </View>
          </View>
          <View style={styles.userNameMain}>
            <Label style={styles.userName}>{t("hello")} Joseph,</Label>
            <Label style={styles.userName}>{t("letsPaddle")}</Label>
          </View>
        </View>
        <View style={styles.buttonWithSetting}>
          <CustomButton
            title="START"
            buttonCustomStyle={styles.startButton}
            titleStyle={styles.titleStyle}
            onPress={() => {
              LocationPermission((result, error) => {
                if (result) {
                  setCountDownModal(true);
                }
              })
            }}
          />
          <IconButton
            style={styles.settingBack}
            onPress={() => {
              navigate(Routes.StartSettings);
            }}
            iconName="gear"
            iconStyle={styles.iconStyle}
          />
        </View>
      </ScrollView>
      <ModalPopup visible={countDownModal}>
        <View style={styles.modalBack}>
          <CountDown
            size={96}
            until={startTime ? parseInt(startTime) : 3}
            onFinish={() => {
              setCountDownModal(false), navigate(Routes.StartTimer);
            }}
            digitStyle={{ backgroundColor: Color.TRANSPARENT }}
            digitTxtStyle={{
              color: Color.WHITE,
              fontSize: 96,
              fontFamily: Font.SFPROTEXTBOLD,
            }}
            timeToShow={["S"]}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
          <Label
            style={styles.cancelTextStyle}
            onPress={() => {
              setCountDownModal(false);
            }}
          >
            {t("cancel")}
          </Label>
        </View>
      </ModalPopup>
    </>
  );
};

export default StartScreen;
