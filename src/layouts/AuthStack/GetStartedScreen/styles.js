import { StyleSheet } from 'react-native';
import { Color, Font } from '../../../utils/theme';
import { screenWidth } from '../../../utils/globals';

const styles = StyleSheet.create({

    Main: {
        backgroundColor: Color.BLACK,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: screenWidth,
        height: '100%',
        opacity: 0.35
    },
    swiperFlatList: {
        height: 250,
        marginTop: 56
    },
    sliderTextMain: {
        width: screenWidth
    },
    sliderText: {
        textAlign: 'center',
        alignSelf: 'center',
        width: 265,
        fontFamily: Font.SFPROTEXTSEMIBOLD,
        color: Color.WHITE,
        fontSize: Font.SIZE_16,
        lineHeight: 24
    },
    paginationStyleItem: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4
    },
    buttonPart: {
        paddingBottom: 34,
        width: '100%',
        paddingHorizontal: 16
    },
    getStartedButton: {
        marginTop: 16,
        marginBottom: 24
    },
    signinButton: {
        marginBottom: 24,
        alignSelf: 'center',
        height: 32,
        backgroundColor: Color.TRANSPARENT
    },
    signinButtonText: {
        textTransform: 'none',
        color: Color.WHITE
    }
});

export default styles;