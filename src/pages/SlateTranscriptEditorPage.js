import "../App.css";
import React, { useState } from "react";
import login from "../api/Login";
import ClipLoader from "react-spinners/ClipLoader";
import { auth } from "../user/User";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, Redirect } from "react-router-dom";
import SlateTranscriptEditor from "../slate-transcript-editor-master/src/components/index.js";
import { isAuth } from "../user/User";
import {useLocation} from 'react-router-dom';

function SlateTranscriptEditorPage() {
  const props = useLocation();
  //props=props.state
  console.log("props")
  console.log(props.state.id)
  if (isAuth()) {
    return (
      <SlateTranscriptEditor
        mediaUrl={props.state.mediaUrl}
        transcriptData={props.state.transcriptData}
        id={props.state.id}
        title={props.state.exportName}
        showTitle={true}
        handleSaveEditor={props.state.uploadTranscript}
      />
    );
  } else {
    return <Redirect to="login"></Redirect>;
  }
}
export default SlateTranscriptEditorPage;
