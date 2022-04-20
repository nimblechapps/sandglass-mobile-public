
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewPropTypes, View } from 'react-native';
import PropTypes from 'prop-types';
import Label from '../Label';
import { Color, Font } from '../../utils/theme';
import IconButton from '../IconButton';
import { screenWidth } from '../../utils/globals';

const SubscribeCard = (props) => {
    const { style, cardCustomStyle, activeOpacity, disabled, onPress, titleStyle, title, percentage, subTitle, savePercentageShow, subTitleShow } = props;

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
            <View style={styles.cardText}>
                {savePercentageShow &&
                    <View style={styles.percentageView}>
                        <Label style={styles.percentageTextStyle}>{percentage}</Label>
                    </View>
                }
                <Label style={styles.textStyle}>{title}</Label>
                {subTitleShow &&
                    <View>
                        <Label style={styles.subTitleTextStyle}>{subTitle}</Label>
                    </View>
                }
            </View>
            <IconButton
                disabled={true}
                iconName='chevron-right'
                iconStyle={styles.iconStyle}
            />

        </TouchableOpacity>
    );
};

SubscribeCard.propTypes = {
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
        justifyContent: 'space-between',
        borderRadius: 8,
        height: 64,
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
        width: screenWidth - 80,
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: Font.SFPROTEXTSEMIBOLD,
        fontSize: Font.SIZE_14,
        color: Color.GREY_900
    },
    iconStyle: {
        color: Color.BLUE_500,
        fontSize: Font.SIZE_24,
    },
    percentageView: {
        left: -8,
        top: -10,
        backgroundColor: Color.BLUE_500,
        borderRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignSelf: 'flex-start'
    },
    percentageTextStyle: {
        fontFamily: Font.SFPROTEXTMEDIUM,
        fontSize: Font.SIZE_10,
        color: Color.WHITE,
        textTransform: 'uppercase'
    },
    subTitleTextStyle: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_10,
        color: Color.BLUE_500,
        textAlign: 'center',
        marginTop: 4
    }
});

export default SubscribeCard;