
import { Platform, StyleSheet } from 'react-native';
import { screenWidth } from '../../../utils/globals';
import { Color, Font } from '../../../utils/theme';

const styles = StyleSheet.create({
    contentMain: {
        flex: 1
    },
    contentContainerStyle: {
        paddingHorizontal: 16,
        flex: 1
    },
    locationView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 24
        // marginTop: 76,
    },
    locationIcon: {
        color: Color.BLUE_500,
        fontSize: Font.SIZE_18,
        marginRight: 8
    },
    locationText: {
        fontFamily: Font.SFPROTEXTSEMIBOLD,
        fontSize: Font.SIZE_16,
    },
    duration: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_14,
        alignSelf: 'center'
    },
    subTitle: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_14,
        marginTop: 4
    },
    detailsView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    detailsParts: {
        marginTop: 14,
        width: '48%',
        borderTopWidth: 1,
        paddingVertical: 9
    },
    kmh: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    numberTitle: {
        fontFamily: Font.SFPROTEXTBOLD,
        fontSize: Font.SIZE_32
    },
    subTitleSqure: {
        fontFamily: Font.SFPROTEXTMEDIUM,
        fontSize: Font.SIZE_18,
        color: Color.GREY_900,
        marginLeft: 3
    },
    liveViewStyle: {
        alignSelf: 'center',
        backgroundColor: Color.TRANSPARENT,
        borderWidth: 1,
        borderColor: Color.BLUE_500,
        height: 36,
        paddingHorizontal: 14,
        borderRadius: 16,
        // marginTop: 86
    },
    titleStyle: {
        fontFamily: Font.SFPROTEXTMEDIUM,
        fontSize: Font.SIZE_12,
        color: Color.GREY_700,
        textTransform: 'none'
    },
    iconCustomLeftStyle: {
        marginRight: 4,
        color: Color.BLUE_500,
        fontSize: Font.SIZE_16
    },
    timerButtonCustomStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Color.YELLOW_200,
        marginTop: 40,

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
    pauseCustomLeftStyle: {
        color: Color.WHITE,
        fontSize: Font.SIZE_22
    },
    pauseTitle: {
        fontFamily: Font.SFPROTEXTREGULAR,
        fontSize: Font.SIZE_12,
        alignSelf: 'center',
        color: Color.GREY_700,
        marginTop: 16
    },
    inlineButons: {
        paddingHorizontal: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 90
    },
    resumeBtnCustomStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Color.GREEN_200,
        marginTop: 40,
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
    finishBtnCustomStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Color.RED_200,
        marginTop: 40,
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
    holdUnlockStyle: {
        width: 274,
        alignSelf: 'center',
        backgroundColor: Color.TRANSPARENT,
        borderWidth: 1,
        borderColor: Color.BLUE_500,
        height: 56,
        borderRadius: 28,
        marginTop: 200
    },
    holdUnlockTextStyle: {
        fontFamily: Font.SFPROTEXTSEMIBOLD,
        fontSize: Font.SIZE_16,
        color: Color.WHITE,
    }
});

export default styles;