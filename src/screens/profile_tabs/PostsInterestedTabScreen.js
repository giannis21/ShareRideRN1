import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PostLayoutComponent } from '../../components/PostLayoutComponent';
import { BaseView } from '../../layout/BaseView';
import { Spacer } from '../../layout/Spacer';

import { routes } from '../../navigation/RouteNames';
import { getInterested, getInterestedPerUser, showInterest } from '../../services/MainServices';
import { colors } from '../../utils/Colors';
import { CustomInfoLayout } from '../../utils/CustomInfoLayout';
import { OpenImageModal } from '../../utils/OpenImageModal';



const PostsInterestedTabScreen = ({ navigation, route, email }) => {

    const [total_pages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isRender, setIsRender] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoMessage, setInfoMessage] = useState({ info: '', success: false });
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [deletedPost, setDeletedPost] = useState(null);


    useEffect(() => {
        if (email)
            getInterestedPerUser({
                email: email,
                successCallback,
                errorCallback
            })
    }, []);

    const showCustomLayout = (callback) => {
        setShowInfoModal(true)
        setTimeout(function () {
            setShowInfoModal(false)
            if (callback)
                callback()
        }, 2000);
    }

    const successCallback = (data) => {
        setDataSource(data.postUser);
        setTotalPages(data.totalPages)

    }
    const errorCallback = () => {

    }


    const onProfileClick = (email) => {

        navigation.push(routes.PROFILE_SCREEN, { email: email })
    }
    const onLikeClick = (postId, index) => {
        showInterest({
            email: email,
            postId,
            successCallback: ((message) => {
                let likedPost = dataSource.find((item) => item.post.postid === postId)


                likedPost.interested = !likedPost.interested
                dataSource[index] = likedPost
                setDataSource(dataSource)
                setIsRender(!isRender)
                setInfoMessage({ info: message, success: true })
                showCustomLayout()
            }),
            errorCallback: ((message) => {
                setInfoMessage({ info: message, success: false })
                showCustomLayout()
            })
        })
    }
    const onMenuClicked = (item1, index) => {
        let postToBeDeleted = dataSource.find((item) => item.post.postid === item1.post.postid)
        setDeletedPost(postToBeDeleted)
        setIsModalVisible(true)

        //   console.log(item.post.postid, item.user.fullname)
    }
    const onActionSheet = (index) => {
        let newData = dataSource.filter((obj) => obj !== deletedPost)
        setDataSource(newData)
        setIsRender(!isRender)
        // likedPost.interested = !likedPost.interested
        // dataSource[index] = likedPost
        // setDataSource(dataSource)

    };
    return (
        <BaseView containerStyle={{ flex: 1, paddingHorizontal: 0, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <CustomInfoLayout
                    isVisible={showInfoModal}
                    title={infoMessage.info}
                    icon={!infoMessage.success ? 'x-circle' : 'check-circle'}
                    success={infoMessage.success}
                />
                <Spacer height={15} />
                <FlatList
                    data={dataSource}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 10 }} />
                    )}
                    extraData={isRender}
                    keyExtractor={(item, index) => 'item' + index}
                    enableEmptySections={true}
                    renderItem={(item, index) => {
                        return <PostLayoutComponent
                            showMenu={false}
                            item={item.item}
                            index
                            onMenuClicked={onMenuClicked}
                            onProfileClick={onProfileClick}
                            onLikeClick={onLikeClick}
                        />
                    }}

                />

                <OpenImageModal
                    isVisible={isModalVisible}
                    isPost={true}
                    closeAction={() => {
                        setIsModalVisible(false);
                        setDeletedPost(null)
                    }}
                    buttonPress={(index) => {
                        setIsModalVisible(false);
                        onActionSheet(index)
                    }}

                />
            </View>
        </BaseView >

    );

}

export default PostsInterestedTabScreen

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
