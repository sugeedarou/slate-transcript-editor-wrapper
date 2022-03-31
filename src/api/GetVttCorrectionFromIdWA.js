import { MOCK_BACKEND, SERVER_URL } from "../constants";
export default async function getVttCorrectionFromIdWA(token,id) {
  let response;
  var formdata = new FormData();
  formdata.append("taskId", id);
  formdata.append("original", true);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Token " + token);

  var requestOptions = {
    headers:myHeaders,
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  console.log("id")
  console.log(id)

  response = await fetch(
    SERVER_URL+"v1/getcorrectedvtt/",
    requestOptions
  );
  if (response.status == 200) {
    let x = await response.json();
    if (x.vtt)
      return x.vtt;
  }

  return false;
}
