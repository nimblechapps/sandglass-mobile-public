
import React from 'react';
import { View, ViewPropTypes, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Color } from '../../utils/theme';
import styles from './styles';

const IndicatorView = (props) => {
    const { style, animating, color, size } = props;

    if (animating) {
        return (
            <View style={[styles.indicatorView, style]}>
                <ActivityIndicator
                    animating={animating}
                    color={color}
                    size={size}
                />
            </View>
        )
    } else {
        return null
    }
}

IndicatorView.defaultProps = {
    color: Color.BLACK,
    size: 'small',
}

IndicatorView.propTypes = {
    style: ViewPropTypes.style,

    animating: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
}

export default IndicatorView;