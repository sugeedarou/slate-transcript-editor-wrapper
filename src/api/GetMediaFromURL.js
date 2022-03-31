export default async function GetMediaFromURL(url)
{
    let response;
    var requestOptions={
       method: 'GET',    
   };
   var pieces = url.split("dropbox.com/");
   url = "https://dl.dropboxusercontent.com/" + pieces[1]
   response = await fetch(url, requestOptions);
   console.log("media APi")
   console.log(response)
   console.log(response.body)
   if(response.status==200)
       return response.body;
   return false;
}