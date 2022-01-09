import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PictureComponent } from '../../components/PictureComponent';
import { BASE_URL } from '../../constants/Constants';
import { BaseView } from '../../layout/BaseView';
import { Spacer } from '../../layout/Spacer';
import { routes } from '../../navigation/RouteNames';
import { getReviews } from '../../services/MainServices';
import { colors } from '../../utils/Colors';
import { StarsRating } from '../../utils/StarsRating';
import { getDate } from '../../utils/Functions'


const RatingTabScreen = ({ navigation, route, email }) => {
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [total_pages, setTotalPages] = useState(1);
    useEffect(() => {

        getReviews({
            email: email,
            page: offset,
            successCallback,
            errorCallback
        })
    }, []);

    const successCallback = (data) => {
        setDataSource([...dataSource, ...data.reviews]);
        console.log("data length ", data.reviews.length, dataSource.length)
        setTotalPages(data.total_pages)
        setOffset(offset + 1)
    }
    const errorCallback = () => {

    }
    const renderFooter = () => {
        return (
            (offset <= total_pages) ? (
                <View style={styles.footer}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            getReviews({
                                email: email,
                                page: offset,
                                successCallback,
                                errorCallback
                            })
                        }}

                        style={styles.loadMoreBtn}>
                        <Text style={styles.btnText}>Load More</Text>
                        {loading ? (
                            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                        ) : null}
                    </TouchableOpacity>
                </View>
            ) : null

        );
    };

    const ItemView = ({ item }) => {
        return (

            <View style={{ height: 'auto', backgroundColor: 'white', borderRadius: 5, marginHorizontal: 5 }}>
                <Spacer height={5} />

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '15%', marginStart: 6 }}>

                        <PictureComponent imageSize="small" url={BASE_URL + item.imagepath} />
                        <Spacer width={15} />
                    </View>


                    <View style={{ marginTop: 3, width: '85%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.fullname}</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#595959', opacity: 0.6, marginEnd: 10 }}> {getDate(item.createdAt)}</Text>
                        </View>

                        <Spacer height={10} />
                        <View style={{ alignItems: 'flex-start' }}>
                            <StarsRating rating={item.rating} size="small" />
                        </View>
                        <Spacer height={5} />
                        <Text>{item.text}</Text>

                        <Spacer height={15} />
                        <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />


                    </View>
                </View>

            </View>




        );
    };

    return (
        <BaseView containerStyle={{ flex: 1, paddingHorizontal: 0, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Spacer height={15} />
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 10 }} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    enableEmptySections={true}
                    renderItem={ItemView}
                    ListFooterComponent={renderFooter}
                />


            </View>
        </BaseView >

    );

}

export default RatingTabScreen

const styles = StyleSheet.create({
    timer: {
        fontSize: 17,
        fontWeight: '900',
        textAlign: 'center'
    },
    timerContainer: {
        backgroundColor: 'white',
        height: 'auto', width: '100%',
        borderRadius: 23
    },
    header: {
        fontSize: 23,
        alignSelf: 'center',
        marginStart: 14,
        color: 'black',
        fontWeight: 'bold'
    },
    wrongPass: {
        fontSize: 13, fontWeight: '900', color: 'red'
    },
    topContainer: {
        flexDirection: 'row',
        marginTop: 16
    },

    input: {
        height: 40,
        marginBottom: 12,
        paddingVertical: 12,
        borderBottomWidth: 1
    },
    absolute: {
        position: 'absolute',
        left: 16,
        bottom: 0,
        top: 0
    },
    box: {
        width: 55,
        alignSelf: 'center',

        height: 55,
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 8,
        color: 'black'
    },
    container: {
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: colors.colorPrimary,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
});