import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RoundButton } from '../Buttons/RoundButton';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useIsFocused } from '@react-navigation/native';
import { createTable, deleteRoute, getDBConnection, getFavorites } from '../database/db-service';
import { useDispatch, useSelector } from 'react-redux';
import { TRIGGER_DATABASE } from '../actions/types';
const { width } = Dimensions.get('screen');

export function FavDestComponent({
    containerStyle,
    onSearchPosts
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    let data = useSelector(state => state.searchReducer.favoriteRoutes)
    const [carouselData, setCarouselData] = useState([])
    const [suppliesReady, setSuppliesReady] = useState(false);
    let isFocused = useIsFocused()
    let dispatch = useDispatch()
    useEffect(() => {
        setCarouselData(data)
    }, [data.length]);


    const deleteItem = async (item) => {
        try {
            const db = await getDBConnection();
            await createTable(db);
            deleteRoute(item.compoundKey, db)
            dispatch({ type: TRIGGER_DATABASE })
        } catch (error) {
            console.error(error);
        }

    }

    function renderFavorite({ item, index }) {
        return (
            <View>
                <View style={[styles.container, containerStyle]} >
                    <Text style={{ fontWeight: 'bold' }}>Από</Text>
                    <Text style={styles.textStyle1}>{item.startplace}</Text>
                    <Entypo name={"arrow-long-down"} size={30} style={{ alignSelf: 'center', marginTop: 10, transform: [{ translateY: 7 }] }} color={colors.colorPrimary} />
                    <Text style={{ fontWeight: 'bold' }}>Μέχρι</Text>
                    <Text style={styles.textStyle1}>{item.endplace}</Text>
                </View>
                <TouchableOpacity onPress={() => { deleteItem(item) }} style={styles.circle}>
                    <MaterialCommunityIcons name={"delete"} size={20} color={'white'} />
                </TouchableOpacity>

            </View>

        )
    }

    return (
        <View>
            <Carousel
                enableMomentum={false}
                activeDotIndex={activeIndex}
                dotColor={'black'}
                activeSlideAlignment={'start'}
                layout='default'
                //ref={ref}
                data={carouselData}
                sliderWidth={width}
                itemWidth={372}
                renderItem={renderFavorite}
                decelerationRate={'fast'}
                removeClippedSubviews={false}
                inactiveSlideScale={0.92}
                inactiveSlideOpacity={0.65}
                onSnapToItem={(index) => {
                    setActiveIndex(index);
                    //onSnapToItem(index);
                }}

            />
            {carouselData.length > 1 && (
                <Pagination
                    activeDotIndex={activeIndex}
                    dotsLength={carouselData.length}
                    containerStyle={{ marginTop: -32 }}
                    dotStyle={{
                        width: 16,
                        height: 4,
                        borderRadius: 8,
                        marginRight: -12,
                        backgroundColor: colors.colorPrimary
                    }}
                    inactiveDotStyle={{
                        borderRadius: 8,
                        backgroundColor: colors.CoolGray1
                    }}
                />
            )}
            {carouselData.length > 0 &&
                <RoundButton
                    containerStyle={{ marginHorizontal: 15 }}
                    text={'Αναζήτηση'}
                    onPress={onSearchPosts}
                    backgroundColor={colors.colorPrimary} />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: 100 / 2,
        backgroundColor: 'red',
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 10,
        padding: 10,
        transform: [{ translateX: -7 }]
    },
    container: {
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: colors.CoolGray1,
        height: 'auto',
        margin: 20,
        borderRadius: 10,
        borderStyle: 'dashed',

        padding: 10
    },
    textStyle1: {
        fontSize: 16,
        fontWeight: 'bold',

        marginTop: 5,
        backgroundColor: colors.grey200,
        paddingVertical: 1,

        textAlign: 'center',
        borderRadius: 5,
    },
});
