import React, { useLayoutEffect } from 'react';
import { ScrollView , View } from 'react-native';
import { useTranslation } from 'react-i18next';
import HeaderTitle from '../../../components/HeaderTitle';
import SettingButton from '../../../components/SettingButtons';
import Routes from '../../../navigation/Routes';

import styles from './styles';

const HelpScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const { navigate } = navigation;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle titleStyle={styles.titleStyle} title={t('help')} />
        });
    }, [navigation])

    return (
        <>
            <ScrollView contentContainerStyle={styles.contentContainerStyle} bounces={false}>
            <View style={styles.group}>
                    <SettingButton
                        title={'Report a problem'}
                        onPress={() => {
                            navigate(Routes.ReportProblem)
                        }}
                    />
                    <SettingButton
                        title={'Request a feature'}/>
                     <SettingButton
                        title={'General inquiry'}
                        style={styles.noBorder}
                    />
                </View>

            </ScrollView>
        </>
    )
}

export default HelpScreen;