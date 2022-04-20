import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ScrollView,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import HeaderTitle from "../../../components/HeaderTitle";
import CustomButton from "../../../components/CustomButton/index";
import HeaderRight from "../../../components/HeaderRight";
import Routes from "../../../navigation/Routes";
import { Color } from "../../../utils/theme";
import Label from "../../../components/Label";
import CustomIcon from "../../../components/CustomIcon";
import CustomAlertBox from "../../../components/CustomAlertBox";
import { Controller, get, useForm } from "react-hook-form";
import CustomModalBox from "../../../components/CustomModalBox";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { SessionAction } from "../../../state/ducks/sessionType";
import { useIsFocused } from "@react-navigation/native";

const SessionTypeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigate } = navigation;
  const [showAlert, setShowAlert] = useState(false);
  const [sessionArray, setSessionArray] = useState([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  // const sessionTypes = useSelector(state => state.sessionType.sessionTypes);
  // console.log("---sessionTypes---", sessionTypes);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  useLayoutEffect(() => {
    const action = [
      {
        buttonTitle: t("edit"),
        // disabled: isValid || getValues("uName") !== uName,
        titleStyle: { color: Color.BLUE_500 },
        onPress: onEditPress,
      },
    ];
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle titleStyle={styles.titleStyle} title={t("sessionType")} />
      ),
      headerRight: () => <HeaderRight actions={action} />,
    });
  }, [navigation]);

  const onEditPress = () => {
    console.log('sessionArray ', sessionArray);
    navigate(Routes.EditSessionScreen, { sessionTypes: sessionArray });
  };

  useEffect(() => {
    if (isFocused) {
      getSessionType();
    }
  }, [isFocused])


  const getSessionType = async () => {
    dispatch(SessionAction.getSessionType(
      (success) => {
        console.log("---response---", success);
        let temp = success.payload;
        setSessionArray(temp);
      },
      (error) => { }))
  }

  const onConfirmButtonPress = (data) => {
    console.log('Add Session Type', data);
    let params = {
      sessionType: data.sType
    }
    setShowAlert(false);
    dispatch(SessionAction.addSessionType(params,
      (success) => {
        const item = {
          sessionType: success?.payload?.sessionType,
          id: success?.payload?.id
        }
        setSessionArray([...sessionArray.slice(0, 0), item, ...sessionArray.slice(0)])
      },
      (error) => { }))
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        bounces={false}
      >
        <View style={styles.sessionGroup}>
          {sessionArray.map((item, index) => {
            return (
              <View
                style={[
                  styles.sessionTypeMain,
                  {
                    borderBottomWidth:
                      sessionArray.length === index + 1 ? 0 : 1,
                  },
                ]}
              >
                <Label style={styles.sessionType}>{t(item.sessionType)}</Label>
              </View>
            );
          })}
        </View>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setValue("sType", '')
              setShowAlert(true)
            }}
          >
            <CustomIcon name="plus" style={styles.leftIcon} />
            <Label style={styles.addButtonText}>{t("addSession")}</Label>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomModalBox
        dialogTitle={t("addSessionTitle")}
        dialogSubTitle={t("sessionTypeSubMessage")}
        modalVisible={showAlert}
        leftButtonName={t("cancel")}
        rightButtonName={t("ok")}
        handleCancel={() => {
          setShowAlert(false);
        }}
        handleConfirm={handleSubmit(onConfirmButtonPress)}
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
            name="sType"
            rules={{
              required: {
                value: false,
              },
            }}
          />
        </View>
      </CustomModalBox>
    </>
  );
};

export default SessionTypeScreen;
