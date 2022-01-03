
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import { PostLayoutComponent } from '../../components/PostLayoutComponent';
import { BaseView } from '../../layout/BaseView';
import { routes } from '../../navigation/RouteNames';
import { getPostsUser } from '../../services/MainServices';
import { colors } from '../../utils/Colors';



const MyPostsTabScreen = ({ navigation, route, email }) => {


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
        // setDataSource([...dataSource, ...data]);

        setOffset(offset + 1)
    }
    const errorCallback = () => {

    }

    return (
        <BaseView>
            <PostLayoutComponent />
        </BaseView>

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
    }
});
