 import baseUrl from "./serverUrl"
 import AsyncStorage from "@react-native-async-storage/async-storage"
 async function UserVerifier(JWTTOKEN,navigation){
    try {
        console.log(navigation)
        const res = await fetch(`${baseUrl}/user/userverifier`,{
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
                'authorization' : `bearer ${JWTTOKEN}`
            }
        })
        const data = await res.json()
        if(data.status){
            return(true)
        }else{
            return false
        }
    } catch (error) {
        console.log("Error in the UserVerfier Function",error) 
    }

}
module.exports = UserVerifier