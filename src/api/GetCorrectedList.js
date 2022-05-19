import { MOCK_BACKEND, SERVER_URL } from "../constants";
export default async function GetCorrectedList(token)
 {
     let response;
     
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Token "+token);
     
     var requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
     };
     
     response = await fetch(SERVER_URL+"v1/getcorrectedlist/", requestOptions)
     
     if(response.status==200)
     {
       let url = await response.json()
         return url.results
     }
     return false;
     
 }