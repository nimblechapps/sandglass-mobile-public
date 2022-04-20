import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import HeaderTitle from '../../../components/HeaderTitle';

import styles from './styles';
import Label from '../../../components/Label';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../../state/ducks/auth';

const UpdatesScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [updates, setUpdates] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={t('updates')} />
        });
    }, [navigation])

    useEffect(() => {
        getUpdate();
    }, [])

    const getUpdate = async () => {
        const params = {
            type: "whatsnew"
        }

        dispatch(AuthAction.getPreference(params,
            (success) => {
                const temp = success?.payload.message;
                setUpdates(temp)
            },
            (error) => { }))
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                {updates.map((item, index) => {
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
        </>
    )
}

export default UpdatesScreen;