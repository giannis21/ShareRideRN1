

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { RoundButton } from '../Buttons/RoundButton';
import { Spacer } from '../layout/Spacer';
import { colors } from '../utils/Colors';
import { constVar } from '../utils/constStr';

import { SelectLocationComponent } from './SelectLocationComponent';

export function SearchRouteComponent({
    openSearch
}) {
    // const [openSearch, setOpenSearch] = useState({ from: true, open: false })
    return (
        <View style={{ paddingHorizontal: 16, marginTop: 15 }}>

            <SelectLocationComponent
                titleStart={'Αφετηρία προορισμού'}
                titleEnd={'Τελικός προορισμός'}
                startingPointPress={() => { openSearch({ from: true, open: true }) }}
                endPointPress={() => { openSearch({ from: false, open: true }) }} />

            <Spacer height={16} />
            <RoundButton
                text={'Αναζήτηση'}
                onPress={() => { }}
                backgroundColor={colors.colorPrimary} />
        </View>

    )

}