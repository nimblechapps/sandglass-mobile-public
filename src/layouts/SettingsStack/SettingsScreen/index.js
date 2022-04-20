import React, { useState, useLayoutEffect } from 'react';
import { View, ScrollView, SafeAreaView, Platform, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'
import Routes from '../../../navigation/Routes';
import HeaderTitle from '../../../components/HeaderTitle';
import SettingButton from '../../../components/SettingButtons';
import ConformModal from '../../../components/ConformModal';
import Label from '../../../components/Label';
import { Toast } from '../../../utils/variable';
import { CommonAction } from '../../../state/ducks/common';
import styles from './styles';
import { AuthAction } from '../../../state/ducks/auth';

const SettingsScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const { navigate } = navigation;
    const dispatch = useDispatch()
    const [logOut, setLogOut] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={t('settings')} />
        });
    }, [navigation]);

    const onConfirmLogout = async (data) => {
        setLogOut(false)
        const toastData = { type: Toast.SUCCESS, message: t('loggedOut') };
        dispatch(CommonAction.showToast(toastData))
        dispatch(AuthAction.signOut())
        dispatch(CommonAction.setIsFromSignOut(true))
        // setTimeout(() => {
        //     navigate(Routes.SignInOptions)
        // }, 2000);
    }

    return (
        <>
            <SafeAreaView style={styles.main}>
                <ScrollView>
                    <View style={styles.group}>
                        <SettingButton
                            title={'accounts'}
                            onPress={() => {
                                navigate(Routes.Account)
                            }}
                        />
                        <SettingButton
                            title={'manageSubscription'}
                            onPress={() => {
                                if (Platform.OS === 'ios') {
                                    Linking.openURL(
                                        "https://apps.apple.com/account/subscriptions"
                                    );
                                } else {
                                    Linking.openURL(
                                        "https://play.google.com/store/account/subscriptions"
                                    );
                                }
                                // navigate(Routes.Subscribe)
                            }}
                            style={styles.noBorder}
                        />
                    </View>

                    <View style={styles.group}>
                        <SettingButton
                            title={'about'}
                            onPress={() => {
                                navigate(Routes.About)
                            }}
                        />
                        <SettingButton
                            title={'whatsNew'}
                            onPress={() => {
                                navigate(Routes.Updates)
                            }}
                            style={styles.noBorder}
                        />
                    </View>

                    <View style={styles.group}>
                        <SettingButton
                            title={'unitMeasurement'}
                            onPress={() => {
                                navigate(Routes.UnitMeasurement)
                            }}
                        />
                        <SettingButton
                            title={'sessionType'}
                            onPress={() => {
                                navigate(Routes.SessionType)
                            }}
                        />
                        <SettingButton
                            title={'manageCraft'}
                            onPress={() => {
                                navigate(Routes.Craft)
                            }}
                            style={styles.noBorder}
                        />
                    </View>

                    <View style={styles.group}>
                        <SettingButton
                            title={'contactSupport'}
                            onPress={() => {
                                navigate(Routes.Help)
                            }}
                        />
                        <SettingButton
                            title={'leaveAReview'}
                            style={styles.noBorder}
                        />
                    </View>

                    <View style={styles.group}>
                        <SettingButton
                            title={'permissions'}
                            onPress={() => {
                                navigate(Routes.Permissions)
                            }}
                        />
                        <SettingButton
                            title={'termsServiceSecond'}
                            onPress={() => {
                                navigate(Routes.TermsService)
                            }}
                        />
                        <SettingButton
                            title={'privacyPolicy'}
                            onPress={() => {
                                navigate(Routes.PrivacyPolicy)
                            }}
                            style={styles.noBorder}
                        />
                    </View>
                    <View style={styles.logoutBox}>
                        <Label style={styles.logoutTitle} onPress={() => {
                            setLogOut(true)
                        }}>{t('logOut')}</Label>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <ConformModal
                visible={logOut}
                modaltitle={t('logout')}
                modalTitleStyle={styles.modalTitleStyle}
                alertText={t('areYouLogout')}
                modalTxtStyle={styles.modalTxtStyle}
                onConfirmPress={() => {
                    onConfirmLogout()
                }}
                onCancelPress={() => { setLogOut(false) }}
            />
        </>
    )
}

export default SettingsScreen;