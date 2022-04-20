import React, { useState, useLayoutEffect } from 'react';
import { View, StatusBar, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
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

import styles from './styles';
import { AuthAction } from '../../../state/ducks/auth';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const ForgotPasswordScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { navigate } = navigation;
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all" });
    const [isChecked, setIsChecked] = useState(false);
    const [paramsData, setParamsData] = useState()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={t('forgotPassword')} />
        });
    }, [navigation]);

    const onResetPress = (data) => {
        Keyboard.dismiss();
        // const toastData = { type: Toast.SUCCESS, message: t('linkReset') };
        // dispatch(CommonAction.showToast(toastData))
        // setTimeout(() => {
        //     navigate(Routes.Login)
        // }, 2000);
        const params = {
            email: data?.email
        }
        dispatch(AuthAction.forgotPassowrd(params, (success) => { }, (error) => { }))
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
                <Label style={styles.lableText}>{t('receiveInstructions')}</Label>
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
                <CustomButton
                    buttonCustomStyle={styles.buttonCustomStyle}
                    titleStyle={styles.buttonTextStyle}
                    disabled={!isValid}
                    title={t('reset')}
                    onPress={handleSubmit(onResetPress)}
                />
            </KeyboardAwareScrollView>
        </>
    )
}

export default ForgotPasswordScreen;