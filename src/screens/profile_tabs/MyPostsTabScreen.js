
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PostLayoutComponent } from '../../components/PostLayoutComponent';
import { BaseView } from '../../layout/BaseView';
import { Spacer } from '../../layout/Spacer';
import { routes } from '../../navigation/RouteNames';
import { getPostsUser } from '../../services/MainServices';
import { colors } from '../../utils/Colors';



const MyPostsTabScreen = ({ navigation, route, email }) => {

    const [total_pages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    useEffect(() => {
        if (email)
            getPostsUser({
                email: email,
                page: offset,
                successCallback,
                errorCallback
            })
    }, []);

    const successCallback = (data) => {
        setDataSource([...dataSource, ...data.postUser]);
        setTotalPages(data.totalPages)
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
                    renderItem={(item) => {
                        console.log(item.item)
                        return <PostLayoutComponent item={item.item} />
                    }}
                    ListFooterComponent={renderFooter}
                />


            </View>
        </BaseView >

    );

}

export default MyPostsTabScreen

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
    container: {
        padding: 16,
        flexGrow: 1
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
