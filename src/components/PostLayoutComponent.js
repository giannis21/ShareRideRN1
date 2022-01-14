import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
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
    showMenu
}) {
    var _ = require('lodash');

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

    const { leftContainer, rightContainer, container, rightContainerView, locationsLine, heartContainer, bottomContainer, seats } = styles
    let url = (BASE_URL + item.imagepath).toString()

    return (

        <TouchableOpacity opacity={0.9} onPress={onPress} style={container}>

            <Spacer height={5} />

            <View style={{ flexDirection: 'row' }}>
                <View style={leftContainer}>
                    <TouchableOpacity onPress={() => onProfileClick(item.user.email)}>
                        <PictureComponent imageSize="small" url={BASE_URL + item.imagePath} />
                    </TouchableOpacity>

                    <Spacer width={15} />
                </View>

                <View style={rightContainer}>
                    <View style={rightContainerView}>
                        <View style={{ width: '55%' }}>
                            <TouchableOpacity onPress={() => onProfileClick(item.user.email)}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.user.fullname}</Text>
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
                            <TouchableOpacity style={heartContainer} onPress={() => onLikeClick(item.post.postid, index)}>
                                <Entypo name={!item.interested ? "heart-outlined" : "heart"} size={20} color={colors.colorPrimary} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 12, color: '#595959', opacity: 0.6, marginStart: 10 }}>Θέσεις:
                                <Text style={seats}> {item.post.numseats} </Text>
                            </Text>

                        </View>
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item.post.costperseat}€/Θέση</Text>

                    </View>

                </View>


            </View>

        </TouchableOpacity >


    );
}

const styles = StyleSheet.create({
    seats: {
        fontSize: 13,
        fontWeight: 'bold', marginStart: 10
    },
    leftContainer: {
        width: '16%',
        marginStart: 8
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
        paddingRight: 15,
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
