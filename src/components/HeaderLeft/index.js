import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import { Color, Font } from '../../utils/theme';

const HeaderLeft = (props) => {
    const { onPress, iconName, iconStyle } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <IconButton
                style={styles.container}
                iconName={iconName}
                disabled={true}
                iconStyle={[styles.iconStyle, iconStyle]} />
        </TouchableOpacity>
    )
}

HeaderLeft.defaultProps = {
    iconName: 'arrow-left'
}

HeaderLeft.propTypes = {
    onPress: PropTypes.func,

    iconName: PropTypes.string,
    iconStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    iconStyle: {
        fontSize: Font.SIZE_22,
        color: Color.BLUE_500,
        padding: 3
    }
});

export default HeaderLeft