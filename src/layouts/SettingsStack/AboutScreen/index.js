import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import HeaderTitle from '../../../components/HeaderTitle';
import Label from '../../../components/Label';

import styles from './styles';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../../state/ducks/auth';

const AboutScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [aboutData, setAboutData] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={t('about')} />
        });
    }, [navigation])

    useEffect(() => {
        getAbout();
    }, [])

    const getAbout = async () => {
        const params = {
            type: "about"
        }

        dispatch(AuthAction.getPreference(params,
            (success) => {
                const temp = success?.payload.message;
                setAboutData(temp)
            },
            (error) => { }))
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                {aboutData.map((item, index) => {
                    return (
                        <>
                            {item.question !== '' && (<Label style={styles.textStyles}>
                                {item.question}
                            </Label>)}
                            <Label style={styles.textStyles}>
                                {item.answer}
                            </Label>
                        </>
                    )
                })}
            </ScrollView>
        </>
    )
}

export default AboutScreen;