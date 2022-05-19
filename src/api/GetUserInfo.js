import { MOCK_BACKEND, SERVER_URL } from "../constants";
import { setCanMakeAs } from "../user/User";
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
     
     response = await fetch(SERVER_URL+"auth/userinfo/", requestOptions)
     console.log(response)
     if(response.status==200)
     {
          let jsonResp = response.json()
          setCanMakeAs(jsonResp.canMakeAssignments)
         return jsonResp
    }
     return false;
     
 }