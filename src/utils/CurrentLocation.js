import {
    Alert,
    Linking,
    PermissionsAndroid,
    Platform,
    ToastAndroid,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        const hasPermission = await hasPermissionIOS();
        return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
    }

    const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
            'Location permission denied by user.',
            ToastAndroid.LONG,
        );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show(
            'Location permission revoked by user.',
            ToastAndroid.LONG,
        );
    }

    return false;
};

const hasPermissionIOS = async () => {
    const openSetting = () => {
        Linking.openSettings().catch(() => {
            Alert.alert('Unable to open settings');
        });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
        return true;
    }

    if (status === 'denied') {
    }

    if (status === 'disabled') {

    }

    return false;
};


export const CurrentLocation = async (callback) => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
        callback && callback(null, "Location permission denied")
        return;
    }

    const watchId = Geolocation.watchPosition(
        (position) => {
            callback && callback(position)
        },
        (error) => {
            console.log(error);
            callback && callback(null, error.message)
        },
        {
            accuracy: {
                android: 'high',
                ios: 'best',
            },
            enableHighAccuracy: true,
            timeout: 1000,
            maximumAge: 10000,
            distanceFilter: 10,
            forceRequestLocation: true,
            forceLocationManager: true,
            showLocationDialog: true,
        },
    );
    return watchId;
};

export const StopCurrentLocation = (watchId) => {
    Geolocation.clearWatch(watchId);
    Geolocation.stopObserving();
}
