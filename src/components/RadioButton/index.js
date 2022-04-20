
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Label from '../Label';
import { Color, Font } from '../../utils/theme';

const RadioButton = (props) => {
    const { style, onChangeValue, disabled, circle, isChecked, titleStyle, item, radioContainerStyle } = props;

    let buttonStyle = [];
    buttonStyle.push(styles.button);
    buttonStyle.push(style);

    let circleStyle = [];
    circleStyle.push(styles.circleView);
    circleStyle.push(circle);

    let textStyle = [];
    textStyle.push(styles.title);
    textStyle.push(titleStyle);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(isChecked ? isChecked : false);
    }, [isChecked])

    return (
        <View style={[styles.radioContainer, radioContainerStyle]}>
            <TouchableOpacity
                style={buttonStyle}
                disabled={disabled}
                onPress={() => onChangeValue(item)}>
                <View style={styles.radioStyle}>
                    <View style={circleStyle}>
                        <View style={[styles.circleFill,
                        { backgroundColor: checked ? Color.CLOUDBURST : Color.TRANSPARENT }]} />
                    </View>
                    <Label style={textStyle}>
                        {item.title}
                    </Label>
                </View>
            </TouchableOpacity>
        </View>
    )
}

RadioButton.defaultProps = {
    isChecked: false,
    disabled: false,
    image: undefined
};

RadioButton.propTypes = {
    style: ViewPropTypes.style,
    onChangeValue: PropTypes.func,
    disabled: PropTypes.bool,

    circle: ViewPropTypes.style,

    isChecked: PropTypes.bool,
    item: PropTypes.object,
    title: PropTypes.string,
    titleStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
};

const styles = StyleSheet.create({
    radioContainer: {
        alignItems: 'center'
    },
    radioStyle: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    circleView: {
        height: 16,
        width: 16,
        borderRadius: 8,
        borderWidth: 2,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleFill: {
        height: 8,
        width: 8,
        borderRadius: 4,
    },
    title: {
        // fontSize: Font.SIZE_14,
        // lineHeight: 20,
        // fontFamily: Font.ROBOTOREGULAR,
        color: Color.BLACK
    }
})

export default RadioButton;