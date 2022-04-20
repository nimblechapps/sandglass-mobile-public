import React, { useLayoutEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, TextInput, Image, StatusBar, TouchableOpacity, Keyboard } from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderTitle from '../../../components/HeaderTitle';
import SubscribeCard from '../../../components/SubscribeCard';
import Label from '../../../components/Label';
import Routes from '../../../navigation/Routes';
import ModalSlide from '../../../components/ModalSlide';
import CustomIcon from '../../../components/CustomIcon';
import { Color } from '../../../utils/theme';

import styles from './styles';
import { screenHeight } from '../../../utils/globals';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const SubscribeScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const { navigate } = navigation;
    const [redeemModal, setRedeemModal] = useState(false);
    const [redeemCode, setRedeemCode] = useState();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={t('subscribe')} />
        });
    }, [navigation]);

    const onChangeRedeemCode = (e) => {
        const re = /^[0-9\b]+$/;
        if (e === '' || re.test(e)) {
            setRedeemCode(e);
        }
    }

    const onPressBottomLink = () => {
        Keyboard.dismiss();
        setRedeemModal(false)
        navigate(Routes.TermsService)
    }

    return (
        <>
            <MyStatusBar backgroundColor={Color.TRANSPARENT} barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                    <View style={styles.contentPart}>
                        <View style={styles.topSection}>
                            <SvgCssUri uri="https://res.cloudinary.com/nimble-chapps/image/upload/v1643774414/Sandglass/vwsvrgi9ctgzih3vakrh.svg" style={styles.logo} width={136} height={32} />
                            <SubscribeCard
                                cardCustomStyle={styles.cardCustomStyle}
                                title={t('startWithWeek')}
                                onPress={() => {
                                    navigate(Routes.SignUpOptions, { productId: 'com.sandglass.free' })
                                }}
                            />
                            <SubscribeCard
                                cardCustomStyle={styles.cardCustomStyle}
                                title={t('$5.99 / month')}
                                onPress={() => {
                                    navigate(Routes.SignUpOptions, { productId: 'com.sandglass.monthly' })
                                }}
                            />
                            <SubscribeCard
                                cardCustomStyle={styles.cardCustomStyle}
                                title={t('$49.99 / year')}
                                savePercentageShow={true}
                                percentage={t('Save 36%')}
                                subTitleShow={true}
                                subTitle={t('12 months at $4.17 / month')}
                                onPress={() => {
                                    navigate(Routes.SignUpOptions, { productId: 'com.sandglass.yearly' })
                                }}
                            />
                            <Label style={styles.redeemCodeText}
                                onPress={() => {
                                    setRedeemModal(true)
                                }}
                            >{t('redeemCode')}</Label>
                        </View>
                        <View style={styles.signPart}>
                            <View style={styles.alreadyAccountMain}>
                                <Label style={styles.alreadyAccountText}>{t('alreadyAccount')}</Label>
                                <Label style={styles.signinText} onPress={() => {
                                    navigate(Routes.SignInOptions)
                                }}>{t('signin')}</Label>
                            </View>
                            <View style={styles.alreadyAccountMain}>
                                <Label style={styles.termsText} onPress={() => {
                                    navigate(Routes.TermsService)
                                }}>{t('termsService')}</Label>
                                <Label style={[styles.alreadyAccountText, { top: -1.5 }]}>{t('and')}</Label>
                                <Label style={styles.termsText} onPress={() => {
                                    navigate(Routes.PrivacyPolicy)
                                }}>{t('privacyPolicy')}</Label>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <ModalSlide
                visible={redeemModal}
            >
                <View style={styles.modalView}>
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps="handled"
                        style={styles.contentAlign}
                        bounces={false}
                    >
                        <View style={styles.flexMain}>
                            <>
                                <Label style={styles.cancelText} onPress={() => {
                                    setRedeemModal(false);
                                }}>{t('cancel')}</Label>

                                <Image
                                    style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 40 }}
                                    source={{ uri: 'https://res.cloudinary.com/nimble-chapps/image/upload/v1643788473/Sandglass/awndnglfm8j3zzssdbj0.png' }}
                                />
                                <Label style={styles.redeemCodeModalText}>Redeem code for Ocean Journal</Label>
                            </>
                            <View style={styles.flexSecond}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={t('enterCode')}
                                    keyboardType='numeric'
                                    onChangeText={(text) => onChangeRedeemCode(text)}
                                    value={redeemCode}
                                    maxLength={4}
                                />
                                <TouchableOpacity style={styles.bottomLink} onPress={() => {
                                    onPressBottomLink();
                                }}>
                                    <Label style={styles.termsConditionsText}>{t('termsConditions')}</Label>
                                    <CustomIcon name='chevron-right' style={styles.chevronRight} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </ModalSlide >
        </>
    )
}

export default SubscribeScreen;