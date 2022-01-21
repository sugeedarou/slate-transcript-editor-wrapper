import { getToken } from "../user/User";

 export default async function SetVttCorrection(vtt_name,vtt_content)
 {
     let response;
     var myHeaders = new Headers();
     let token = getToken()
     myHeaders.append("Authorization", "Token "+token);
     var formdata = new FormData();
    if(vtt_name!="")
        formdata.append("vtt_name", vtt_name);
    formdata.append("vtt", vtt_content);
     
     var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
     
     response = await fetch("https://i13hpc29.ira.uka.de:443/v1/setvttcorrection/", requestOptions);
 
     if(response.status==200)
         return true
     return false;
     
 }