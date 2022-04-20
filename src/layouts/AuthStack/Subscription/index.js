import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import RNIap from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';

import { CommonAction } from '../../../state/ducks/common';
import Routes from '../../../navigation/Routes';
import { AuthAction } from '../../../state/ducks/auth';

const Subscription = ({ navigation, route }) => {
    const { navigate } = navigation;
    const { productId } = route.params;
    const [isIAPConnected, setIAPConnected] = useState(false)
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.auth.userToken);

    const productIds = Platform.select({
        ios: [
            'com.sandglass.monthly', 'com.sandglass.yearly'
        ],
        android: [
            'com.sandglass.monthly', 'com.sandglass.yearly'
        ]
    });

    useEffect(() => {
        dispatch(CommonAction.startLoading());
        RNIap.initConnection().catch(() => { console.log('Error connecting to server'); })
            .then((response) => {
                if (response) {
                    RNIap.getSubscriptions(productIds)
                        .catch(() => { console.log('Error finding purchases'); })
                        .then((res) => {
                            console.log('got products');
                            // console.log(res);
                            if (Platform.OS === 'ios') { setIAPConnected(true) } else { getPurchaseHistory() }

                            dispatch(CommonAction.stopLoading());
                        })
                } else {
                    dispatch(CommonAction.stopLoading());
                }
            });

        const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase) => {
            const receipt = purchase.transactionReceipt;
            if (receipt) {
                console.log("Purchase successful -> ", purchase);
                dispatch(CommonAction.startLoading());
                await RNIap.finishTransaction(purchase, false)
                // console.log("Purchase successful ->  ", purchase);
                dispatch(CommonAction.stopLoading());
                console.log('Receipt: ', receipt);
                if (Platform.OS === 'ios') {
                    updateSubscription(purchase)
                } else {
                    updateSubscription(JSON.parse(receipt))
                }

                // setTimeout(() => {
                //     Alert.alert('Successful', 'You have purchased subscription successfully', [
                //         { text: "OK", onPress: () => navigate(Routes.Tab) }
                //     ]);
                // }, 10);
            }
        });

        const purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
            if (error.responseCode === '2') {
                //When user cancles subscription transaction
                Alert.alert('Cancel', 'Your purchase has been canceled');
                navigation.goBack()
            } else {
                console.log('There has been error with your purchase. error code: ', error.code);
                // Alert.alert('Error', 'There has been error with your purchase. error code: ' + error.code);
                if (error.code === 'E_ALREADY_OWNED') {
                    navigate(Routes.Tab)
                } else {
                    navigation.goBack()
                }
            }
        });

        return () => {
            try {
                purchaseUpdateSubscription.remove();
            } catch (error) {
                console.log('ERROR => ', error);
            }
            try {
                purchaseErrorSubscription.remove();
            } catch (error) {
                console.log('ERROR => ', error);
            }
            try {
                RNIap.endConnection();
            } catch (error) {
                console.log('ERROR => ', error);
            }
        }
    }, []);

    const getPurchaseHistory = () => {
        RNIap.getPurchaseHistory().catch(() => { console.log('Error finding purchases History'); }).then((res) => {
            try {
                const receipt = res[res.length - 1].transactionReceipt
                if (receipt) {
                    console.log("Already Purchased");
                    // navigate(Routes.Tab)
                    // console.log('Receipt Found', res);
                    setIAPConnected(true)
                }
            } catch (error) {
                console.log('ERROR => ', error);
                setIAPConnected(true)
            } finally {
                dispatch(CommonAction.stopLoading());
            }
        })
    }
    const updateSubscription = async (receipt) => {

        dispatch(AuthAction.updateSubscription({ 'subscription': receipt },
            (success) => {
                navigate(Routes.Tab)
            },
            (error) => { }))
    }
    useEffect(() => {
        if (isIAPConnected) {
            console.log("INNN");
            RNIap.requestSubscription(productId).catch((error) => { console.log('requestSubscription', error); })
        }
    }, [isIAPConnected]);

    return (
        <>
        </>
    )
}

export default Subscription;