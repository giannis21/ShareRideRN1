

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { PostLayoutComponent } from '../../components/PostLayoutComponent';
import { BaseView } from '../../layout/BaseView';
import { Spacer } from '../../layout/Spacer';
import { routes } from '../../navigation/RouteNames';
import { deletePost, getPostsUser } from '../../services/MainServices';
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

const PreviewInterestedInMeScreen = ({ navigation, route }) => {
    var _ = require('lodash');
    const [total_pages, setTotalPages] = useState(1);
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

    const { post } = route.params
    let isFocused = useIsFocused()

    console.log(post)
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

    const RenderUser = ({ user }) => {

        return (

            <TouchableOpacity onPress={() => {

                //  goToUsersProfile(user.email)

            }} style={{ marginTop: 10 }}>

                <View style={userStyleAdded}>
                    <PictureComponent imageSize="small" url={BASE_URL + user.imagePath} />
                    <Spacer width={14} />
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{user.fullname}</Text>
                    <TouchableOpacity onPress={() => {
                        // deleteInterested(user.fullname, item.post.postid)
                    }}>



                        <FontAwesome name="close" size={24} color='red' style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>

                    <Entypo name="add-user" size={22} color={colors.colorPrimary} style={{ marginHorizontal: 5 }} />

                </View>



                <Spacer height={10} />

            </TouchableOpacity>
        )
    }


    const renderFooter = () => {
        return (
            !_.isEmpty(dataSource) && (offset <= total_pages) ?
                (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setIsLoading(true)
                                getPostsUser({
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
        <BaseView containerStyle={{ flex: 1, paddingHorizontal: 16, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <TopContainerExtraFields onCloseContainer={() => { navigation.goBack() }} title={'Ενδιαφερόμενοι του post'} />
                <PostLayoutComponent
                    showMenu={true}
                    item={post}
                    onMenuClicked={onMenuClicked}
                    onProfileClick={onProfileClick}
                    showInterested={true}
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

export default PreviewInterestedInMeScreen

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
