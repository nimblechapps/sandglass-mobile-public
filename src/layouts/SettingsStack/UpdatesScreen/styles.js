import { StyleSheet } from 'react-native';
import { Color, Font } from '../../../utils/theme';

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    textStyles: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_16,
        color: Color.GREY_600,
        lineHeight: 20,
        marginBottom: 24
    }
});

export default styles;