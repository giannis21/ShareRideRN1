import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import { colors } from '../utils/Colors';
import Tab from './Tab';


const { width } = Dimensions.get('screen');

const TabBar = ({ state, navigation }) => {
    const [selected, setSelected] = useState('Αναζήτηση');
    const { routes } = state;
    const renderColor = currentTab => (currentTab === selected ? colors.colorPrimary : 'grey');

    //  const { showTabBar } = useTabBar();

    const animation = useRef(new Animated.Value(0)).current;

    const handlePress = (activeTab, index) => {
        if (state.index !== index) {
            setSelected(activeTab);
            navigation.navigate(activeTab);
        }
    };

    const toggleTabBarAnimation = () => {
        if (selected === "Αναζήτηση") {
            Animated.timing(animation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 100,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    };

    // useEffect(() => {
    //     toggleTabBarAnimation();
    // }, [selected]);

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[styles.container, { transform: [{ translateY: animation }] }]}
            >
                {routes.map((route, index) => (

                    <Tab
                        tab={route}
                        icon={route.params.icon}
                        onPress={() => handlePress(route.name, index)}
                        color={renderColor(route.name)}
                        key={index}
                    />
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 10,
        width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'rgba(220,220,220,0.8)',
        backgroundColor: 'white',
        alignSelf: 'baseline',
        marginHorizontal: 50,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: colors.CoolGray1,
        elevation: 4,
    },
});

export default TabBar;