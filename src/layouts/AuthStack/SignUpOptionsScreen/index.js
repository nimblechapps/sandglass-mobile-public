import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, Platform } from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import HeaderTitle from '../../../components/HeaderTitle';
import SocialButtonCard from '../../../components/SocialButtonCard';
import Label from '../../../components/Label';
import Routes from '../../../navigation/Routes';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { AuthAction } from '../../../state/ducks/auth';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';

GoogleSignin.configure({
    scopes: ['profile', 'email'],
    webClientId: '573759514661-5hhthev6nlvihno4nf6pli9cpfifjcm6.apps.googleusercontent.com',
    iosClientId: '573759514661-gdres04hp23jkishohl4166l55eh08o8.apps.googleusercontent.com'
});

const SignUpOptionsScreen = ({ navigation, route }) => {
    const { t } = useTranslation();
    const { navigate } = navigation;
    const { productId } = route.params;
    const dispatch = useDispatch();

    const [userData, setUserData] = useState(null)
    const [isSocialSignin, setIsSocialSignin] = useState(false)
    const [isGoogleSignOut, setGoogleSignOut] = useState(false)


    const SocialTypes = {
        GOOGLE: 'GOOGLE',
        FACEBOOK: 'FACEBOOK',
        APPLE: 'APPLE'
    }
    const [signInType, setSignInType] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={t('signUp')} />
        });
    }, [navigation]);

    useEffect(() => {
        if (isGoogleSignOut) {
            signOutFromGoogle()
        }
    }, [isGoogleSignOut])

    useEffect(() => {
        if (userData !== null) {
            signInWithSocial()
        }
    }, [userData])


    const signOutFromGoogle = async () => {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
    }

    const onGoogleButtonPress = async () => {
        setIsSocialSignin(true)
        setSignInType(SocialTypes.GOOGLE)
        try {
            await GoogleSignin.hasPlayServices();
            // const userInfo = await GoogleSignin.signIn();
            // Get the users ID token
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info', userInfo);
            const socialUser = userInfo;
            setUserData(socialUser)
            // Create a Google credential with the token
            // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            // return auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log("---errror---", error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("Google Signin Error: ", 'SIGN_IN_CANCELLED');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("Google Signin Error: ", 'IN_PROGRESS');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Google Signin Error: ", 'PLAY_SERVICES_NOT_AVAILABLE');
            } else {
                console.log("Google Signin Error: ", 'Something went wrong');
            }
        }
    }
    const onAppleButtonPress = async () => {
        setIsSocialSignin(true)
        setSignInType(SocialTypes?.APPLE)
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw new Error('Apple Sign-In failed - no identify token returned');
        }
        console.log('appleAuthRequestResponse', appleAuthRequestResponse);
        const socialUser = appleAuthRequestResponse;
        setUserData(socialUser)
        // Create a Firebase credential from the response
        // const { identityToken, nonce } = appleAuthRequestResponse;
        // const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        // Sign the user in with the credential
        // return auth().signInWithCredential(appleCredential);
    }

    const onFacebookButtonPress = () => {
        setIsSocialSignin(true)
        setSignInType(SocialTypes?.FACEBOOK)
        if (Platform.OS === "android") {
            LoginManager.setLoginBehavior("web_only")
        }
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            login => {
                if (login.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        getInfoFromToken(accessToken);
                    });
                }
            },
            error => {
                console.log('Login fail with error: ' + error);
            },
        );
    };

    const getInfoFromToken = (token) => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id, name, email, picture',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, user) => {
                if (error) {
                    console.log('facebook info has error: ' + error);
                } else {
                    console.log('facebook result: ', user);
                    setUserData(user)
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };

    const signInWithSocial = async () => {
        var params = {};
        switch (signInType) {
            case 'GOOGLE':
                console.log('signInType', signInType);
                params = {
                    googleKey: userData?.idToken,
                    name: userData?.user?.name,
                    email: userData?.user?.email,
                    profileImage: userData?.user?.photo,
                }
                console.log('google:', userData, params);
                break;
            case 'FACEBOOK':
                params = {
                    facebookKey: userData?.id,
                    name: userData?.name,
                    email: userData?.email,
                    profileImage: userData?.picture?.data?.url,
                }
                console.log('Facebook params:', userData, params);
                break;
            case 'APPLE':
                params = {
                    appleKey: userData?.user,
                    name: userData?.fullName?.givenName,
                    email: userData?.email,
                    profileImage: '',
                }
                break;
        }

        // console.log("Social Params", params);
        userData && dispatch(AuthAction.signInSocial(params,
            (success) => {
                console.log('Routes.Subscription');
                signOutFromGoogle()
                navigate(Routes.Subscription, { productId })
            },
            (error) => { }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.contentPart}>

                    <View style={styles.topSection}>
                        <SvgCssUri uri="https://res.cloudinary.com/djyl1goby/image/upload/v1649494014/Sandglass/vwsvrgi9ctgzih3vakrh_h5blrp.svg" style={styles.logo} width={136} height={32} />
                        <SocialButtonCard
                            cardCustomStyle={styles.cardCustomStyle}
                            title={t('continueWithGoogle')}
                            isLeftImage={true}
                            imageUrl={'https://res.cloudinary.com/djyl1goby/image/upload/v1649494013/Sandglass/n5susv4nvumfvqqefmpi_mox50c.svg'}
                            imageWidth={24}
                            imageHeight={24}
                            onPress={async () => {
                                await onGoogleButtonPress()
                            }}
                        />
                        {Platform.OS === 'ios' && <SocialButtonCard
                            cardCustomStyle={styles.cardCustomStyle}
                            title={t('continueWithApple')}
                            isLeftImage={true}
                            imageUrl={'https://res.cloudinary.com/djyl1goby/image/upload/v1649494013/Sandglass/uz2uz0pscnxc7d7slluz_wrpgee.svg'}
                            imageWidth={26}
                            imageHeight={26}
                            onPress={async () => {
                                await onAppleButtonPress()
                            }}
                        />}
                        <SocialButtonCard
                            cardCustomStyle={styles.cardCustomStyle}
                            title={t('continueWithFacebook')}
                            isLeftImage={true}
                            imageUrl={'https://res.cloudinary.com/djyl1goby/image/upload/v1649494013/Sandglass/fr9yobgq897fneonyrlk_sffkvc.svg'}
                            imageWidth={25}
                            imageHeight={25}
                            onPress={async () => {
                                await onFacebookButtonPress()
                            }}
                        />

                        <Label style={styles.orText}>{t('Or')}</Label>
                        <SocialButtonCard
                            cardCustomStyle={styles.cardCustomStyle}
                            title={t('continueWithEmail')}
                            isLeftIcon={true}
                            leftIconName={'email'}
                            onPress={() => {
                                navigate(Routes.SignUpEmail)
                                setIsSocialSignin(false)
                            }}
                        />
                    </View>
                    <View style={styles.signPart}>
                        <View style={styles.alreadyAccountMain}>
                            <Label style={styles.alreadyAccountText}>{t('alreadyAccount')}</Label>
                            <Label style={styles.signinText} onPress={() => {
                                navigate(Routes.SignInOptions)
                            }}>{t('signin')}</Label>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpOptionsScreen;