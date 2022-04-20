
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewPropTypes, View } from 'react-native';
import PropTypes from 'prop-types';
import { SvgCssUri } from 'react-native-svg';
import { screenWidth } from '../../utils/globals';
import { Color, Font } from '../../utils/theme';
import Label from '../Label';
import IconButton from '../IconButton';

const SocialButtonCard = (props) => {
    const { style, cardCustomStyle, activeOpacity, disabled, onPress, isLeftIcon, leftIconName, isLeftImage, imageUrl, imageUrlStyle, titleStyle, title, imageWidth, imageHeight } = props;

    let cardStyle = [];
    cardStyle.push(styles.button);
    cardStyle.push(style);

    let textStyle = [];
    textStyle.push(styles.title);
    textStyle.push(titleStyle);

    return (
        <TouchableOpacity
            style={[styles.cardStyle, cardCustomStyle]}
            activeOpacity={activeOpacity}
            disabled={disabled}
            onPress={onPress}
        >
            {isLeftIcon &&
                <IconButton
                    disabled={true}
                    iconName={leftIconName}
                    iconStyle={styles.iconStyle}
                />
            }
            {isLeftImage &&
                <SvgCssUri uri={imageUrl} style={[styles.imageStyle, imageUrlStyle]} width={imageWidth} height={imageHeight} />
            }
            <View style={styles.cardText}>
                <Label style={styles.textStyle}>{title}</Label>
            </View>
        </TouchableOpacity>
    );
};

SocialButtonCard.propTypes = {
    style: ViewPropTypes.style,
    activeOpacity: PropTypes.number,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,

    title: PropTypes.string,
    titleStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    iconCustomLeftStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
};

const styles = StyleSheet.create({
    cardStyle: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 21,
        height: 46,
        backgroundColor: Color.WHITE,
        ...Platform.select({
            ios: {
                shadowColor: "#003362",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.06,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        })
    },
    cardText: {
        width: screenWidth - 74,
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: Font.SFPROTEXTMEDIUM,
        fontSize: Font.SIZE_14,
        color: Color.GREY_700
    },
    imageStyle: {
        position: 'absolute',
        left: 16,
    },
    iconStyle: {
        left: 4,
        color: Color.GREY_700,
        fontSize: Font.SIZE_18,
    },
});

export default SocialButtonCard;