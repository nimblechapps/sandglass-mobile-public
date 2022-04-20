import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
// import { useTranslation } from 'react-i18next';

import { Color } from "../../utils/theme";

const ProgressHud = () => {

    // const { t } = useTranslation();
    const animating = useSelector(state => state.common.isLoading);

    if (animating) {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator
                        style={styles.indicatorStyle}
                        animating={true}
                        color={Color.WHITE}
                        size="large" />
                    <Text style={styles.pleaseWaitText}>
                        {'Please Wait'}
                    </Text>
                </View>
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: Color.TRANSPARENT,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10
    },
    centerContainer: {
        backgroundColor: Color.BLACK,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    indicatorStyle: {
        alignSelf: "center",
        marginTop: 15,
        marginBottom: 10,
    },
    pleaseWaitText: {
        color: Color.WHITE,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    }
});

export default ProgressHud;