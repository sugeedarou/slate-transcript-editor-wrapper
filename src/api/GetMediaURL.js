import { MOCK_BACKEND, SERVER_URL } from "../constants";
export default async function getMediaURL(taskId)
 {
     let response;
     
     var formdata = new FormData();
     console.log('task')
     console.log(taskId)
     formdata.append("taskId", taskId);

     var requestOptions = {
       method: 'POST',
       body: formdata
     };
     
     response = await fetch(SERVER_URL+"v1/getmediaurl/", requestOptions)
     
     if(response.status==200)
     {
       let url = await response.json()
         return url.mediaUrl
     }
     return false;
     
 }