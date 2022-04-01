/**
 * log in api
 * returns the token if login succeed
 * returns false if login failed
 */
 export default async function GetVttFromId(token,id)
 {
     let response;
     var myHeaders = new Headers();
     myHeaders.append("Authorization", "Token "+token);
     var formdata = new FormData();
     formdata.append("taskId", id);
     
     var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
     
     //response = await fetch("https://i13hpc29.ira.uka.de:443/v1/getvtt/", requestOptions);

     console.log("getvtt api:")
     console.log(id)
     console.log(String(id))
     if (String(id).includes("dropbox")){
        var pieces = String(id).split("dropbox.com/");
        id = "https://dl.dropboxusercontent.com/" + pieces[1]
        console.log(pieces)
        var requestOptions={
            method: 'GET',    
        };
        console.log(response.text)
        if(response.status==200)
            return response.text()
        return false;
     }else{
        var pieces = String(id).split("task_id=");
        console.log(pieces)
        id = "https://i13hpc29.ira.uka.de:443/v1/getvtt/";
        
        var formdata = new FormData();
        formdata.append("taskId", pieces[1]);
        
        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };
          console.log(response.text)
          if(response.status==200)
              return response.vtt()
          return false;
     }

     response = await fetch(id, requestOptions);
     //https://www.dropbox.com/sh/gssibhpm6225t2h/AACblk_yeuT_1bGDH9qf1zpJa?dl=1", requestOptions);   
 }