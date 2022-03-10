export default async function GetVttCorrectionFromId(id) {
  let response;
  var formdata = new FormData();
  formdata.append("taskId", id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  response = await fetch(
    "https://i13hpc29.ira.uka.de:443/v1/getcorrectedvtt/",
    requestOptions
  );
  if (response.status == 200) {
    let x = await response.json();
    if (x.vtt)
      return x.vtt;
  }

  return false;
}
