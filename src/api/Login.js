import { MOCK_BACKEND, SERVER_URL } from "../constants";
/**
 * log in api
 * returns the token if login succeed
 * returns false if login failed
 */
 export default async function login(email,password)
 {
     let response;
     var formdata = new FormData();
     formdata.append("email", email);
     formdata.append("password", password);
     
     var requestOptions = {
       method: 'POST',
       body: formdata,
       redirect: 'follow'
     };
     
     response = await fetch(SERVER_URL+"auth/login/", requestOptions);
 
     if(response.status==200)
         return response.json()
     return false;
     
 }