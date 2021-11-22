import EncryptedStorage from 'react-native-encrypted-storage';
import jwtDecode from 'jwt-decode';

const key= 'authToken';

const storeToken= async (authToken)=>{
    try {
        await EncryptedStorage.setItem(key, authToken);
        
    } catch (error) {
        console.log("couldn't save the user info", error);
    }
};

const getToken= async()=>{
    try {
        return await EncryptedStorage.getItem(key);
    } catch (error) {
        console.log("couldn't retreive the info", error);
    }
};

const getUser=async()=>{
    const token = await getToken();
    return (token)? jwtDecode(token):null;
}

const removeToken= async()=>{
    try {
        return await EncryptedStorage.removeItem(key);
    } catch (error) {
        console.log("Error in removing the info", error);
    }
};
 export default {
     getUser,
     getToken,
     storeToken,
     removeToken,
 }