import React, { useState } from 'react';
import { StyleSheet, View, Text, Platform, TextInput } from 'react-native';

import _ from 'lodash';

export const ViewRow = ({ children, style }) => {

    return (
        <View style={[style, { flexDirection: 'row' }]}>
            {children}
        </View>
    );
}