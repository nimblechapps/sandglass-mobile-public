import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Label from '../Label';
import { Color, Font } from '../../utils/theme';

const HeaderTitle = (props) => {
    const { title, titleStyle } = props;
    return (
        <Label style={[styles.title, titleStyle]}>
            {title}
        </Label>
    )
}

HeaderTitle.propTypes = {
    title: PropTypes.string,
};

const styles = StyleSheet.create({
    title: {
        textTransform: 'uppercase',
        fontSize: Font.SIZE_18,
        fontFamily: Font.SFPROTEXTSEMIBOLD,
        color: Color.GREY_900,
        alignSelf: 'center',
    }
});

export default HeaderTitle;