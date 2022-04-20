import React, { useState, useLayoutEffect } from "react";
import { ScrollView, Switch, View } from "react-native";
import { useTranslation } from "react-i18next";
import HeaderTitle from "../../../components/HeaderTitle";
import styles from "./styles";
import { Color } from "../../../utils/theme";
import Label from "../../../components/Label";
import { TouchableOpacity } from "react-native-gesture-handler";
const PermissionsScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [isEnabled, setIsEnabled] = useState(true);
  const locationToggleSwitch = () =>
    setIsEnabled((previousState) => !previousState);

  const [healthIsEnabled, setHealthIsEnabled] = useState(true);
  const healthToggleSwitch = () =>
    setHealthIsEnabled((previousState) => !previousState);

  const [notificationIsEnabled, setNotificationIsEnabled] = useState(false);
  const notificationToggleSwitch = () =>
    setNotificationIsEnabled((previousState) => !previousState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle titleStyle={styles.titleStyle} title={t("permissions")} />
      ),
    });
  }, [navigation]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.liveView}>
          <Label style={styles.locationAccessStyle}>
            {t("locationAccess")}
          </Label>
          <TouchableOpacity
            style={styles.texWithIcon}
            onPress={() => setIsEnabled(!isEnabled)}
          >
            <Switch
              style={styles.switch}
              trackColor={{ false: Color.RED_100, true: Color.GREEN_100 }}
              thumbColor={Color.WHITE}
              ios_backgroundColor={Color.RED_100}
              onValueChange={locationToggleSwitch}
              value={isEnabled}
            />
            <Label style={styles.switchTextStyle}>
              {isEnabled ? t("on") : t("off")}
            </Label>
          </TouchableOpacity>
        </View>
        <View style={styles.liveView}>
          <Label style={styles.locationAccessStyle}>
            {t("healthTracking")}
          </Label>
          <TouchableOpacity
            style={styles.texWithIcon}
            onPress={() => setHealthIsEnabled(!healthIsEnabled)}
          >
            <Switch
              style={styles.switch}
              trackColor={{ false: Color.RED_100, true: Color.GREEN_100 }}
              thumbColor={healthIsEnabled ? Color.WHITE : Color.WHITE}
              ios_backgroundColor={Color.RED_100}
              onValueChange={healthToggleSwitch}
              value={healthIsEnabled}
            />
            <Label style={styles.switchTextStyle}>
              {healthIsEnabled ? t("on") : t("off")}
            </Label>
          </TouchableOpacity>
        </View>
        <View style={styles.liveView}>
          <Label style={styles.locationAccessStyle}>{t("notifications")}</Label>
          <TouchableOpacity
            style={styles.texWithIcon}
            onPress={() => setNotificationIsEnabled(!notificationIsEnabled)}
          >
            <Switch
              style={styles.switch}
              trackColor={{ false: Color.RED_100, true: Color.GREEN_100 }}
              thumbColor={notificationIsEnabled ? Color.WHITE : Color.WHITE}
              ios_backgroundColor={Color.RED_100}
              onValueChange={notificationToggleSwitch}
              value={notificationIsEnabled}
            />
            <Label style={styles.switchTextStyle}>
              {notificationIsEnabled ? t("on") : t("off")}
            </Label>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default PermissionsScreen;
