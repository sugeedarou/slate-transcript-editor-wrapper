import { SERVER_URL } from "../constants.js";

export default async function getUserInfo(token)
 {
     let response;
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Token "+token);
     
     var formdata = new FormData();
     
     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: formdata,
       redirect: 'follow'
     };
     
     response = await fetch(SERVER_URL + "/auth/userinfo/", requestOptions)
     
     if(response.status==200)
         return response.json()
     return false;
     
 }