import React from 'react';
import { View, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { SvgCssUri } from 'react-native-svg';
import { Color } from '../../../utils/theme';
import ProgressiveImage from '../../../components/ProgressiveImage';
import CustomButton from '../../../components/CustomButton';
import Label from '../../../components/Label';
import Routes from '../../../navigation/Routes';

import styles from './styles';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../../state/ducks/auth';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const GetStartedScreen = ({ navigation }) => {

    const { t } = useTranslation();
    const { navigate } = navigation;
    const dispatch = useDispatch()
    const slides = [
        'View your progress over time with detailed performance tracking',
        'View your progress over time',
        'With detailed performance tracking'
    ];

    return (
        <>
            <MyStatusBar backgroundColor={Color.TRANSPARENT} barStyle="light-content" />
            <View style={styles.Main}>
                <ProgressiveImage source={{ uri: 'https://res.cloudinary.com/djyl1goby/image/upload/v1649494014/Sandglass/wiymfdnqyqxgvgvyvlz5_jph1ad.jpg' }} style={styles.backgroundImage} />
                <SvgCssUri uri="https://res.cloudinary.com/djyl1goby/image/upload/v1649494013/Sandglass/kc3zmhtenk2dfgpudr63_vjcqtd.svg" width={204} height={48} />
                <View style={styles.swiperFlatList}>
                    <SwiperFlatList
                        autoplay
                        autoplayDelay={2}
                        index={0}
                        data={slides}
                        showPagination={true}
                        paginationDefaultColor={'#8D9199'}
                        paginationActiveColor={'#008EF5'}
                        paginationStyleItem={styles.paginationStyleItem}
                        renderItem={({ item }) => (
                            <View style={styles.sliderTextMain}>
                                <Label style={styles.sliderText}>{item}</Label>
                            </View>
                        )}
                    />
                </View>
                <View style={styles.buttonPart}>
                    <CustomButton
                        buttonCustomStyle={styles.getStartedButton}
                        title={t('getStarted')}
                        onPress={() => {
                            dispatch(AuthAction.signInSuccess(false))
                            navigate(Routes.Subscribe)
                        }}
                    />
                    <CustomButton
                        buttonCustomStyle={styles.signinButton}
                        titleStyle={styles.signinButtonText}
                        title={t('signin')}
                        onPress={() => {
                            navigate(Routes.SignInOptions)
                        }}
                    />
                </View>
            </View>
        </>
    )
}

export default GetStartedScreen;