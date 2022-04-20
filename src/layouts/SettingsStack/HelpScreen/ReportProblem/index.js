import React, { useLayoutEffect, useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import HeaderTitle from "../../../../components/HeaderTitle";
import HeaderRight from "../../../../components/HeaderRight";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { REGEX } from "../../../../utils/validation";
import FloatingInput from "../../../../components/FloatingInput";
import CustomButton from "../../../../components/CustomIconButton";
import { Color } from "../../../../utils/theme";

import styles from "./styles";

const ReportProblemScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigate } = navigation;
  const [scrollEnabled, setScrollEnabled] = useState(true);
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
        buttonTitle: t("send"),
        disabled: !isValid,
        titleStyle: { color: isValid ? Color.BLUE_500 : Color.GREY_400 },
        onPress: onDonePress,
      },
    ];
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle
          titleStyle={styles.titleStyle}
          title={t("reportProblem")}
        />
      ),
      headerRight: () => <HeaderRight actions={action} />,
    });
  }, [navigation, isValid]);

  const onDonePress = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        bounces={false}
      >
        <KeyboardAwareScrollView
          scrollEnabled={scrollEnabled}
          enableResetScrollToCoords={false}
          extraHeight={100}
          enableOnAndroid={true}
          contentContainerStyle={styles.Main}
          keyboardShouldPersistTaps="handled"
        >
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <FloatingInput
                placeholder={t("name")}
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.uName?.message}
                autoCapitalize="none"
                returnKeyType={"next"}
                editable={true}
              />
            )}
            name="uName"
            rules={{
              required: {
                value: true,
                message: JSON.stringify([
                  { valid: false, title: t("yourNameEmpty") },
                ]),
              },
              pattern: {
                value: REGEX.NAME,
                message: JSON.stringify([
                  { valid: false, title: t("yourNameAlphabets") },
                ]),
              },
            }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <FloatingInput
                placeholder={t("email")}
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.uEmail?.message}
                autoCapitalize="none"
                returnKeyType={"next"}
                editable={true}
              />
            )}
            name="uEmail"
            rules={{
              required: {
                value: true,
                message: JSON.stringify([
                  { valid: false, title: t("emailEmpty") },
                ]),
              },
              pattern: {
                value: REGEX.EMAIL,
                message: JSON.stringify([
                  { valid: false, title: t("emailInvalid") },
                ]),
              },
            }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <FloatingInput
                placeholder={t("message")}
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.uMessage?.message}
                autoCapitalize="none"
                returnKeyType={"next"}
                textAlignVertical={"top"}
                editable={true}
                keyboardType={"default"}
                multiline={true}
                numberOfLines={8}
                inputStyle={{ paddingTop: 18 }}
                inputContainerStyle={{
                  height: 160,
                }}
              />
            )}
            name="uMessage"
            rules={{
              required: {
                value: true,
                message: JSON.stringify([
                  { valid: false, title: t("messageEmpty") },
                ]),
              },
            }}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
    </>
  );
};

export default ReportProblemScreen;
