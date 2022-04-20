import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../utils/globals';
import { Color, Font } from '../../../utils/theme';

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        paddingTop: 32
    },
    checkboxMain: {
        marginTop: 16
    },
    textInline: {
        width: screenWidth - 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    checkboxText: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_14,
        color: Color.GREY_500,
    },
    linkText: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_14,
        color: Color.GREY_700,
        marginHorizontal: 2,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: Color.GREY_700
    },
    buttonCustomStyle: {
        marginTop: 55,
        height: 42
    },
    alreadyAccountMain: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 24
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