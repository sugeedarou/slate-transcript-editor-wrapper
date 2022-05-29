import { MOCK_BACKEND, SERVER_URL } from "../constants";
export default async function GetOrgVttFromId(token, taskId, userId) {
  let response;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Token " + token);

  var formdata = new FormData();
  formdata.append("taskId", taskId);
  formdata.append("userId", userId);

  var requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  response = await fetch(SERVER_URL + "v1/getlistenertask/", requestOptions);
  if (response.status == 200) {
    let x = await response.json();
    if (x.vtt) return x.vtt;
  }

  return false;
}
