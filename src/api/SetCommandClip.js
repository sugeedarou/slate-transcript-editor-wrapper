import { getToken } from "../user/User";
import { SERVER_URL } from "../constants.js";

 export default async function setCommandClip(
     originalText, 
     correctedText, 
     prevContext, 
     succContext, 
     commandClip,
     beginContext,
     beginText,
     endText,
     endContext,
     taskID)
 {
     let response;
     var myHeaders = new Headers();
     let token = getToken()
     myHeaders.append("Authorization", "Token "+token);
     var formdata = new FormData();

    formdata.append("originalText", originalText);
    formdata.append("correctedText", correctedText);
    formdata.append("prevContext", prevContext);
    formdata.append("succContext", succContext);
    formdata.append("commandClip", commandClip);
    formdata.append("beginContext", beginContext);
    formdata.append("beginText", beginText);
    formdata.append("endText", endText);
    formdata.append("endContext", endContext);
    formdata.append("taskID", taskID);
     
     var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
     
     response = await fetch(SERVER_URL + "/v1/commandClips/", requestOptions);
     if(response.status==200)
         return true
     return false;
     
 }