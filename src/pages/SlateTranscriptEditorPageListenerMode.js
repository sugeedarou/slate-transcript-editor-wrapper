import "../App.css";
import React from "react";
import { Redirect } from "react-router-dom";
import SlateTranscriptEditor from "../slate-transcript-editor-master-listener/src/components/index.js";
import { isAuth } from "../user/User";
import {useLocation} from 'react-router-dom';
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";

function SlateTranscriptEditorPageListener() {
  const props = useLocation();
  if (isAuth()) {
    return (
      <div>
      <BackButton></BackButton>
      <LogoutButton></LogoutButton>
      <SlateTranscriptEditor
        mediaUrl={props.state.mediaUrl}
        transcriptData={props.state.transcriptData}
        id={props.state.id}
        title={props.state.exportName}
        showTitle={true}
        handleSaveEditor={props.state.uploadTranscript}
        fileName={props.state.fileName}
        isEditable={false}
      />
      </div>
    );
  } else {
    return <Redirect to="login"></Redirect>;
  }
}
export default SlateTranscriptEditorPageListener;
