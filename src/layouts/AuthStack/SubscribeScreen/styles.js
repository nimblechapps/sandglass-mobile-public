import { StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '../../../utils/globals';
import { Color, Font } from '../../../utils/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.GREY_100
    },
    contentContainerStyle: {
        flex: 1,
        paddingHorizontal: 16,
    },
    contentPart: {
        flex: 1
    },
    logo: {
        marginVertical: 48,
        alignSelf: 'center'
    },
    cardCustomStyle: {
        marginBottom: 16
    },
    redeemCodeText: {
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_14,
        color: Color.GREY_700,
    },
    signPart: {
        marginTop: 'auto'
    },
    alreadyAccountMain: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 32
    },
    alreadyAccountText: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_14,
        color: Color.GREY_500,
        position: 'relative'
    },
    signinText: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_14,
        color: Color.GREY_700,
        marginLeft: 8,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: Color.GREY_700
    },
    termsText: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_12,
        color: Color.GREY_700,
        marginHorizontal: 3
    },
    modalView: {
        paddingTop: 16,
        backgroundColor: Color.WHITE,
        borderRadius: 10,
        flex: 1,
    },
    contentAlign: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    flexMain: {
        flex: 1,
        height: screenHeight - 40
    },
    flexSecond: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'flex-end'
    },
    cancelText: {
        alignSelf: 'flex-end',
        fontFamily: Font.SFPROTEXTMEDIUM,
        fontSize: Font.SIZE_14,
        color: Color.BLUE_500,
        marginBottom: 30
    },
    bottomLink: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    termsConditionsText: {
        alignSelf: 'center',
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_12,
        color: Color.GREY_400
    },
    chevronRight: {
        fontSize: Font.SIZE_18,
        color: Color.GREY_400
    },
    redeemCodeModalText: {
        fontFamily: Font.SFPROTEXTBOLD,
        fontSize: Font.SIZE_24,
        color: Color.GREY_900,
        alignSelf: 'center',
        width: 250,
        textAlign: 'center',
        height: 100
    },
    textInput: {
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
        height: 48,
        paddingHorizontal: 16,
        backgroundColor: Color.WHITE,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Color.GREY_300,
        fontFamily: Font.SFPROTEXTMEDIUM,
        fontSize: Font.SIZE_22,
        marginVertical: 100,
    }
});

export default styles;