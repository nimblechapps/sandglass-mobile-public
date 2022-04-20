import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import HeaderTitle from "../../../components/HeaderTitle";
import styles from "./styles";
import Label from "../../../components/Label";
import IconButton from "../../../components/IconButton";
import Routes from "../../../navigation/Routes";
import CustomIcon from "../../../components/CustomIcon";
import { CraftAction } from "../../../state/ducks/craft"
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const CraftScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [craftArray, setCraftArray] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle titleStyle={styles.titleStyle} title={t("craft")} />
      ),
    });
  }, [navigation]);


  useEffect(() => {
    if (isFocused) {
      getCraftList();
    }
  }, [isFocused])

  const getCraftList = async () => {
    dispatch(CraftAction.getCraftListAction(
      (success) => {
        const temp = success?.payload;
        setCraftArray(temp)
      },
      (error) => { }))
  }

  const onCraftBox = (item) => {
    navigate(Routes.EditCraftScreen, { selectedCraft: item });
  };

  const renderCraftButton = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.craftBox,
          { borderBottomWidth: craftArray.length === index + 1 ? 0 : 1 },
        ]}
        onPress={() => onCraftBox(item)}
      >
        <View>
          <Label style={styles.craftType}>{item.type}</Label>
          {(item.brand !== undefined && item.model !== undefined && item.brand !== "" && item.model !== "") ?
            (<Label style={styles.craftModel}>
              {item?.brand + ", " + item?.model}</Label>) :
            item.brand === undefined ?
              (<Label style={styles.craftModel}>
                {item.model}</Label>) :
              (<Label style={styles.craftModel}>
                {item.brand}</Label>)
          }
        </View>
        <View>
          <IconButton
            style={styles.settingBack}
            disabled={true}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        bounces={false}
      >
        <View style={styles.group}>
          <FlatList
            data={craftArray}
            renderItem={renderCraftButton}
            horizontal={false}
          />
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigate(Routes.AddCraftScreen);
            }}
          >
            <CustomIcon name="plus" style={styles.leftIcon} />
            <Label style={styles.addButtonText}>{t("addCraft")}</Label>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default CraftScreen;
