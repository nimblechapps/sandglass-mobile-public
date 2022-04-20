import { StyleSheet } from 'react-native';
import { Color, Font } from '../../../utils/theme';

const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        backgroundColor: Color.GREY_100
    },
    titleStyle: {
        textTransform: 'capitalize',
        fontSize: Font.SIZE_17
    },
    group: {
        marginBottom: 8,
        backgroundColor: Color.WHITE,
        paddingHorizontal: 16,
    },
    noBorder: {
        borderBottomWidth: 0
    },
});

export default styles;