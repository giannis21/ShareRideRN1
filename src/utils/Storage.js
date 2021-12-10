
export const setValue = async (key, token) => {
    try {
        await AsyncStorage.setItem(key, token);
    } catch (error) { }

};

export const getValue = async (key, token) => {
    try {
        return await AsyncStorage.getValue(key, token);
    } catch (error) {
        return null
    }
};