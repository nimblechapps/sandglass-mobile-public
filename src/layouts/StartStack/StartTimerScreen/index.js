import React, { useState } from 'react';
import { ScrollView, StatusBar, View, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Color, Font } from '../../../utils/theme';
import Label from '../../../components/Label';
import CustomIcon from '../../../components/CustomIcon';
import { Stopwatch } from 'react-native-stopwatch-timer';
import CustomButton from '../../../components/CustomButton';
import Routes from '../../../navigation/Routes';
import { TripAction } from '../../../state/ducks/trip';

import styles from './styles';
import { useEffect } from 'react';
import { CurrentLocation, StopCurrentLocation } from '../../../utils/CurrentLocation';
import _ from 'lodash';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const haversine = require('haversine');

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const StartTimerScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const { navigate } = navigation;

    const [isStopwatchStart, setIsStopwatchStart] = useState(true);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [livePreview, setLivePreview] = useState(false);

    const [speed, setSpeed] = useState(0.0);
    const [speedArray, setSpeedArray] = useState([]);

    const [distance, setDistance] = useState('');
    const [distanceArray, setDistanceArray] = useState([]);
    const [totalDistance, setTotalDistance] = useState();

    const [pace, setPace] = useState('');
    const [rawpPace, setRawPace] = useState(0);
    const [paceArray, setPaceArray] = useState([]);

    const [isFirstCall, setIsFirstCall] = useState(true);

    const [startLocation, setStartLocation] = useState({ latitude: '', longitude: '' });
    const [endLocation, setEndLocation] = useState({ latitude: '', longitude: '' });
    const [route, setRoute] = useState([]);
    const [isUpdateLocation, setIsUpdateLocation] = useState(false);

    const [isResume, setIsResume] = useState(true);

    const [duration, setDuration] = useState();

    const [checkPointLocation, setCheckPointLocation] = useState([]);
    const [saveLocation, setSaveLocation] = useState();

    const isFocused = useIsFocused();
    const isLiveView = useSelector(state => state.auth.isLiveView);
    const timeTrial = useSelector(state => state.auth.timeTrial);
    const isTimeTrial = useSelector(state => state.auth.isTimeTrial);

    const [startDateTime, setStartDateTime] = useState();
    const [endDateTime, setEndDateTime] = useState();

    const [tripAddress, setTripAddress] = useState('');

    const [tripId, setTripId] = useState('');
    const [counter, setCounter] = useState(1);
    const dispatch = useDispatch();
    let watchId;

    useEffect(() => {
        watchId = isResume && CurrentLocation((result, error) => {
            if (result) {
                if (!isFirstCall) {
                    console.log("---CurrentLocation---", result);
                    //unit of speed is meter/sec
                    let speedInKMPH = result.coords.speed !== '-1' ? result.coords.speed * 3.6 : '0'
                    speedInKMPH > 0 && setSpeed(speedInKMPH.toFixed(2))
                    calculateDistance(result);
                    //Save locations to draw path
                    setSaveLocation({ latitude: result.coords.latitude, longitude: result.coords.longitude })
                } else {
                    // console.log("---Inside First Call---", result.coords.speed);
                    setIsFirstCall(false)
                    // let initialLocation = { latitude: result.coords.latitude, longitude: result.coords.longitude }
                    getAddressFromLocation(result.coords.latitude, result.coords.longitude);
                    // let formatedAddress = formatAddress(locationAddress)

                }
            } else {
                console.log("---CurrentLocation---", error);
            }
        })
    }, [isFirstCall, isResume])

    // console.log("Address ==>", tripAddress);

    useEffect(() => {
        let currentDateTime = new Date().toLocaleString();
        setStartDateTime(currentDateTime)
    }, [])

    useEffect(() => {
        const totalDistance = _.sum(distanceArray);
        // console.log('totalDistance ====> ', totalDistance);
        setTotalDistance(totalDistance ? parseFloat(totalDistance).toFixed(2) : 0.0)

    }, [distanceArray])

    useEffect(() => {
        if (duration) {
            calculatePace(duration, totalDistance)
            // console.log("timeTrial", timeTrial);
            if (timeTrial !== "Off" && totalDistance !== 0.0 && !isTimeTrial) {
                let distanceInMeters = kmToMeters(totalDistance)
                let selectedDistance = concateMeters(timeTrial)
                // console.log('distance', distanceInMeters, selectedDistance);
                if (distanceInMeters >= selectedDistance) {
                    uploadTripData(true);
                }
            }
        }
    }, [totalDistance])

    useEffect(() => {
        if (isUpdateLocation && startLocation.latitude !== '' && startLocation.longitude !== '') {
            const distance = haversine(startLocation, endLocation)
            // console.log('start', startLocation.latitude, startLocation.longitude);
            // console.log('end', endLocation.latitude, endLocation.longitude);
            // console.log('distance ====> ', distance);
            setDistanceArray([...distanceArray, distance])
        }
        setIsUpdateLocation(false)
        setStartLocation({ latitude: endLocation?.latitude, longitude: endLocation?.longitude })

    }, [isUpdateLocation])

    useEffect(() => {
        // console.log("Raw Pace : ", typeof rawpPace);
        if (rawpPace !== "" || rawpPace !== undefined) {
            setPaceArray([...paceArray, parseFloat(rawpPace)])
        }
    }, [rawpPace])

    useEffect(() => {
        // console.log("Speed : ", typeof speed);
        if (speed !== "" || speed !== undefined) {
            setSpeedArray([...speedArray, parseFloat(speed)])
        }
    }, [speed])

    useEffect(() => {
        // console.log("savelocation: ", saveLocation);
        (saveLocation !== undefined) && setRoute([...route, saveLocation])
    }, [saveLocation])

    useEffect(() => {
        if (isTimeTrial) {
            let currentTime = timeToSeconds(duration);
            let selectedTimeTrial = getTimeInSec(timeTrial)
            if (currentTime >= selectedTimeTrial) {
                uploadTripData(true);
            }
        }

    }, [duration])

    const formatAddress = (address) => {
        let arr = address.toString().split(",");
        console.log("arr => ", arr);
        let newAddress = arr.length > 2 ? arr[0] + ',' + arr[1] + ',' + arr[2] : ""
        return newAddress;
    }

    const calculateDistance = (result) => {
        const { latitude, longitude } = result.coords;
        // console.log("startLocation ==> ", endLocation);
        // console.log("endLocation ==> ", latitude, longitude);
        // setStartLocation({ latitude: endLocation?.latitude, longitude: endLocation?.longitude })
        setEndLocation({ latitude: latitude, longitude: longitude })
        setIsUpdateLocation(true)
    }

    const calculatePace = (time, distance) => {
        let timeInSec = timeToSeconds(time);
        // console.log("Time/Distance ", timeInSec, distance);
        let pace = timeInSec / distance;// _.divide(timeInSec, distance)
        let formatedPace = formatPace(pace ? pace.toFixed(2).toString() : '0.0');
        setPace(formatedPace)
        setRawPace(pace ? pace.toFixed(2) : 0.0)
    }

    const timeToSeconds = (time) => {
        const arr = time?.split(":"); // splitting the string by colon
        if (arr && arr.length > 2) {
            const seconds = arr[0] * 3600 + arr[1] * 60 + (+arr[2]); // converting
            return seconds;
        }
    }

    const formatPace = (pace) => {
        const arr = pace.split(".");
        const mPace = arr[0] + "'" + arr[1] + "''";
        return mPace;
    }

    const getTimeInSec = (time) => {
        const arr = time.split(" ");
        const seconds = arr[0] * 60;
        return seconds;
    }

    const kmToMeters = (distance) => {
        const arr = distance.split(".");
        const meters = arr[0] * 1000 + (+arr[1] * 10);
        return meters;
    }

    const concateMeters = (distance) => {
        const arr = distance.split(" ");
        if (arr[1] === 'm') {
            return arr[0];
        } else {
            const meters = arr[0] * 1000;
            return meters;
        }
    }
    const avgSpeed = (speed) => {
        return _.mean(speed);
    }
    const maxSpeed = (speed) => {
        return _.max(speed);
    }
    const avgPace = (pace) => {
        return _.mean(pace);
    }
    const bestPace = (pace) => {
        return _.max(pace);
    }
    const clearData = () => {
        setSpeedArray([])
        setPaceArray([])
        setRoute([])
    }

    const getAddressFromLocation = async (latitude, longitude) => {
        let locationAddress =
            await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},
            ${longitude}&key=AIzaSyCkyEoZl1PFhLb7LOEDWvEQj_ZAZN6v7rA`)

        let address = locationAddress?.data?.results[0]?.formatted_address;
        console.log("Address ==>", address);
        let formatedAddress = formatAddress(address)
        console.log("formatedAddress ==>", formatedAddress);
        setTripAddress(formatedAddress)
    }

    const uploadTripData = (isTimeTrialSelected) => {
        let lapNames = "Lap " + counter
        setCounter(counter + 1)
        const params = {
            data: {
                lapDetails: {
                    route: route,
                    speed: parseFloat(avgSpeed(speedArray).toFixed(2)),
                    pace: parseFloat(avgPace(paceArray).toFixed(2)),
                    distance: parseFloat(totalDistance),
                    startLocation: route[0],
                    endLocation: route[route.length - 1],
                    maxSpeed: maxSpeed(speedArray),
                    bestPace: bestPace(paceArray),
                    duration: duration,
                    lapName: lapNames
                }
            },
            tripId: tripId
        }
        // console.log("Lap Details", params);

        dispatch(TripAction.saveTrip(params,
            (success) => {
                setTripId(success.payload.id)
                StopCurrentLocation(watchId);
                clearData();
                setIsResume(false)
                if (isTimeTrialSelected) {
                    onFinishClick();
                }
            },
            (error) => { }))
    }

    const onPauseClick = () => {
        setIsStopwatchStart(!isStopwatchStart);
        uploadTripData(false);

    }

    const onFinishClick = () => {
        // console.log("Speed Array => ", speedArray);
        // console.log("Pace Array => ", paceArray);
        let endDate = new Date().toLocaleString();
        const params = {
            tripDetails: {
                startAddress: tripAddress,
                startDate: startDateTime,
                endDate: endDate
            },
            data: {
                tripId: tripId
            }
        }
        console.log("onFinishClick => ", params.tripDetails);
        dispatch(TripAction.completeTrip(params,
            (success) => {
                StopCurrentLocation(watchId);
                setIsResume(false)
                setTotalDistance(null)
                navigate(Routes.Result, { tripId: tripId })
            },
            (error) => { }))

    }

    return (
        <>
            <MyStatusBar backgroundColor={Color.TRANSPARENT} barStyle={livePreview ? "light-content" : "dark-content"} />
            <SafeAreaView style={[styles.contentMain, { backgroundColor: livePreview ? Color.GREY_900 : Color.WHITE }]}>

                <ScrollView contentContainerStyle={styles.contentContainerStyle}>

                    <View style={styles.locationView}>
                        <CustomIcon name='location-1' style={styles.locationIcon} />
                        <Label style={[styles.locationText, { color: livePreview ? Color.WHITE : Color.GREY_900 }]}>Rose Bay</Label>
                    </View>

                    <View>
                        <Stopwatch
                            laps
                            start={isStopwatchStart}
                            reset={resetStopwatch}
                            options={livePreview ? optionsDark : options}
                            getTime={(time) => setDuration(time)}
                        />

                        <Label style={[styles.duration, { color: livePreview ? Color.GREY_400 : Color.GREY_600 }]}>{t('duration')}</Label>

                        <View style={styles.detailsView}>
                            <View style={[styles.detailsParts, { borderTopColor: livePreview ? Color.GREY_700 : Color.GREY_200 }]}>
                                <View style={styles.kmh}>
                                    <Label style={[styles.numberTitle, { color: livePreview ? Color.WHITE : Color.GREY_900 }]}>{speed}</Label>
                                    <Label style={styles.subTitleSqure}>{t('kmh')}</Label>
                                </View>
                                <Label style={[styles.subTitle, { color: livePreview ? Color.GREY_400 : Color.GREY_600 }]}>{t('speed')}</Label>
                            </View>
                            <View style={[styles.detailsParts, { borderTopColor: livePreview ? Color.GREY_700 : Color.GREY_200 }]}>
                                <View style={styles.kmh}>
                                    <Label style={[styles.numberTitle, { color: livePreview ? Color.WHITE : Color.GREY_900 }]}>{totalDistance}</Label>
                                    <Label style={styles.subTitleSqure}>{t('km')}</Label>
                                </View>
                                <Label style={[styles.subTitle, { color: livePreview ? Color.GREY_400 : Color.GREY_600 }]}>{t('Distance')}</Label>
                            </View>
                        </View>

                        <View style={styles.detailsView}>
                            <View style={[styles.detailsParts, { borderTopColor: livePreview ? Color.GREY_700 : Color.GREY_200 }]}>
                                <View style={styles.kmh}>
                                    <Label style={[styles.numberTitle, { color: livePreview ? Color.WHITE : Color.GREY_900 }]}>{pace}</Label>
                                </View>
                                <Label style={[styles.subTitle, { color: livePreview ? Color.GREY_400 : Color.GREY_600 }]}>{t('pace')}</Label>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 'auto', flex: 1, justifyContent: 'flex-end', paddingBottom: 16 }}>

                        {(isStopwatchStart && !livePreview && isLiveView) &&
                            <CustomButton
                                buttonCustomStyle={styles.liveViewStyle}
                                title={t('liveView')}
                                titleStyle={styles.titleStyle}
                                iconLeftName='lock'
                                iconCustomLeftStyle={styles.iconCustomLeftStyle}
                                onPress={() => {
                                    setLivePreview(!livePreview);
                                }}
                            />
                        }

                        {(isStopwatchStart && !livePreview) &&
                            <View>
                                <CustomButton
                                    buttonCustomStyle={styles.timerButtonCustomStyle}
                                    iconLeftName={'pause'}
                                    iconCustomLeftStyle={styles.pauseCustomLeftStyle}
                                    onPress={() => onPauseClick()}
                                />
                                <Label style={styles.pauseTitle}>{t('pause')}</Label>
                            </View>
                        }

                        {!isStopwatchStart &&
                            <View style={styles.inlineButons}>
                                <View>
                                    <CustomButton
                                        buttonCustomStyle={styles.resumeBtnCustomStyle}
                                        iconLeftName={'start'}
                                        iconCustomLeftStyle={styles.pauseCustomLeftStyle}
                                        onPress={() => {
                                            setIsStopwatchStart(!isStopwatchStart);
                                            //setResetStopwatch(false);
                                            setIsResume(true)
                                        }}
                                    />
                                    <Label style={styles.pauseTitle}>{t('resume')}</Label>
                                </View>
                                <View>
                                    <CustomButton
                                        buttonCustomStyle={styles.finishBtnCustomStyle}
                                        iconLeftName={'end'}
                                        iconCustomLeftStyle={styles.pauseCustomLeftStyle}
                                        onPress={() => onFinishClick()}
                                    />
                                    <Label style={styles.pauseTitle}>{t('finish')}</Label>
                                </View>
                            </View>
                        }

                        {livePreview &&
                            <CustomButton
                                buttonCustomStyle={styles.holdUnlockStyle}
                                title={t('holdUnlock')}
                                titleStyle={styles.holdUnlockTextStyle}
                                delayLongPress={1000}
                                onLongPress={() => {
                                    setLivePreview(!livePreview);
                                }}
                            />
                        }
                    </View>

                </ScrollView>

            </SafeAreaView>
        </>
    )
}

const options = {
    container: {
        marginTop: 64,
        alignItems: 'center',
    },
    text: {
        fontFamily: Font.SFPROTEXTBOLD,
        fontSize: 64,
        color: Color.GREY_900
    },
};

const optionsDark = {
    container: {
        marginTop: 64,
        alignItems: 'center',
    },
    text: {
        fontFamily: Font.SFPROTEXTBOLD,
        fontSize: 64,
        color: Color.WHITE
    },
};

export default StartTimerScreen;