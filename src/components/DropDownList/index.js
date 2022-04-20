
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Label from '../Label';
import { Color, Font } from '../../utils/theme';

const DropDownList = (props) => {
    const { style, onValueChange, listData, selected } = props;

    let containerStyle = [];
    containerStyle.push(styles.container);
    containerStyle.push(style);
    return (
        <>
            {listData.length ?
                listData.map((item, index) => {
                    return (
                        <View key={index.toString()} >
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => {
                                    onValueChange(item);
                                }}
                                selected={selected}
                                style={[styles.listText, {
                                    backgroundColor: selected === item.title && Color.LINKWATER
                                }]}>
                                <Label style={styles.itemText}>{item.title}</Label>
                            </TouchableOpacity>
                        </View>
                    )
                })
                :
                <View>
                    <Label style={styles.noDataText}>{'NO_DATA'}</Label>
                </View>
            }
        </>
    )
}

DropDownList.propTypes = {
    style: ViewPropTypes.style,
    dropDownStyle: ViewPropTypes.style,
    onValueChange: PropTypes.func,
    listData: PropTypes.array,
};

const styles = StyleSheet.create({

    listText: {
        borderRadius: 15
    },
    itemText: {
        // fontFamily: Font.ROBOTOREGULAR,
        // fontSize: Font.SIZE_14,
        // color: Color.CLOUDBURST,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    noDataText: {
        // fontFamily: Font.ROBOTOREGULAR,
        // fontSize: Font.SIZE_14,
        // color: Color.CLOUDBURST,
        paddingVertical: 2,
        paddingHorizontal: 15,
        textAlign: 'center'
    },
    contentContainerStyle: {
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})

export default DropDownList;