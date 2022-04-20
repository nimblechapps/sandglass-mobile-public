import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import HeaderTitle from '../../../components/HeaderTitle';
import Label from '../../../components/Label';

import styles from './styles';
import { AuthAction } from '../../../state/ducks/auth';
import { useDispatch } from 'react-redux';

const PrivacyPolicyScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [privacyPolicy, setPrivacyPolicy] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle titleStyle={styles.titleStyle} title={t('privacyPolicy')} />
        });
    }, [navigation])

    useEffect(() => {
        getPrivacyPolicy();
    }, [])

    const getPrivacyPolicy = async () => {
        const params = {
            type: "privacypolicy"
        }

        dispatch(AuthAction.getPreference(params,
            (success) => {
                const temp = success?.payload.message;
                setPrivacyPolicy(temp)
            },
            (error) => { }))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                {privacyPolicy.map((item, index) => {
                    return (
                        <>
                            <Label style={styles.textStyles}>
                                {item.question}
                            </Label>
                            <Label style={styles.textStyles}>
                                {item.answer}
                            </Label>
                        </>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default PrivacyPolicyScreen;