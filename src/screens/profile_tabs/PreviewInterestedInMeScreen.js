

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { PostLayoutComponent } from '../../components/PostLayoutComponent';
import { BaseView } from '../../layout/BaseView';
import { Spacer } from '../../layout/Spacer';
import { routes } from '../../navigation/RouteNames';
import { deletePost, getInterestedPerPost, getPostsUser } from '../../services/MainServices';
import { colors } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { OpenImageModal } from '../../utils/OpenImageModal';
import { Loader } from '../../utils/Loader';
import { useIsFocused } from '@react-navigation/native';
import { InfoPopupModal } from '../../utils/InfoPopupModal';
import { constVar } from '../../utils/constStr';
import { CustomInfoLayout } from '../../utils/CustomInfoLayout';
import { TopContainerExtraFields } from '../../components/TopContainerExtraFields';
import { PictureComponent } from '../../components/PictureComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../../constants/Constants';
import { UserComponent } from '../../components/UserComponent';
const PreviewInterestedInMeScreen = ({ navigation, route }) => {
    var _ = require('lodash');
    const [total_pages, setTotalPages] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [deletedPost, setDeletedPost] = useState(null);
    const [isRender, setIsRender] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoMessage, setInfoMessage] = useState({ info: '', success: false });
    const [showContent, setShowContent] = React.useState(true)
    const { height, width } = Dimensions.get("window");

    const post = useSelector(state => state.postReducer.activePost)

    let isFocused = useIsFocused()

    console.log("post.activePost", post)
    useEffect(() => {
        setDataSource(post.users)
    }, [])


    const getUsers = () => {
        // console.log(post.post.postid, offset)

        getInterestedPerPost({
            postId: post.post.postid,
            page: offset,
            successCallback,
            errorCallback
        })
    }
    const successCallback = (data) => {
        setIsLoading(false)
        let newArray = post.users.concat(data.users)
        setDataSource([...dataSource, ...data.users]);
        setTotalPages(data.totalPages)
        setOffset(offset + 1)
        setIsLoading(false)

    }
    const errorCallback = () => {
        setIsLoading(false)

    }




    const onProfileClick = (email) => {
        navigation.push(routes.PROFILE_SCREEN, { email: email })
    }
    const onMenuClicked = (item1, index) => {
        let postToBeDeleted = dataSource.find((item) => item.post.postid === item1.post.postid)
        setDeletedPost(postToBeDeleted)
        setIsModalVisible(true)
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
    const deleteInterested = (piid) => {
        try {
            //  verInterested
            console.log(piid)

            let newData = dataSource.filter((obj) => obj.piid !== piid)
            setDataSource(newData)
            // deleteInterested({
            //     piid: deletedPost.post.postid,
            //     successCallback: ((message) => {

            //         let newData = dataSource.filter((obj) => obj !== deletedPost)
            //         setDataSource(newData)
            //         setIsRender(!isRender)

            //         setInfoMessage({ info: message, success: true })
            //         setIsLoading(false)
            //         showCustomLayout()
            //     }),
            //     errorCallback: ((message) => {
            //         setInfoMessage({ info: message, success: false })
            //         setIsLoading(false)
            //         showCustomLayout()

            //     })
            // })





            // let postToBeDeleted = dataSource.find((item) => item?.post?.postid === postid)

            // let deletedUser = postToBeDeleted?.users.find((user) => user.fullname === fullname)

            // let updatedPostList = postToBeDeleted.users.filter((obj) => obj !== deletedUser)
            // let index = dataSource.indexOf(postToBeDeleted);
            // let tempData = dataSource
            // if (index > 0) {
            //     tempData[index] = updatedPostList
            //     setDataSource(tempData)
            //     setIsRender(!isRender)
            // }

        } catch (err) {

        }




    }


    const renderFooter = () => {
        return (
            !_.isEmpty(dataSource) && (offset <= total_pages - 1) ?
                (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                // setIsLoading(true)
                                getUsers()
                            }}

                            style={styles.loadMoreBtn}>
                            <Text style={styles.btnText}>Φόρτωσε Περισσότερα...</Text>
                        </TouchableOpacity>
                    </View>
                ) : null

        );
    };

    const { userStyleAdded } = styles
    return (
        <BaseView containerStyle={{ flex: 1, paddingHorizontal: 16, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <TopContainerExtraFields onCloseContainer={() => { navigation.goBack() }} title={'Ενδιαφερόμενοι του post'} />
                {post && <PostLayoutComponent
                    showMenu={false}
                    item={post}
                    onMenuClicked={onMenuClicked}
                    onProfileClick={onProfileClick}
                />}
                <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 4, marginVertical: 4 }} />

                {!_.isEmpty(dataSource) ?
                    <FlatList

                        data={dataSource}
                        // extraData={isRender}
                        keyExtractor={(item, index) => index}
                        enableEmptySections={true}
                        renderItem={(item) => {

                            return <UserComponent
                                user={item.item}
                                deleteInterested={deleteInterested}
                                fillWidth />
                        }}
                        ListFooterComponent={renderFooter}
                    /> : (
                        <View>

                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 110 }}>
                                <Text>Περιμένετε..</Text>
                            </View>
                        </View>
                    )
                }



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

export default PreviewInterestedInMeScreen

const styles = StyleSheet.create({
    timer: {
        fontSize: 17,
        fontWeight: '900',
        textAlign: 'center'
    },
    userStyleAdded: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#c5dde3",
        alignSelf: 'baseline',
        width: 'auto',
        borderRadius: 13,
        marginEnd: 10,
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
