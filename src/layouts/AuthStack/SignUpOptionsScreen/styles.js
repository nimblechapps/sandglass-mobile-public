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
        marginBottom: 10
    },
    orText: {
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 8,
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

});

export default styles;