import "../App.css";
import React from "react";
import { Redirect } from "react-router-dom";
import SlateTranscriptEditor from "../slate-transcript-editor-master-listener/src/components/index.js";
import { isAuth } from "../user/User";
import {useLocation} from 'react-router-dom';
import LogoutButton from "../components/LogoutButton";
import { useHistory } from "react-router-dom";

function SlateTranscriptEditorPageListener() {
  const history = useHistory();
  const props = useLocation();
  if (isAuth()) {
    return (
      <div>
      <button
            onClick={()=>
            {
              history.replace("/adminpage");
            }}
            style={{
              position: "absolute",
              top: "4%",
              left: "2%",
              zIndex: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              border: "none",
              fontSize: "0.75em",
              cursor: "pointer",
            }}
          >
            Back
          </button>
      <LogoutButton></LogoutButton>
      <SlateTranscriptEditor
        mediaUrl={props.state.mediaUrl}
        transcriptData={props.state.transcriptData}
        id={props.state.id}
        title={props.state.exportName}
        showTitle={true}
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
