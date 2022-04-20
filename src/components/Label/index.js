
import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const Label = (props) => {

    const { onPress, children, numberOfLines } = props;
    const { color, textAlign, style } = props;

    let textStyle = [];
    textStyle.push({
        color: color,
        textAlign: textAlign,
    })
    textStyle.push(style);

    return (
        <Text onPress={onPress} numberOfLines={numberOfLines} style={textStyle} >
            {children}
        </Text>
    )
}

Label.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),

    numberOfLines: PropTypes.number,
    color: PropTypes.string,
    textAlign: PropTypes.string,
};

export default Label;
