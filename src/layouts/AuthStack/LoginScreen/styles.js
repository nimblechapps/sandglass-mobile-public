import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../utils/globals';
import { Color, Font } from '../../../utils/theme';

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        paddingTop: 32
    },
    forgotPasswordLinkText: {
        alignSelf: 'flex-end',
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_12,
        color: Color.GREY_500,
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