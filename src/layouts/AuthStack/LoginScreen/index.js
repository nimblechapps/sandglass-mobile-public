import React, { useState, useLayoutEffect } from 'react';
import { View, StatusBar, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from '../../../utils/variable';
import Routes from '../../../navigation/Routes';
import { CommonAction } from '../../../state/ducks/common';
import { REGEX } from '../../../utils/validation';
import HeaderTitle from '../../../components/HeaderTitle';
import FloatingInput from '../../../components/FloatingInput'
import Label from '../../../components/Label';
import CustomButton from '../../../components/CustomButton';
import { Color } from '../../../utils/theme';
import * as RNIap from 'react-native-iap';

import styles from './styles';
import { AuthAction } from '../../../state/ducks/auth';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const LoginScreen = ({ navigation }) => {

    // const data = useSelector(state => state.auth.userData);
    // console.log("---data---", data);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { navigate } = navigation;
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all" });
    const [password, setPassword] = useState({ show: false });

    const showHidePassword = () => {
        setPassword({ show: !password.show });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={t('login')} />
        });
    }, [navigation]);

    const onSignInPress = (data) => {
        Keyboard.dismiss();
        // const toastData = { type: Toast.SUCCESS, message: t('loggedSuccessfully') };
        // dispatch(CommonAction.showToast(toastData))
        // setTimeout(() => {
        //     navigate(Routes.Tab)
        // }, 2000);
        const params = {
            email: data?.email,
            password: data?.password,
        }
        dispatch(AuthAction.logIn(params,
            (success) => { navigate(Routes.Tab) },
            (error) => { }))
    }

    return (
        <>
            <MyStatusBar backgroundColor={Color.TRANSPARENT} barStyle="dark-content" />
            <KeyboardAwareScrollView
                scrollEnabled={scrollEnabled}
                enableResetScrollToCoords={false}
                extraHeight={100}
                enableOnAndroid={true}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FloatingInput
                            placeholder={t('enterEmail')}
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors?.email?.message}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            returnKeyType={"next"}
                        />
                    )}
                    name="email"
                    rules={{
                        required: { value: true, message: JSON.stringify([{ valid: false, title: t('emailEmpty') }]) },
                        pattern: { value: REGEX.EMAIL, message: JSON.stringify([{ valid: false, title: t('emailInvalid') }]) },
                    }}
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <FloatingInput
                            placeholder={t('password')}
                            secureTextEntry={!password.show}
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors?.password?.message}
                            iconName={password.show ? 'eye-open' : 'eye-closed'}
                            disabledIcon={false}
                            onPressIcon={showHidePassword}
                            autoCapitalize='none'
                            returnKeyType={"next"}
                        />
                    )}
                    name="password"
                    rules={{
                        required: { value: true, message: JSON.stringify([{ valid: false, title: t('passwordEmpty') }]) }
                    }}
                />
                <Label style={styles.forgotPasswordLinkText} onPress={() => {
                    navigate(Routes.FrogotPassword)
                }}>{t('forgotPasswordLink')}</Label>
                <CustomButton
                    buttonCustomStyle={styles.buttonCustomStyle}
                    disabled={!isValid}
                    title={t('signin')}
                    onPress={handleSubmit(onSignInPress)}
                />
                <View style={styles.alreadyAccountMain}>
                    <Label style={styles.alreadyAccountText}>{t('donthaveAccount')}</Label>
                    <Label style={styles.signinText} onPress={() => {
                        navigate(Routes.Subscribe)
                    }}>{t('getStarted')}</Label>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}

export default LoginScreen;