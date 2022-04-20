import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import SegmentedControlTab from "react-native-segmented-control-tab";
import HeaderTitle from '../../../components/HeaderTitle';
import HeaderRight from '../../../components/HeaderRight';
import { Color } from '../../../utils/theme';
import CustomIcon from '../../../components/CustomIcon';
import Label from '../../../components/Label';
import ModalSlide from '../../../components/ModalSlide';
import { screenHeight } from '../../../utils/globals';
import { AuthAction } from '../../../state/ducks/auth';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { isTimeTrial } from '../../../state/ducks/auth/action';

const StartSettingsScreen = ({ navigation, route }) => {
    const { t } = useTranslation();
    const { navigate } = navigation;
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [delayTimeModal, setDelayTimeModal] = useState(false);
    const [delayTime, setDelayTime] = useState('3s');

    const [timeTrialModal, setTimeTrialModal] = useState(false);
    const [timeTrial, setTimeTrial] = useState('');
    const [distanceTrial, setDistanceTrial] = useState('Off');
    const [isTimeselect, setisTimeselect] = useState(true);
    const [isSettingsUpdated, setIsSettingsUpdated] = useState(false);

    const [segment, setSegment] = useState(0);
    const isLiveView = useSelector(state => state.auth.isLiveView);
    const delayStart = useSelector(state => state.auth.delayStart);
    const timeTrialState = useSelector(state => state.auth.timeTrial);
    const isTimeTrial = useSelector(state => state.auth.isTimeTrial);

    useLayoutEffect(() => {
        const action = [{
            buttonTitle: t('done'),
            titleStyle: { color: Color.BLUE_500 },
            onPress: onDonePress,
        }];
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={t('startSettings')} />,
            headerRight: () => <HeaderRight actions={action} />,
        });
    }, [navigation, isSettingsUpdated, delayTime, isEnabled, timeTrial, distanceTrial])

    useEffect(() => {
        delayStart !== '' && setDelayTime(delayStart)
    }, [delayStart])

    useEffect(() => {
        setIsEnabled(isLiveView)
    }, [isLiveView])

    useEffect(() => {
        setisTimeselect(isTimeTrial)
        setSegment(isTimeTrial ? 0 : 1)
    }, [isTimeTrial])

    useEffect(() => {
        console.log('timeTrialState', timeTrialState);
        timeTrialState !== '' && isTimeTrial ? setTimeTrial(timeTrialState) : setDistanceTrial(timeTrialState)
    }, [isTimeTrial, timeTrialState])

    const onDonePress = () => {
        // route.params.onSettings({
        //     isLive: isEnabled,
        //     delayTime: delayTime,
        //     timeTrial: isTimeselect ? timeTrial : distanceTrial,
        //     isTime: isTimeselect
        // })
        console.log('Time Trial', isTimeselect, timeTrial, distanceTrial);
        dispatch(AuthAction.isLiveView(isEnabled))
        dispatch(AuthAction.delayStart(delayTime))
        dispatch(AuthAction.timeTrial(isTimeselect ? timeTrial : distanceTrial))
        dispatch(AuthAction.isTimeTrial(isTimeselect))
        navigation.goBack()
    }

    const delayTimeListData = ['0s', '3s', '5s', '10s', '15s', '20s', '30s'];

    const timeListData = ['1 min', '2 min', '3 min', '4 min', '5 min', '6 min', '7 min'];

    const distanceListData = ['Off', '500 m', '1 km', '2 km', '3 km', '4 km', '5 km', '6 km', '7 km'];
    return (
        <>
            <ScrollView bounces={false} contentContainerStyle={styles.content}>
                <View style={styles.back}>
                    <View style={styles.liveViewBorder}>
                        <View style={styles.iconWithText}>
                            <CustomIcon name='lock' style={styles.iconStyle} />
                            <Label style={styles.iconTextStyle}>{t('liveView')}</Label>
                        </View>
                        <TouchableOpacity style={styles.texWithIcon} onPress={() => {
                            setIsEnabled(!isEnabled)
                            setIsSettingsUpdated(true)
                        }}>
                            <Switch
                                style={styles.switch}
                                trackColor={{ false: Color.RED_100, true: Color.GREEN_100 }}
                                thumbColor={isEnabled ? Color.WHITE : Color.WHITE}
                                ios_backgroundColor={Color.RED_100}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                            <Label style={styles.switchTextStyle}>{isEnabled ? t('on') : t('off')}</Label>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.liveViewBorder} onPress={() => {
                        setDelayTimeModal(true)
                    }}>
                        <View style={styles.iconWithText}>
                            <CustomIcon name='timer' style={styles.iconStyle} />
                            <Label style={styles.iconTextStyle}>{t('delayStart')}</Label>
                        </View>
                        <View style={styles.texWithIcon}>
                            <Label style={styles.rightTextStyle}>{delayTime}</Label>
                            <CustomIcon name='chevron-right' style={styles.rightIconStyle} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.liveView} onPress={() => {
                        setTimeTrialModal(true)
                    }}>
                        <View style={styles.iconWithText}>
                            <CustomIcon name='clock' style={styles.iconStyle} />
                            <Label style={styles.iconTextStyle}>{t('timeTrial')}</Label>
                        </View>
                        <View style={styles.texWithIcon}>
                            <Label style={styles.rightTextStyle}>{isTimeselect ? timeTrial : distanceTrial}</Label>
                            <CustomIcon name='chevron-right' style={styles.rightIconStyle} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ModalSlide
                visible={delayTimeModal}
                onRequestClose={() => {
                    setDelayTimeModal(!delayTimeModal);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setDelayTimeModal(false)
                    }}
                    style={{ flex: 1 }}
                ></TouchableOpacity>
                <View style={styles.modalView}>
                    <View style={styles.line}></View>
                    <Label style={styles.delayStartText}>{t('delayStart')}</Label>
                    <ScrollView style={{ height: screenHeight / 2 - 70 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
                        {
                            delayTimeListData.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index.toString()}
                                        activeOpacity={1}
                                        onPress={() => {
                                            setDelayTime(item)
                                            setIsSettingsUpdated(true)
                                            setDelayTimeModal(false)
                                        }}
                                        style={styles.listText}
                                    >
                                        <Label style={[styles.itemText, { color: delayTime === item ? Color.BLUE_500 : Color.GREY_600 }]}>{item}</Label>
                                        {delayTime === item && <CustomIcon name='check' style={styles.checkIconStyle} />}
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </ModalSlide>

            <ModalSlide
                visible={timeTrialModal}
                onRequestClose={() => {
                    setTimeTrialModal(!timeTrialModal);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setTimeTrialModal(false)
                    }}
                    style={{ flex: 1 }}
                ></TouchableOpacity>
                <View style={styles.modalView}>
                    <View style={styles.line}></View>
                    <Label style={styles.delayStartText}>{t('timeTrial')}</Label>
                    <View style={styles.segmentedControlTabStyle}>
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
                                values={[t('time'), t('Distance')]}
                                onTabPress={index => {
                                    setSegment(index)
                                }}
                            />
                        </View>
                    </View>

                    <ScrollView style={{ height: screenHeight / 2 - 70 }} contentContainerStyle={{ paddingHorizontal: 16 }}>

                        {segment === 0 &&
                            timeListData.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index.toString()}
                                        activeOpacity={1}
                                        onPress={() => {
                                            setTimeTrial(item)
                                            setIsSettingsUpdated(true)
                                            setTimeTrialModal(false)
                                            setisTimeselect(true)
                                        }}
                                        style={styles.listText}
                                    >
                                        <Label style={[styles.itemText, { color: timeTrial === item ? Color.BLUE_500 : Color.GREY_600 }]}>{item}</Label>
                                        {timeTrial === item && <CustomIcon name='check' style={styles.checkIconStyle} />}
                                    </TouchableOpacity>
                                )
                            })
                        }
                        {segment === 1 &&
                            distanceListData.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index.toString()}
                                        activeOpacity={1}
                                        onPress={() => {
                                            setDistanceTrial(item)
                                            setIsSettingsUpdated(true)
                                            setTimeTrialModal(false)
                                            setisTimeselect(false)
                                        }}
                                        style={styles.listText}
                                    >
                                        <Label style={[styles.itemText, { color: distanceTrial === item ? Color.BLUE_500 : Color.GREY_600 }]}>{item}</Label>
                                        {distanceTrial === item && <CustomIcon name='check' style={styles.checkIconStyle} />}
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </ModalSlide>
        </>
    )
}

export default StartSettingsScreen;