import React, { useEffect, useRef, useState } from "react";
import { AppState, View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import setHeaderLeft from "../navigation/setHeaderLeft";
import getHeaderTitle from "../navigation/getHeaderTitle";
import GetHeaderTitle from "./getHeaderTitle";
import { Color, Font } from "../utils/theme";
import Routes from "./Routes";
import { ifIphoneX } from "react-native-iphone-x-helper";
import CustomIcon from "../components/CustomIcon";
import _ from "lodash";

// AuthStack
import GetStartedScreen from "../layouts/AuthStack/GetStartedScreen";
import LoginScreen from "../layouts/AuthStack/LoginScreen";
import SubscribeScreen from "../layouts/AuthStack/SubscribeScreen";
import ForgotPasswordScreen from "../layouts/AuthStack/ForgotPasswordScreen";
import SignUpOptionsScreen from "../layouts/AuthStack/SignUpOptionsScreen";
import SignUpEmailScreen from "../layouts/AuthStack/SignUpEmailScreen";

// StartStack
import StartScreen from "../layouts/StartStack/StartScreen";
import StartSettingsScreen from "../layouts/StartStack/StartSettingsScreen";
import StartTimerScreen from "../layouts/StartStack/StartTimerScreen";
import ResultScreen from "../layouts/StartStack/ResultScreen";
import ShareScreen from "../layouts/StartStack/ShareScreen";

// StatsStack
import StatsScreen from "../layouts/StatsStack/StatsScreen";

// ActivityStack
import ActivityListScreen from "../layouts/ActivityStack/ActivityListScreen";

// SettingsStack
import SettingsScreen from "../layouts/SettingsStack/SettingsScreen";
import AccountScreen from "../layouts/SettingsStack/AccountScreen";
import PrivacyPolicyScreen from "../layouts/SettingsStack/PrivacyPolicyScreen";
import TermsServiceScreen from "../layouts/SettingsStack/TermsServiceScreen";
import AboutScreen from "../layouts/SettingsStack/AboutScreen";
import CraftScreen from "../layouts/SettingsStack/CraftScreen";
import HelpScreen from "../layouts/SettingsStack/HelpScreen";
import PermissionsScreen from "../layouts/SettingsStack/PermissionsScreen";
import SessionTypeScreen from "../layouts/SettingsStack/SessionTypeScreen";
import UnitMeasurementScreen from "../layouts/SettingsStack/UnitMeasurementScreen";
import UpdatesScreen from "../layouts/SettingsStack/UpdatesScreen";
import EditCraftScreen from "../layouts/SettingsStack/EditCraftScreen";
import AddCraftScreen from "../layouts/SettingsStack/AddCraftScreen";
import EditSessionScreen from "../layouts/SettingsStack/EditSessionScreen";
import ReportProblemScreen from "../layouts/SettingsStack/HelpScreen/ReportProblem";
import Subscription from "../layouts/AuthStack/Subscription";
import SignInOptionScreen from "../layouts/AuthStack/SignInOptionScreen";

import { useDispatch, useSelector } from 'react-redux';
import { CommonAction } from "../state/ducks/common";
import { AuthAction } from "../state/ducks/auth";


const screenOptions = ({ navigation }) => ({
  headerLeft: () => setHeaderLeft("arrow-left"),
  headerTitle: () => null,
  headerRight: () => <View />,
  headerStyle: {
    borderBottomColor: Color.GREY_200,
    borderBottomWidth: 1,
    backgroundColor: Color.WHITE,
    // ...ifIphoneX({
    //     height: 82,
    // }, {
    //     height: 68,
    // })
  },
  gestureEnabled: false,
  headerTitleAlign: "center",
});

const SetHeaderTitle = ({ route }) => ({
  headerTitle: () => <HeaderTitle title={GetHeaderTitle(route)} />,
});

const setTabbar = ({ route }) => ({
  tabBarLabel: getHeaderTitle(route, true),
});

const Auth = createStackNavigator();
export const AuthStack = () => {
  const isFromSignOut = useSelector(state => state.common.isFromSignOut);
  console.log('isFromSignOut: ', isFromSignOut);


  return (
    <Auth.Navigator screenOptions={screenOptions}>
      {
        isFromSignOut ? (<>
          <Auth.Screen name={Routes.SignInOptions} component={SignInOptionScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.GetStarted} component={GetStartedScreen} options={{ headerShown: false }} />
          <Auth.Screen name={Routes.Subscribe} component={SubscribeScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.SignUpOptions} component={SignUpOptionsScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.Subscription} component={Subscription} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.Login} component={LoginScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.SignUpEmail} component={SignUpEmailScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.FrogotPassword} component={ForgotPasswordScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.TermsService} component={TermsServiceScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.PrivacyPolicy} component={PrivacyPolicyScreen} options={{ headerShown: true }} />
        </>) : (<>
          <Auth.Screen name={Routes.GetStarted} component={GetStartedScreen} options={{ headerShown: false }} />
          <Auth.Screen name={Routes.SignInOptions} component={SignInOptionScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.Subscribe} component={SubscribeScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.SignUpOptions} component={SignUpOptionsScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.Subscription} component={Subscription} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.Login} component={LoginScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.SignUpEmail} component={SignUpEmailScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.FrogotPassword} component={ForgotPasswordScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.TermsService} component={TermsServiceScreen} options={{ headerShown: true }} />
          <Auth.Screen name={Routes.PrivacyPolicy} component={PrivacyPolicyScreen} options={{ headerShown: true }} />
        </>)
      }

    </Auth.Navigator>
  );
};

const Start = createStackNavigator();
export const StartStack = () => {
  return (
    <Start.Navigator screenOptions={screenOptions}>
      <Start.Screen name={Routes.Start} component={StartScreen} options={{ headerShown: true }} />
      <Start.Screen name={Routes.StartSettings} component={StartSettingsScreen} options={{ headerShown: true }} />
      <Start.Screen name={Routes.StartTimer} component={StartTimerScreen} options={{ headerShown: false }} />
      <Start.Screen name={Routes.Share} component={ShareScreen} options={{ headerShown: true }} />
      <Start.Screen name={Routes.Result} component={ResultScreen} options={{ headerShown: true }} />
    </Start.Navigator>
  );
};

const Stats = createStackNavigator();
export const StatsStack = () => {
  return (
    <Stats.Navigator screenOptions={screenOptions}>
      <Stats.Screen name={Routes.Stats} component={StatsScreen} options={{ headerShown: true }} />
      <Stats.Screen name={Routes.ActivityList} component={ActivityListScreen} options={{ headerShown: true }} />
      <Stats.Screen name={Routes.Result} component={ResultScreen} options={{ headerShown: true }} />
    </Stats.Navigator>
  );
};

const Activity = createStackNavigator();
export const ActivityStack = () => {
  return (
    <Activity.Navigator screenOptions={screenOptions}>
      <Activity.Screen name={Routes.ActivityList} component={ActivityListScreen} options={{ headerShown: true }} />
      <Activity.Screen name={Routes.Result} component={ResultScreen} options={{ headerShown: true }} />
    </Activity.Navigator>
  );
};

const Settings = createStackNavigator();
export const SettingsStack = () => {
  return (
    <Settings.Navigator screenOptions={screenOptions}>
      <Settings.Screen name={Routes.Settings} component={SettingsScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.Account} component={AccountScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.About} component={AboutScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.Updates} component={UpdatesScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.Help} component={HelpScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.Permissions} component={PermissionsScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.UnitMeasurement} component={UnitMeasurementScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.SessionType} component={SessionTypeScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.Craft} component={CraftScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.AddCraftScreen} component={AddCraftScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.EditCraftScreen} component={EditCraftScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.TermsService} component={TermsServiceScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.PrivacyPolicy} component={PrivacyPolicyScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.EditSessionScreen} component={EditSessionScreen} options={{ headerShown: true }} />
      <Settings.Screen name={Routes.ReportProblem} component={ReportProblemScreen} options={{ headerShown: true }} />
    </Settings.Navigator>
  );
};

const tabHiddenRoutes = [
  // Routes.StartTimer,
  // Routes.Subscribe,
  // Routes.Result,
  Routes.Account,
  Routes.About,
  Routes.Updates,
  Routes.UnitMeasurement,
  Routes.SessionType,
  Routes.Craft,
  Routes.Help,
  Routes.Permissions,
  Routes.TermsService,
  Routes.PrivacyPolicy,
  Routes.EditCraftScreen,
  Routes.Share,
];

const getTabBarVisibility = (route, navigation) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (tabHiddenRoutes.includes(routeName)) {
    return true;
  }
  return false;
};

const TabBar = createBottomTabNavigator();

export const Navigation = () => {
  const { t } = useTranslation();
  const data = useSelector(state => state.auth.loginMessage);
  const showLogin = useSelector(state => state.common.showLoginMessage)
  const dispatch = useDispatch();

  useEffect(() => {
    const toastData = { type: false, message: data };
    if (showLogin) {
      data && dispatch(CommonAction.showToast(toastData))
    }
  }, [data])

  return (
    <TabBar.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarVisible: true,
        tabBarIcon: ({ color }) => {
          let iconName;
          let tabBarLabel;

          if (route.name === Routes.Start) {
            iconName = "start";
            tabBarLabel = t("start");
          } else if (route.name === Routes.Stats) {
            iconName = "stats";
            tabBarLabel = t("stats");
          } else if (route.name === Routes.ActivityList) {
            iconName = "events";
            tabBarLabel = t("activity");
          } else if (route.name === Routes.Settings) {
            iconName = "adjust";
            tabBarLabel = t("settings");
          }
          return (
            <View style={styles.bottomTab}>
              <CustomIcon name={iconName} size={Font.SIZE_24} color={color} />
              <Text style={[styles.tabBarLabel, { color: color }]}>
                {tabBarLabel}
              </Text>
            </View>
          );
        },
        tabBarStyle: {
          paddingTop: 14,
          alignContent: "center",
          justifyContent: "space-between",
          backgroundColor: Color.WHITE,
          borderTopColor: Color.GREY_200,
          ...ifIphoneX(
            {
              height: 86,
            },
            {
              height: 52,
            }
          ),
          display: getTabBarVisibility(route, navigation) ? "none" : "flex",
        },
        tabBarHideOnKeyboard: false,
        tabBarInactiveTintColor: Color.CLOUDBURST,
        tabBarActiveTintColor: Color.SEAGULL,
        tabBarShowLabel: true,
      })}
    >
      <TabBar.Screen name={Routes.Start} component={StartStack} options={setTabbar} />
      <TabBar.Screen name={Routes.Stats} component={StatsStack} options={setTabbar} />
      <TabBar.Screen name={Routes.ActivityList} component={ActivityStack} options={setTabbar} />
      <TabBar.Screen name={Routes.Settings} component={SettingsStack} options={setTabbar} />
    </TabBar.Navigator>
  );
};

const Main = createStackNavigator();
export const MainStack = () => {
  return (
    <Main.Navigator screenOptions={screenOptions}>
      <Main.Screen name={Routes.Tab} component={Navigation} options={{ headerShown: false }} />
    </Main.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    alignItems: "center",
  },
  tabBarLabel: {
    fontFamily: Font.SFPROTEXTREGULAR,
    paddingTop: 3,
    fontSize: Font.SIZE_10,
  },
});
