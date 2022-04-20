import React, { useState, useLayoutEffect } from 'react';
import { View, StatusBar, Keyboard, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from '../../../utils/variable';
import Routes from '../../../navigation/Routes';
import { CommonAction } from '../../../state/ducks/common';
import { REGEX, validatePassword } from '../../../utils/validation';
import FloatingInput from '../../../components/FloatingInput'
import Checkbox from '../../../components/Checkbox';
import Label from '../../../components/Label';
import CustomButton from '../../../components/CustomButton';
import HeaderTitle from '../../../components/HeaderTitle';
import { Color } from '../../../utils/theme';

import styles from './styles';
import { AuthAction } from '../../../state/ducks/auth';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const SignUpEmailScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { navigate } = navigation;
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const { control, handleSubmit, getValues, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const [password, setPassword] = useState({ show: false });
    const [isChecked, setIsChecked] = useState(false);

    const showHidePassword = () => {
        setPassword({ show: !password.show });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={t('createAccount')} />
        });
    }, [navigation]);

    const onContinuePress = (data) => {

        Keyboard.dismiss();
        const params = {
            name: data?.yourName,
            email: data?.email,
            password: data?.password,
        }
        dispatch(AuthAction.signUp(params,
            (response) => {
                const { status, message } = response;
                navigation.goBack()
            },
            (error) => {
            }));
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
                            placeholder={t('yourName')}
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors?.yourName?.message}
                            autoCapitalize='none'
                            returnKeyType={"next"}
                        />
                    )}
                    name="yourName"
                    rules={{
                        required: { value: true, message: JSON.stringify([{ valid: false, title: t('yourNameEmpty') }]) },
                        pattern: { value: REGEX.NAME, message: JSON.stringify([{ valid: false, title: t('yourNameAlphabets') }]) },
                    }}
                />
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
                        required: { value: true, message: JSON.stringify([{ valid: false, title: t('passwordEmpty') }]) },
                        validate: (value) => validatePassword(value, t),
                    }}
                />
                <Checkbox
                    style={styles.checkboxMain}
                    isChecked={isChecked}
                    onPress={setIsChecked}
                >
                    <View style={styles.textInline}>
                        <Label style={styles.checkboxText}>{t('signingAgree')}</Label>
                        <Label style={styles.linkText} onPress={() => {
                            navigate(Routes.TermsService)
                        }}>{t('terms')}</Label>
                        <Label style={styles.checkboxText}>{t('and')}</Label>
                        <Label style={styles.linkText} onPress={() => {
                            navigate(Routes.TermsService)
                        }}>{t('conditions')}</Label>
                    </View>
                </Checkbox>
                <CustomButton
                    buttonCustomStyle={styles.buttonCustomStyle}
                    disabled={!isValid || !isChecked}
                    title={t('continue')}
                    onPress={handleSubmit(onContinuePress)}
                />
                <View style={styles.alreadyAccountMain}>
                    <Label style={styles.alreadyAccountText}>{t('alreadyAccount')}</Label>
                    <Label style={styles.signinText} onPress={() => {
                        navigate(Routes.SignInOptions)
                    }}>{t('signin')}</Label>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}

export default SignUpEmailScreen;