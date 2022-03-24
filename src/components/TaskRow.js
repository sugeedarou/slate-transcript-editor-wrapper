import toast, { Toaster } from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import React, { useState } from "react";
import getTextFile from "../api/GetTextFile";
import { getToken } from "../user/User";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import getVttFile from "../api/GetVttFile";
import getMediaFile from "../api/GetMediaFile";
function TaskRow(props) {
  const [progressValue, setProgressValue] = useState(0);

  const correctTaskId = () => {
    
    let token = getToken();
    const win = window.open('https://correction.dataforlearningmachines.com/router?token='+token+'&task_id='+props.task.task_id, '_blank');
    if (win != null) {
      win.focus();
    }
    //navigator.clipboard.writeText(props.task.task_id);
    //toast.success("Task id copied to clipboard", { position: "bottom-center" });
  };
const shareLinkClicked = () => {
  navigator.clipboard.writeText('https://transcriptions.dataforlearningmachines.com/shared?task_id='+props.task.task_id);
  toast.success("Link copied to clipboard", { position: "bottom-center" });
    //navigator.clipboard.writeText(props.task.task_id);
    //toast.success("Task id copied to clipboard", { position: "bottom-center" });
  };
  const downloadTextFile = async () => {
    //navigator.clipboard.writeText(props.task.task_id);
    // toast.success("Task id copied to clipboard", { position: "bottom-center" });
    let token = getToken();
    let text = await getTextFile(props.task.task_id);
    if (text) {
      const element = document.createElement("a");
      const file = new Blob([text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = props.task.task_id+".txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      toast.success("Text downloaded successfully", {
        position: "bottom-center",
      });
    } else {
      toast.error("Text could not be downloaded", {
        position: "bottom-center",
      });
    }
  };


const downloadMediaFile = async () => {
  getMediaFile( props.task.task_id,props.task.task_name);
  //navigator.clipboard.writeText(props.task.task_id);
  // toast.success("Task id copied to clipboard", { position: "bottom-center" });
  /*let token = getToken();
  let text = await getVttFile(token, props.task.task_id);
  if (text) {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = props.task.task_id+".vtt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    toast.success("Vtt downloaded successfully", {
      position: "bottom-center",
    });
  } else {
    toast.error("Vtt could not be downloaded", {
      position: "bottom-center",
    });
  }*/
};
  const downloadVTTFile = async () => {
    //navigator.clipboard.writeText(props.task.task_id);
    // toast.success("Task id copied to clipboard", { position: "bottom-center" });
    let token = getToken();
    let text = await getVttFile(props.task.task_id);
    if (text) {
      const element = document.createElement("a");
      const file = new Blob([text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = props.task.task_id+".vtt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      toast.success("Vtt downloaded successfully", {
        position: "bottom-center",
      });
    } else {
      toast.error("Vtt could not be downloaded", {
        position: "bottom-center",
      });
    }
  };
  

  const calculateProgress = (startingTime, size) => {
    const st = Date.parse(startingTime);
    let et = (size / 1040512) * 40;
    let now = new Date();
    let timePassed = (now - st) / 1000;
    let progress = parseInt((timePassed / et) * 100) * 2;
    if (progress > 99) progress = 99;
    setProgressValue(progress);
  };

  const Status = (task) => {
    let status = task.status.status;
    if (status == "done") {
      return null /*(
        <AiOutlineCheckCircle
          style={{
            flex: 1,
            fontSize: 25,
            color: "green",
            fontWeight: "bold",
            alignSelf: "center",
          }}
        ></AiOutlineCheckCircle>
      );*/
    } else {
      if (status == "failed")
        return (
          <div
          style={{
            flex: 1,
            fontSize: 25,
            
            alignSelf: "center",
          }}
          >
          <AiOutlineCloseCircle
            style={{
              flex: 1,
              fontSize: 25,
              color: "red",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          ></AiOutlineCloseCircle>
          </div>
        );
      else {
        calculateProgress(task.status.date_time, task.status.file_size);
        return (
          <div style={{ flex: 2 ,flexDirection: "row",
          display: "flex"}}>
            <p
              style={{
                flex: 1,
                fontSize: 15,
                alignSelf: "center",
                color: "blue",
                fontWeight: "bold",
              }}
            >
              {status}
            </p>
            <div
              style={{
                flex: 1,
                flexDirection: "row",
                display: "flex",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <progress
                max="100"
                value={progressValue}
                style={{ width: 75, margin: 0, padding: 0 }}
              ></progress>
              <div style={{width:2}}></div>
              <p
                style={{
                  fontSize: 12,
                  alignSelf: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                {progressValue}%
              </p>
            </div>
          </div>
        );
      }
    }
  };
  return (
    <div
      style={{
        marginTop: 5,
        marginBottom: 5,
        flexDirection: "row",
        display: "flex",
        backgroundColor: "rgba(128,128,128,0.25)",
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <p style={{ flex: 1, fontSize: 15, alignSelf: "center" }}>
        {props.task.task_name}
      </p>

      <p
        style={{
          flex: 1,
          fontSize: 15,
          alignSelf: "center",
          padding: 0,
          margin: 0,
        }}
      >
        {new Date(props.task.date_time).toLocaleString()}
      </p>

      <Status status={props.task}></Status>
      {/*props.task.status == "done"?
     <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
         <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
         <button
          onClick={correctTaskId}
          style={{ width: 120, fontSize: 15, alignSelf: "center" }}
        >
          correct
      </button>
        <div style={{ width: 5 }}></div>
        <button
          onClick={shareLinkClicked}
          style={{ width: 120, fontSize: 15, alignSelf: "center" }}
        >
          share link
        </button> 
        <div style={{ width: 5 }}></div>
        <div>
        </div>
        <button
          style={{ fontSize: 15, alignSelf: "center" }}
          {...bindTrigger(popupState)}
        >
          download
    </button>
        <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={downloadVTTFile}>VTT File</MenuItem>
        <MenuItem onClick={downloadTextFile}>Text File</MenuItem>
        <MenuItem onClick={downloadMediaFile}>Media File</MenuItem>
      </Menu>
      </React.Fragment>
      )}
    </PopupState>
      </div>
      :
       props.task.status == "failed"?<div></div>:<div></div>
      */}
      <Toaster></Toaster>
    </div>
  );
}

{
  /**

<div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button style={{ alignSelf: "center" }}>Download Resources</button>
      </div>


*/
}
export default TaskRow;
