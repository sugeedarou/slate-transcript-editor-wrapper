import { MOCK_BACKEND, SERVER_URL } from "../constants";
import { getToken } from "../user/User";

 export default async function SetVttCorrection(vtt_name,vtt_content,finished)
 {
     let response;
     var myHeaders = new Headers();
     let token = getToken()
     myHeaders.append("Authorization", "Token "+token);
     var formdata = new FormData();
    if(vtt_name!="")
        formdata.append("vtt_name", vtt_name);
    formdata.append("vtt", vtt_content);
    formdata.append("finished", finished);
     
     var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
     
     response = await fetch(SERVER_URL+"v1/setvttcorrection/", requestOptions);
 
     if(response.status==200)
         return true
     return false;
     
 }