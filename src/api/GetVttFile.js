import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockGetVttFile(id) {
  let vtt = "WEBVTT\n\nNOTE task_id: 344c770c-c12c-4075-903d-7d0547b3b45d\n\n00:00:00.000 --> 00:00:11.580\n";
  vtt += "this is a transcript of a test sound file in which i speak a couple of words <unk> i also include a next sentence in hope that it will create a new paragraph\n\n";
  vtt += "00:00:13.290 --> 00:00:14.730\nand for completeness\n\n00:00:14.730 --> 00:00:16.410\nhere is a third sentence";
  return vtt;
}


/**
 * 
 * @param {the token of the logged in user} token 
 * @param {the task_id of the file} id 
 * @returns the vtt text if succeeded, otherwise false
 */

export default async function getVttFile(id) {
  if (MOCK_BACKEND) {
    return mockGetVttFile(id);
  }
  let response;
  var formdata = new FormData();
  formdata.append("taskId", id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  response = await fetch(
    SERVER_URL + "/v1/getvtt/",
    requestOptions
  );

  if (response.status === 200) {
    let x = await response.json();
    return x.vtt;
  }

  return false;
}