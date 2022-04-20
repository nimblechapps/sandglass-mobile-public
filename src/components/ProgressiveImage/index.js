
import React, { useState } from 'react';
import { ViewPropTypes } from 'react-native';
import FastImage from "react-native-fast-image";
import PropTypes from 'prop-types';
import _ from 'lodash';

import IndicatorView from '../IndicatorView';

import { Color } from '../../utils/theme';
import styles from './styles';

const ProgressiveImage = (props) => {
    const { style, resizeMode, source, tintColor, indicatorSize } = props;

    const [loading, setLoading] = useState(_.isNumber(source) ? false : true);

    const onEndLoad = () => {
        setLoading(false)
    }

    return (
        <FastImage
            style={[styles.container, style]}
            resizeMode={resizeMode}
            source={source}
            tintColor={tintColor}
            onLoadEnd={onEndLoad}>
            <IndicatorView
                animating={loading}
                color={Color.BLACK}
                size={indicatorSize}
            />
        </FastImage>
    )
}

ProgressiveImage.defaultProps = {
    indicatorSize: 'small',
    resizeMode: 'cover',
}

ProgressiveImage.propTypes = {
    style: ViewPropTypes.style,

    resizeMode: PropTypes.string,
    tintColor: PropTypes.string,
    source: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
    indicatorSize: PropTypes.string,
}

export default ProgressiveImage;