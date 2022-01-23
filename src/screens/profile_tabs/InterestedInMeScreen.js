

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PostLayoutComponent } from '../../components/PostLayoutComponent';
import { BaseView } from '../../layout/BaseView';
import { Spacer } from '../../layout/Spacer';
import { routes } from '../../navigation/RouteNames';
import { deletePost, getInterestedInMe, getPostsUser } from '../../services/MainServices';
import { colors } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { OpenImageModal } from '../../utils/OpenImageModal';
import { Loader } from '../../utils/Loader';
import { useIsFocused } from '@react-navigation/native';
import { InfoPopupModal } from '../../utils/InfoPopupModal';
import { constVar } from '../../utils/constStr';
import { CustomInfoLayout } from '../../utils/CustomInfoLayout';
const InterestedInMeScreen = ({ navigation, route, email, myEmail, myFullName }) => {
    var _ = require('lodash');
    const [total_pages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [deletedPost, setDeletedPost] = useState(null);
    const [isRender, setIsRender] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoMessage, setInfoMessage] = useState({ info: '', success: false });

    let navigation1 = useNavigation()
    let isFocused = useIsFocused()
    useEffect(() => {
        setIsLoading(false)
        if (email)
            getInterestedInMe({
                email: email,
                page: offset,
                successCallback,
                errorCallback
            })
    }, []);

    const successCallback = (data) => {
        setIsLoading(false)
        setDataSource([...dataSource, ...data.postUser]);
        setTotalPages(data.totalPages)
        setOffset(offset + 1)
        setIsLoading(false)
    }
    const errorCallback = () => {
        setIsLoading(false)
    }


    const showCustomLayout = (callback) => {
        setShowInfoModal(true)
        setTimeout(function () {
            setShowInfoModal(false)
            if (callback)
                callback()
        }, 2000);
    }

    const onProfileClick = (email) => {
        navigation1.push(routes.PROFILE_SCREEN, { email: email })
    }
    const onMenuClicked = (item1, index) => {
        let postToBeDeleted = dataSource.find((item) => item.post.postid === item1.post.postid)
        setDeletedPost(postToBeDeleted)
        setIsModalVisible(true)
    }

    const deleteInterested = (fullname, postid) => {
        try {
            console.log(fullname, postid)
            let postToBeDeleted = dataSource.find((item) => item?.post?.postid === postid)

            let deletedUser = postToBeDeleted?.users.find((user) => user.fullname === fullname)

            let updatedPostList = postToBeDeleted.users.filter((obj) => obj !== deletedUser)
            let index = dataSource.indexOf(postToBeDeleted);
            let tempData = dataSource
            if (index > 0) {
                tempData[index] = updatedPostList
                setDataSource(tempData)
                setIsRender(!isRender)
            }

        } catch (err) {

        }




    }
    const onActionSheet = (index) => {
        setIsLoading(true)

        deletePost({
            postID: deletedPost.post.postid,
            successCallback: ((message) => {

                let newData = dataSource.filter((obj) => obj !== deletedPost)
                setDataSource(newData)
                setIsRender(!isRender)

                setInfoMessage({ info: message, success: true })
                setIsLoading(false)
                showCustomLayout()
            }),
            errorCallback: ((message) => {
                setInfoMessage({ info: message, success: false })
                setIsLoading(false)
                showCustomLayout()

            })
        })


    };

    const renderFooter = () => {
        return (
            (offset <= total_pages) ?
                (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setIsLoading(true)
                                getInterestedInMe({
                                    email: email,
                                    page: offset,
                                    successCallback,
                                    errorCallback
                                })
                            }}

                            style={styles.loadMoreBtn}>
                            <Text style={styles.btnText}>Φόρτωσε Περισσότερα...</Text>
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
                    removeClippedSubviews={true}
                    data={dataSource}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 10 }} />
                    )}
                    keyExtractor={(item, index) => item.post.postid + new Date().getTime()}
                    enableEmptySections={true}
                    renderItem={(item, index) => {
                        console.log(index)
                        return <PostLayoutComponent

                            showMenu={email === item.item.post.email}
                            item={item.item}
                            onMenuClicked={onMenuClicked}
                            onProfileClick={onProfileClick}
                            myEmail={myEmail}
                            myFullName={myFullName}
                            showInterested={true}
                            deleteInterested={deleteInterested}
                            showMoreUsers={(post) => {
                                console.log(post)
                            }}
                        />
                    }}
                    ListFooterComponent={renderFooter}
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
                <Loader isLoading={isFocused ? isLoading : false} />
            </View>
            <CustomInfoLayout
                isVisible={showInfoModal}
                title={infoMessage.info}
                icon={!infoMessage.success ? 'x-circle' : 'check-circle'}
                success={infoMessage.success}
            />
        </BaseView >

    );

}

export default InterestedInMeScreen

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
