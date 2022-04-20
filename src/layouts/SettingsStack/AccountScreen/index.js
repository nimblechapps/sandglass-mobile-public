import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { pickImage } from "../../../utils/DocumentPicker";
import { REGEX } from "../../../utils/validation";
import { Color } from "../../../utils/theme";
import ProgressiveImage from "../../../components/ProgressiveImage";
import HeaderTitle from "../../../components/HeaderTitle";
import HeaderRight from "../../../components/HeaderRight";
import Label from "../../../components/Label";
import FloatingInput from "../../../components/FloatingInput";
import styles from "./styles";

const AccountScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigate } = navigation;

  const [userPic, setUserPic] = useState({ uri: "", type: "", name: "" });
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [scrollEnabled, setScrollEnabled] = useState(true);
  let uName = "";

  useEffect(() => {
    uName = "Joseph Flatman";
    setValue("uName", uName, { shouldValidate: true });
    userPic.uri = "";
  }, [0]);

  const updateProfileDetails = (data) => {
    let formdata = new FormData();
  };

  const onChangeProfilePic = () => {
    Alert.alert(
      t("photo"),
      t("profilePhoto"),
      [
        {
          text: t("takePhoto"),
          onPress: () => openCameraPicker(),
        },
        {
          text: t("fromGallery"),
          onPress: () => openCameraPicker(false),
        },
        {
          text: t("cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const openCameraPicker = (isCamera = true) => {
    let options = {
      width: 500,
      height: 500,
      cropping: true,
      sortOrder: "none",
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 1,
      mediaType: "photo",
      includeExif: true,
      cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
    };
    pickImage(options, isCamera, (imageFile) => {
      if (imageFile) {
        const uri = imageFile.uri;
        const name = imageFile.name;
        const type = imageFile.type;
        setUserPic({ uri, name, type });
      }
    });
  };

  useLayoutEffect(() => {
    const action = [
      {
        buttonTitle: t("save"),
        // disabled: isValid || getValues("uName") !== uName,
        titleStyle: { color: Color.GREY_400 },
        // onPress: onDonePress,
      },
    ];
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title={t("accountInfo")} />,
      headerRight: () => <HeaderRight actions={action} />,
    });
  }, [navigation]);

  return (
    <>
      <KeyboardAwareScrollView
        scrollEnabled={scrollEnabled}
        enableResetScrollToCoords={false}
        extraHeight={100}
        enableOnAndroid={true}
        contentContainerStyle={styles.Main}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.profileMain}>
          <View style={styles.image_row}>
            {userPic.uri ? (
              <ProgressiveImage
                source={{ uri: userPic.uri }}
                style={styles.captureImg}
              />
            ) : (
              <View style={styles.noImage}>
                <Label style={styles.noImageText}>J</Label>
              </View>
            )}
            <Label
              style={styles.editPhoto}
              onPress={() => {
                onChangeProfilePic();
              }}
            >
              {" "}
              {t("editProfilePhoto")}
            </Label>
          </View>
        </View>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <FloatingInput
              placeholder={t("yourName")}
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

        <FloatingInput
          placeholder={t("enterEmail")}
          value={"joseph.f@gmail.com"}
          // onChangeText={onChange}
          errorMessage={errors?.email?.message}
          autoCapitalize="none"
          returnKeyType={"next"}
          editable={false}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default AccountScreen;
