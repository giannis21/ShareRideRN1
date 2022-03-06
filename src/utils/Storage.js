import AsyncStorage from "@react-native-community/async-storage";
export const setValue = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val)

  } catch (e) {
    console.log({ e })
  }
};


export const getValue = async (key) => {

  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const keyNames = {
  email: 'email',
  lastLoginDate: 'lastLoginDate',
  age: 'age',
  car: 'car',
  facebook: 'facebook',
  fullName: 'fullName',
  gender: 'gender',
  instagram: 'instagram',
  phone: 'phone',
  password: 'password',
  token: 'token',
  carDate: 'carDate'

}
export const filterKeys = {
  showMe: 'showMe',
  ageRange: 'ageRange',
  maxCost: 'maxCost',
  carAge: 'carAge',
  carMark: 'carMark',

}
