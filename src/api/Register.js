import { SERVER_URL } from "../constants.js";

/**
 * register api
 * returns true  if register succeeded
 * returns false if not
 */
 export default async function register(email,password)
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
     
     response = await fetch(SERVER_URL + "/auth/register/", requestOptions);
 
     if(response.status==201)
         return true
     return false;
     
 }