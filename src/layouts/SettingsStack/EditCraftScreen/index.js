import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Label from "../../../components/Label";
import HeaderTitle from "../../../components/HeaderTitle";
import HeaderRight from "../../../components/HeaderRight";
import { useTranslation } from "react-i18next";
import { Color } from "../../../utils/theme";
import ModalSlide from "../../../components/ModalSlide";
import { screenHeight } from "../../../utils/globals";
import CustomIcon from "../../../components/CustomIcon";
import CustomAlertBox from "../../../components/CustomAlertBox";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "../../../components/CustomButton";
import CustomModalBox from "../../../components/CustomModalBox";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { CraftAction } from "../../../state/ducks/craft";
import { useIsFocused } from "@react-navigation/native";

function EditCraftScreen({ navigation, route }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [selectedCraftType, setSelectedCraftType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [craftsType, setCraftType] = useState([]);
  const selectedCraft = route.params.selectedCraft;
  const [enableSave, setEnableSave] = useState(false);

  console.log('----selectedCraft---', selectedCraft);

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
        <HeaderTitle titleStyle={styles.titleStyle} title={t("editCraft")} />
      ),
      headerRight: () => <HeaderRight actions={action} />,
    });
  }, [navigation, enableSave, selectedCraftType]);

  useEffect(() => {
    if (isFocused) {
      getCraftTypes();
    }
  }, [isFocused])

  useEffect(() => {
    selectedCraft && setSelectedCraftType(selectedCraft.type)
  }, [selectedCraft])

  const onDonePress = () => {
    const params = {
      craftId: selectedCraft.id,
      type: selectedCraftType,
      brand: selectedCraft.brand,
      model: selectedCraft.model
    }
    dispatch(CraftAction.editCraft(params,
      (success) => { navigation.goBack(); },
      (error) => { }))
  }

  const getCraftTypes = () => {
    dispatch(CraftAction.getCraftTypes(
      (success) => {
        const temp = success.payload;
        console.log('craftsType', success);
        setCraftType(temp);
      },
      (error) => { }))
  }

  const deleteCraft = () => {
    const params = {
      craftId: selectedCraft.id
    }
    dispatch(CraftAction.deleteCraft(params,
      (success) => { navigation.goBack() },
      (error) => { }))
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.craftInfo}>
          <View style={styles.craftRow}>
            <Label style={styles.title}>{t("type")}</Label>
            <TouchableOpacity
              style={styles.inlineDataIcon}
              onPress={() => setShowModal(true)}
            >
              <Label style={styles.value}>{selectedCraftType}</Label>
              <CustomIcon name="chevron-right" style={styles.rightIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.craftRow}>
            <Label style={styles.title}>{t("brand")}</Label>
            <Label
              style={styles.value}
              onPress={() => {
                setValue("brand", selectedCraft.brand);
                setAlertType("brand");
                setShowAlert(true);
              }}
            >
              {selectedCraft.brand ? selectedCraft.brand : t("Optional")}
            </Label>
          </View>
          <View style={[styles.craftRow, { borderBottomWidth: 0 }]}>
            <Label style={styles.title}>{t("model")}</Label>
            <Label
              style={styles.value}
              onPress={() => {
                setAlertType("model");
                setValue("modelName", selectedCraft.model);
                setShowAlert(true);
              }}
            >
              {selectedCraft.model ? selectedCraft.model : t("Optional")}
            </Label>
          </View>
        </View>
        <View style={styles.deleteButton}>
          <Label style={styles.buttonTitle} onPress={() => deleteCraft()}>
            {t("deleteCraft")}
          </Label>
        </View>
      </ScrollView>

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
                    setSelectedCraftType(item.type);
                    setEnableSave(true);
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
        dialogTitle={t("editModel")}
        dialogSubTitle={t("editModelSubTitle")}
        modalVisible={showAlert && alertType === "model"}
        leftButtonName={t("cancel")}
        rightButtonName={t("ok")}
        handleCancel={() => {
          setShowAlert(false);
          setAlertType("");
        }}
        handleConfirm={() => {
          selectedCraft.model = getValues("modelName");
          setEnableSave(true)
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

      <CustomModalBox
        dialogTitle={t("editBrand")}
        dialogSubTitle={t("editBrandTitle")}
        modalVisible={showAlert && alertType === "brand"}
        leftButtonName={t("cancel")}
        rightButtonName={t("ok")}
        handleCancel={() => {
          setShowAlert(false);
          setAlertType("");
        }}
        handleConfirm={() => {
          selectedCraft.brand = getValues("brand");
          setEnableSave(true)
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
    </>
  );
}

export default EditCraftScreen;
