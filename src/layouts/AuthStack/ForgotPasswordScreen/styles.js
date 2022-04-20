import { StyleSheet } from 'react-native';
import { screenWidth } from '../../../utils/globals';
import { Color, Font } from '../../../utils/theme';

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 16,
        paddingTop: 32
    },
    lableText: {
        marginBottom: 32,
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_16,
        color: Color.GREY_700,
    },
    buttonCustomStyle: {
        marginTop: 40,
        height: 42
    },
});

export default styles;