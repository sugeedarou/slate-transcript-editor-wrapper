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
     
     response = await fetch("https://i13hpc29.ira.uka.de:443/auth/login/", requestOptions);
 
     if(response.status==200)
         return response.json()
     return false;
     
 }