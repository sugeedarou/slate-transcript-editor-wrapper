import { MOCK_BACKEND, SERVER_URL } from "../constants";

function mockGetTextFile(task_id) {
  return "this is the first sentence\n\nthis is the second one\n\nand here is the third one";
}

/**
 * 
 * @param {the token of the logged in user} token 
 * @param {the task_id of the file} task_id 
 * @returns the text if succeeded, otherwise false
 */
export default async function getTextFile(task_id) {
  if (MOCK_BACKEND) {
    return mockGetTextFile(task_id);
  }
  let response;

  var formdata = new FormData();
  formdata.append("taskId", task_id);
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    body: formdata,
  };
  response = await fetch(
    SERVER_URL + "/v1/gettext/",
    requestOptions
  );
  if (response.status === 200) {
    let text = await response.json();
    if (text.text) return text.text;
    else return false;
  }
  return false;
}
