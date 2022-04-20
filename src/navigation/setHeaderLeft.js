import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import HeaderLeft from '../components/HeaderLeft';

export default setHeaderLeft = (iconName = '', onPress) => {
    const navigation = useNavigation()
    if (iconName) {
        return <HeaderLeft iconName={iconName} onPress={() => {
            onPress ?
                onPress() :
                navigation.goBack()
        }} />
    } else {
        return <View style={{ width: 80 }} />
    }
}