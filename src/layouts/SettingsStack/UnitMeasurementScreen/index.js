import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import HeaderTitle from '../../../components/HeaderTitle';
import Label from '../../../components/Label';
import SegmentedControlTab from "react-native-segmented-control-tab";
import styles from './styles';

const UnitMeasurementScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const { navigate } = navigation;
    const [segment, setSegment] = useState(1);
    const [speedSegment, setSpeedSegment] = useState(1);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle titleStyle={styles.titleStyle} title={t('unitMeasurement')} />,
        });
    }, [navigation])

    return (
        <>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.main}>
                    <Label style={styles.distanceStyle}>{t('distance')}</Label>
                    <View style={styles.segmentedControlTabStyleBack}>
                        <SegmentedControlTab
                            tabsContainerStyle={styles.tabsContainerStyle}
                            firstTabStyle={styles.firstTabStyle}
                            tabStyle={styles.tabStyle}
                            tabTextStyle={styles.tabTextStyle}
                            activeTabStyle={styles.activeTabStyle}
                            activeTabTextStyle={styles.activeTabTextStyle}
                            selectedIndex={segment}
                            allowFontScaling={false}
                            borderRadius={16}
                            values={[t('KM'), t('Mi'), t('NM')]}
                            onTabPress={index => {
                                setSegment(index)
                            }}
                        />
                    </View>
                </View>
                <View style={styles.main}>
                    <Label style={styles.distanceStyle}>{t('speed')}</Label>
                    <View style={[styles.segmentedControlTabStyleBack, { width: 163 }]}>
                        <SegmentedControlTab
                            tabsContainerStyle={styles.tabsContainerStyle}
                            firstTabStyle={styles.firstTabStyle}
                            tabStyle={styles.tabStyle}
                            tabTextStyle={styles.tabTextStyle}
                            activeTabStyle={styles.activeTabStyle}
                            activeTabTextStyle={styles.activeTabTextStyle}
                            selectedIndex={speedSegment}
                            allowFontScaling={false}
                            borderRadius={16}
                            values={[t('Km/h'), t('Knots')]}
                            onTabPress={index => {
                                setSpeedSegment(index)
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default UnitMeasurementScreen;