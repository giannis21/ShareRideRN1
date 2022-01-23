import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BASE_URL } from '../constants/Constants';
import { Spacer } from '../layout/Spacer';
import { colors } from '../utils/Colors';
import { PictureComponent } from './PictureComponent';


export function PostLayoutComponent({
    onPress,
    onProfileClick,
    onLikeClick,
    index,
    item,
    onMenuClicked,
    showMenu,
    myEmail,
    myFullName,
    showInterested,
    deleteInterested,
    showMoreUsers
}) {
    var _ = require('lodash');
    const [isSafeClick, setSafeClick] = useState(true)

    function getMiddle() {


        return (
            <View style={{ marginStart: 16, marginVertical: 8, justifyContent: 'flex-start' }}>

                {JSON.parse(item.post.moreplaces).map((item1, index) => {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <Entypo name="location-pin" size={20} color={colors.colorPrimary} />
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item1.place}</Text>
                            <Spacer height={3} />
                        </View>
                    )
                })}
            </View>
        )
    }
    // const renderUsers = (user) => {
    //     {
    //         showInterested &&
    //             <View>
    //                 <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>Ενδιαφερόμενοι</Text>
    //                 <ScrollView
    //                     horizontal={true}>


    //                     <View style={{ flexDirection: 'row' }}>


    //                         {
    //                             item?.users.map((user) => {
    //                                 return (

    //                                     <TouchableOpacity onPress={goToUsersProfile} style={{ marginTop: 10 }}>

    //                                         <View style={userStyle}>
    //                                             <PictureComponent imageSize="small" url={BASE_URL + user.imagePath} />
    //                                             <Spacer width={14} />
    //                                             <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{user.fullname}</Text>
    //                                             <FontAwesome name="close" size={24} color='red' style={{ marginHorizontal: 10 }} />
    //                                             <FontAwesome name="bookmark" size={24} color={colors.colorPrimary} style={{ marginHorizontal: 10 }} />

    //                                         </View>
    //                                         <Spacer height={10} />

    //                                     </TouchableOpacity>
    //                                 )
    //                             })
    //                         }

    //                     </View>
    //                 </ScrollView>
    //                 <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 1 }} />


    //             </View>
    //     }

    // }

    const RenderUser = ({ user }) => {

        return (

            <TouchableOpacity onPress={() => {

                goToUsersProfile(user.email)

            }} style={{ marginTop: 10 }}>

                <View style={userStyleAdded}>
                    <PictureComponent imageSize="small" url={BASE_URL + user.imagePath} />
                    <Spacer width={14} />
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{user.fullname}</Text>
                    <TouchableOpacity onPress={() => {
                        deleteInterested(user.fullname, item.post.postid)
                    }}>



                        <FontAwesome name="close" size={24} color='red' style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>

                    <Entypo name="add-user" size={22} color={colors.colorPrimary} style={{ marginHorizontal: 5 }} />

                </View>



                <Spacer height={10} />

            </TouchableOpacity>
        )
    }
    const safeClickListener = (callback) => {
        setSafeClick(false)
        setTimeout(function () {
            setSafeClick(true)
        }, 1000);
    }

    const goToProfile = () => {

        if (isSafeClick) {
            if (!showMenu) {
                onProfileClick(item?.user?.email ?? myEmail)
                safeClickListener()
            }
        }
    }
    const goToUsersProfile = (email) => {

        if (isSafeClick) {
            onProfileClick(email)
            safeClickListener()

        }
    }
    const { addMoreUsers, userStyleAdded, userStyle, leftContainer, rightContainer, container, rightContainerView, locationsLine, heartContainer, bottomContainer, seats } = styles
    let url = (BASE_URL + item.imagepath).toString()

    return (

        <TouchableOpacity opacity={0.9} onPress={onPress} style={container}>

            <Spacer height={5} />

            <View style={{ flexDirection: 'row' }}>
                <View style={leftContainer}>
                    <TouchableOpacity onPress={goToProfile}>
                        <PictureComponent imageSize="small" url={BASE_URL + item.imagePath} />
                    </TouchableOpacity>

                    <Spacer width={15} />
                </View>

                <View style={rightContainer}>
                    <View style={rightContainerView}>
                        <View style={{ width: '55%' }}>
                            <TouchableOpacity onPress={goToProfile}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item?.user?.fullname ?? myFullName}</Text>
                            </TouchableOpacity>

                            <Text style={{ fontSize: 12, color: '#595959', opacity: 0.6, marginEnd: 10 }}>{item.post.date}</Text>


                            <Spacer height={10} />

                            {/* locations view   */}
                            <View style={{ height: 'auto' }} >

                                <View style={locationsLine} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo name="location-pin" size={20} color={colors.colorPrimary} />
                                    <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item.post.startplace}</Text>
                                </View>


                                {item.post.moreplaces && item.post.moreplaces.length > 0 && getMiddle()}

                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo name="location-pin" size={20} color={colors.colorPrimary} />
                                    <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item.post.endplace}</Text>
                                </View>


                            </View>
                            <Spacer height={15} />

                        </View>
                        <View style={{ width: '45%' }}>
                            {showMenu &&
                                <TouchableOpacity onPress={() => onMenuClicked(item)}>
                                    <Entypo name="dots-three-horizontal" size={20} color='black' style={{ alignSelf: 'flex-end', marginEnd: 10 }} />

                                </TouchableOpacity>
                            }

                            <View style={{ marginTop: showMenu ? 25 : 44 }}>
                                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item.post.enddate ? 'Ημερομηνίες αναχώρησης' : 'Ημερομηνία αναχώρησης'} </Text>
                                <Spacer height={10} />
                                <Text style={styles.date}>{item.post.startdate}</Text>
                                <Spacer height={3} />
                                <Text style={{ fontSize: 12, color: '#595959', opacity: 0.6, marginEnd: 10, marginStart: 30 }}>έως</Text>
                                <Spacer height={3} />
                                <Text style={styles.date}>{item.post.enddate}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={bottomContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {!showMenu &&
                                <TouchableOpacity style={heartContainer} onPress={() => {
                                    if (isSafeClick) {
                                        onLikeClick(item.post.postid, index)
                                        safeClickListener()
                                    }

                                }} >
                                    <Entypo name={!item.interested ? "heart-outlined" : "heart"} size={20} color={colors.colorPrimary} />
                                </TouchableOpacity>
                            }
                            <Text style={{ fontSize: 12, color: '#595959', opacity: 0.6, marginStart: 10 }}>Θέσεις:
                                <Text style={seats}> {item.post.numseats} </Text>
                            </Text>

                        </View>
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item.post.costperseat}€/Θέση</Text>

                    </View>

                </View>


            </View>

            {item?.users &&

                showInterested &&
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>Ενδιαφερόμενοι</Text>
                    <ScrollView
                        horizontal={true}>


                        <View style={{ flexDirection: 'row' }}>


                            {
                                item?.users.map((user) => {

                                    return <RenderUser user={user} />
                                })

                            }
                            {
                                item.hasMoreUsers &&
                                <View style={{ marginTop: 10 }}>
                                    <TouchableOpacity style={addMoreUsers} onPress={() => { showMoreUsers(item.post) }}>
                                        <AntDesign name="loading1" size={22} color='white' style={{ marginHorizontal: 5 }} />

                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}> Φόρτωσε περισσότερους χρήστες</Text>
                                    </TouchableOpacity>



                                    <Spacer height={10} />

                                </View>
                            }

                        </View>
                    </ScrollView>
                    <View style={{ width: '100%', backgroundColor: colors.CoolGray1.toString(), height: 4 }} />


                </View >
            }


        </TouchableOpacity >


    );
}

const styles = StyleSheet.create({
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
    userStyle: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.CoolGray2,
        alignSelf: 'baseline',
        width: 'auto',
        borderRadius: 13,
        marginEnd: 10,
    },
    addMoreUsers: {
        paddingHorizontal: 13,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.colorPrimary,
        alignSelf: 'baseline',
        width: 'auto',
        borderRadius: 13,
        marginEnd: 10,

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
    seats: {
        fontSize: 13,
        fontWeight: 'bold', marginStart: 10
    },
    leftContainer: {
        width: '16%',

    },
    rightContainer: {
        width: '84%'
    },
    rightContainerView: {
        borderBottomWidth: 1,
        paddingBottom: 7,
        borderBottomColor: colors.CoolGray1,
        flexDirection: 'row'
    },

    date: {
        color: 'white',
        borderRadius: 22,
        paddingVertical: 2,
        paddingHorizontal: 8,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'baseline',
        backgroundColor: colors.colorPrimary,
    },
    container: {
        height: 'auto',
        backgroundColor: 'white',
        marginRight: 6,
        borderRadius: 6,
        paddingVertical: 10
    },

    bottomContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 5
    },
    locationsLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 9,
        right: 0,
        backgroundColor: colors.CoolGray1.toString(),
        width: 1,
        marginVertical: 15
    },
    heartContainer: {
        borderRadius: 5,
        height: 33,
        width: 33,
        backgroundColor: colors.CoolGray2,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
