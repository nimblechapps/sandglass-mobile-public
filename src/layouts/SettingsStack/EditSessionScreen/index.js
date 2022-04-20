import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, FlatList, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import HeaderTitle from "../../../components/HeaderTitle";
import styles from "./styles";
import HeaderRight from "../../../components/HeaderRight";
import { Color } from "../../../utils/theme";
import CustomIcon from "../../../components/CustomIcon";
import Label from "../../../components/Label";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import CustomModalBox from "../../../components/CustomModalBox";
import { useDispatch, useSelector } from "react-redux";
import { SessionAction } from "../../../state/ducks/sessionType";
import { useIsFocused } from "@react-navigation/native";

const EditSessionScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { t } = useTranslation();
  const isFocused = useIsFocused()
  const [sessionArray, setSessionArray] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const sessionTypes = route.params.sessionTypes;

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [scrollEnabled, setScrollEnabled] = useState(true);
  // const sessionTypes = useSelector(state => state.sessionType.sessionTypes);
  console.log("---sessionTypes---", sessionTypes);

  useLayoutEffect(() => {
    const action = [
      {
        buttonTitle: t("Done"),
        // disabled: isValid || getValues("uName") !== uName,
        titleStyle: { color: Color.BLUE_500 },
        onPress: onDonePress,
      },
    ];
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title={t("Edit Session Type")} />,
      headerRight: () => <HeaderRight actions={action} />,
      headerLeft: () => null,
    });
  }, [navigation]);

  const onDonePress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (isFocused) {
      getSessionType();
    }
  }, [isFocused,])

  const getSessionType = async () => {
    dispatch(SessionAction.getSessionType(
      (success) => {
        console.log("---response---", success);
        let temp = success.payload;
        setSessionArray(temp);
      },
      (error) => { }))
  }

  const removeSessionType = (item) => {
    const params = {
      sessionTypeId: item.id
    }
    dispatch(SessionAction.deleteSessionType(params,
      (success) => {
        let dupSessionData = sessionArray.filter(
          (session) => session.id !== item.id
        );
        setSessionArray(dupSessionData);
      },
      (error) => { }))
  };

  const renderSessionTypes = ({ item, index }) => {
    return (
      <View
        style={[
          styles.sessionRow,
          { borderBottomWidth: sessionArray.length === index + 1 ? 0 : 1 },
        ]}
      >
        <View style={styles.iconSession}>
          <CustomIcon
            name="Minus"
            style={styles.removeIconStyle}
            onPress={() => removeSessionType(item)}
          />
          <Label style={[styles.sessionType]}>{t(item.sessionType)}</Label>
        </View>
        <Label
          style={styles.removeText}
          onPress={() => {
            setValue("sName", item.sessionType);
            setSelectedItem(item)
            setShowAlert(true);
          }}
        >
          {t("rename")}
        </Label>
      </View>
    );
  };

  useEffect(() => {
    setSessionArray(sessionTypes);
  }, []);

  const onAutoFocus = () => {
    console.log("Visible ....");
    setTimeout(() => {
      console.log("AutoFocus : true");
      return true;
    }, 1000);
  };

  return (
    <>
      <ScrollView style={styles.contentContainerStyle}>
        <View style={styles.group}>
          <FlatList
            data={sessionArray}
            renderItem={renderSessionTypes}
            horizontal={false}
          />
        </View>
      </ScrollView>

      {showAlert && (
        <KeyboardAwareScrollView
          scrollEnabled={scrollEnabled}
          enableResetScrollToCoords={false}
          extraHeight={100}
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === "ios"}
          contentContainerStyle={styles.content}
          // contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          sc
        >
          <CustomModalBox
            dialogTitle={t("editSessionType")}
            dialogSubTitle={t("sessionTypeSubMessage")}
            modalVisible={showAlert}
            leftButtonName={t("cancel")}
            rightButtonName={t("ok")}
            handleCancel={() => {
              setShowAlert(false);
            }}
            handleConfirm={() => {
              console.log('session ', selectedItem.id);
              const params = {
                sessionTypeId: selectedItem.id,
                sessionType: getValues('sName')
              }
              dispatch(SessionAction.editSessionType(params, (success) => {
                const updatedSession = sessionArray
                updatedSession.map(data => {
                  if (data.id === selectedItem.id) {
                    data.sessionType = success?.payload?.sessionType
                  }
                })
                setSessionArray([...updatedSession])
              }, (error) => { }))
              setShowAlert(false);
            }}
          >
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.textInput]}
                    value={value}
                    editable={true}
                    secureTextEntry={false}
                    autoCorrect={false}
                    autoCapitalize={false}
                    multiline={false}
                    placeholder={"Sample"}
                    numberOfLines={1}
                    onChangeText={(value) => {
                      value = value.trimStart();
                      onChange(value);
                    }}
                    ref={null}
                    autoFocus={true}
                  />
                )}
                name="sName"
                rules={{
                  required: {
                    value: false,
                  },
                }}
              />
            </View>
          </CustomModalBox>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default EditSessionScreen;
