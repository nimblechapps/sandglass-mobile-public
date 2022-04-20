import React, { useEffect, useRef } from "react";
import { TextInput, Text } from "react-native";
import { NavigationContainer, DefaultTheme, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import dynamicLinks from '@react-native-firebase/dynamic-links';
import ProgressHud from "./components/ProgressHud";
import ToastMessage from "./components/ToastMessage";
import { AuthStack, MainStack } from "./navigation";
import Routes from "./navigation/Routes";
import _ from "lodash";

TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};
Text.defaultProps = { ...(Text.defaultProps || {}), allowFontScaling: false };
Text.defaultProps.allowFontScaling = false;

const RootContainer = () => {
  const BaseStack = createStackNavigator();
  const navigationRef = useRef();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const isSubscribed = useSelector(state => state.auth.isSubscribed)

  const navTheme = DefaultTheme;
  navTheme.colors.background = "#ffffff";


  // const userToken = useSelector((state) => state.auth.userToken);
  // const refreshToken = useSelector((state) => state.auth.refreshToken)

  // Globals.kUserToken = userToken || '';
  // Globals.kRefreshToken = refreshToken || '';
  useEffect(() => {
    //background/Quit Events
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      });

    //background/Quit events
    //Forground events
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    //when the component is unmounted,remove the listener 
    return () => unsubscribe();
    //Forground events
  }, [])

  const handleDynamicLink = link => {
    console.log('handleDynamicLink ===>', link);

    const url = _.get(link, 'url', '');

    if (url.includes('https://sandglassapp.page.link')) {
      // console.log('handleDynamicLink ===> 2', link);
      navigationRef.current.dispatch(
        CommonActions.navigate({
          name: Routes.Login,
          params: {
            success: url.includes("reset") ? true : false,
          }
        })
      );
    }
  }

  return (
    <>
      <NavigationContainer theme={navTheme} ref={navigationRef}>
        <BaseStack.Navigator>{
          (isLogin && isSubscribed) ?
            <BaseStack.Screen name={Routes.Tab} component={MainStack} options={{ headerShown: false }} />
            :
            <BaseStack.Screen name={Routes.Auth} component={AuthStack} options={{ headerShown: false, animationTypeForReplace: "push", }} />
        }
        </BaseStack.Navigator>
      </NavigationContainer>
      <ToastMessage />
      <ProgressHud />
    </>
  );
};

export default RootContainer;