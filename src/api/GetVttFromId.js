import { MOCK_BACKEND, SERVER_URL } from "../constants";
export default async function GetVttFromId(token, id) {
  let response;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Token " + token);
  var formdata = new FormData();
  formdata.append("taskId", id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    headers: myHeaders
  };

  

  response = await fetch(
    SERVER_URL+"v1/getvtt/",
    requestOptions
  );
  if (response.status == 200) {
    
    let x = await response.json();
    if(x.vtt)
      return x.vtt;
  }

  return false;
}
