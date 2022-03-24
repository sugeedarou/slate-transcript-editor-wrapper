import { MOCK_BACKEND, SERVER_URL } from "../constants";
//import { mockAudioFile } from "../dummyData/3sentences.wav";

function mockGetMediaFile(task_id, name) {
  const audioFile = require("../dummyData/3sentences.wav");
  let a = document.createElement("a");
  a.href = audioFile;
  a.download = name;
  a.click();
}

export default async function getMediaFile(task_id, name) {
  if (MOCK_BACKEND) {
    return mockGetMediaFile(task_id, name);
  }
  
  var formdata = new FormData();
  formdata.append("taskId", task_id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(SERVER_URL + "/v1/getmedia/", requestOptions)
    .then((response) =>
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
      })
    )
    .catch((error) => console.log("error", error));
}
