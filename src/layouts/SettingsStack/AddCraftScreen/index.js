import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Label from "../../../components/Label";
import HeaderTitle from "../../../components/HeaderTitle";
import HeaderRight from "../../../components/HeaderRight";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Color } from "../../../utils/theme";
import ModalSlide from "../../../components/ModalSlide";
import { screenHeight } from "../../../utils/globals";
import CustomIcon from "../../../components/CustomIcon";
import styles from "./styles";
import CustomModalBox from "../../../components/CustomModalBox";
import { CraftAction } from "../../../state/ducks/craft";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

function AddCrfatScreen({ navigation }) {
  const { t } = useTranslation();
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const { control, handleSubmit, getValues, setValue, formState: { errors, isValid } } = useForm({ mode: "onChange" });
  const [showModal, setShowModal] = useState(false);
  const [craftsType, setCraftType] = useState([]);
  const [selectedCraftType, setSelectedCraftType] = useState("");
  const [craftModel, setCraftModel] = useState('');
  const [craftBrand, setCraftBrand] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const isFocused = useIsFocused();
  const [enableSave, setEnableSave] = useState(false);

  console.log('---selectedCraftType---', selectedCraftType, typeof selectedCraftType);
  useLayoutEffect(() => {
    const action = [
      {
        buttonTitle: t("save"),
        disabled: !enableSave,
        titleStyle: {
          color: enableSave ? Color.BLUE_500
            : Color.GREY_400,
        },
        onPress: onDonePress,
      },
    ];
    navigation.setOptions({
      headerLeft: () => (
        <Label
          style={styles.cancelTitle}
          onPress={() => {
            navigation.goBack();
          }}
        >
          {t("cancel")}
        </Label>
      ),
      headerTitle: () => (
        <HeaderTitle titleStyle={styles.titleStyle} title={t("addCraft")} />
      ),
      headerRight: () => <HeaderRight actions={action} />,
    });
  }, [navigation, enableSave, selectedCraftType]);

  useEffect(() => {
    console.log("Inside craftype changed", selectedCraftType)

  }, [selectedCraftType])
  useEffect(() => {
    if (isFocused) {
      getCraftTypes();
    }
  }, [isFocused])

  const getCraftTypes = () => {
    dispatch(CraftAction.getCraftTypes(
      (success) => {
        const temp = success.payload;
        setCraftType(temp);
      },
      (error) => { }))
  }


  const onDonePress = async () => {
    console.log("Selected==>", selectedCraftType)
    const params = {
      type: selectedCraftType,
      brand: getValues("brand"),
      model: getValues("modelName")
    }

    dispatch(CraftAction.addCraft(params,
      (success) => {
        navigation.goBack();
      },
      (error) => { }))
  }

  return (
    <>
      <View style={styles.main}>
        <View style={styles.craftRow}>
          <Label style={styles.title}>{t("type")}</Label>
          <TouchableOpacity
            style={styles.craftModal}
            onPress={() => setShowModal(true)}
          >
            <Label style={styles.value}>
              {selectedCraftType ? selectedCraftType : t("selectCraftType")}
            </Label>
            <CustomIcon name="chevron-right" style={styles.rightIconStyle} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.craftRow}
          onPress={() => {
            setValue("brand", craftBrand ? craftBrand : '');
            setAlertType("brand");
            setShowAlert(true);
          }}
        >
          <Label style={styles.title}>{t("brand")}</Label>
          <Label style={styles.value}>{craftBrand ? craftBrand : t("optional")}</Label>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.craftRow}
          onPress={() => {
            setValue("modelName", craftModel ? craftModel : '');
            setAlertType("model");
            setShowAlert(true);
          }}
        >
          <Label style={styles.title}>{t("Model")}</Label>
          <Label style={styles.value}>{craftModel ? craftModel : t("optional")}</Label>
        </TouchableOpacity>
      </View>
      <ModalSlide
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowModal(false);
          }}
          style={{ flex: 1 }}
        ></TouchableOpacity>
        <View style={[styles.modalView]}>
          <View style={styles.line}></View>
          <Label style={styles.delayStartText}>{t("craft")}</Label>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 59 }}
            style={{ height: screenHeight / 2 - 70 }}
          >
            {craftsType.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  activeOpacity={1}
                  onPress={() => {

                    setSelectedCraftType(item?.type);
                    setEnableSave(true)
                    setShowModal(false);
                  }}
                  style={styles.listText}
                >
                  <Label
                    style={[
                      styles.itemText,
                      {
                        color:
                          selectedCraftType === item.type
                            ? Color.BLUE_500
                            : Color.GREY_600,
                      },
                    ]}
                  >
                    {item.type}
                  </Label>
                  {selectedCraftType === item.type && (
                    <CustomIcon name="check" style={styles.checkIconStyle} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ModalSlide>

      <CustomModalBox
        dialogTitle={t("addBrand")}
        dialogSubTitle={t("addBrandSubTitle")}
        modalVisible={showAlert && alertType === "brand"}
        leftButtonName={t("cancel")}
        rightButtonName={t("ok")}
        handleCancel={() => {
          setShowAlert(false);
          setAlertType("");
        }}
        handleConfirm={() => {
          setCraftBrand(getValues("brand"))
          setShowAlert(false);
          setAlertType("");
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
            name="brand"
            rules={{
              required: {
                value: false,
              },
            }}
          />
        </View>
      </CustomModalBox>

      <CustomModalBox
        dialogTitle={t("addModel")}
        dialogSubTitle={t("addModelSubtitle")}
        modalVisible={showAlert && alertType === "model"}
        leftButtonName={t("cancel")}
        rightButtonName={t("ok")}
        handleCancel={() => {
          setShowAlert(false);
          setAlertType("");
        }}
        handleConfirm={() => {
          setCraftModel(getValues("modelName"))
          setShowAlert(false);
          setAlertType("");
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
            name="modelName"
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
}

export default AddCrfatScreen;
