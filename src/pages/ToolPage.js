import React from "react";

import "../App.css";
import Button from "@mui/material/Button";
import SlateTranscriptEditor from "../slate-transcript-editor-master/src/components/index.js";
import vttToDraft from "../import-adapter/vtt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getToken, isAuth, setTaskId } from "../user/User";
import { useHistory, Redirect } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import GetVttFromId from "../api/GetVttFromId";
class ToolPage extends React.Component {
  SERVER_URL = "";

  constructor(props) {
    super(props);

    this.state = {
      transcriptData: null,
      mediaUrl: null,
      id: null,
      taskId: "",
    };
  }

  // https://stackoverflow.com/questions/8885701/play-local-hard-drive-video-file-with-html5-video-tag
  handleLoadMedia = (files) => {
    const file = files[0];
    const videoNode = document.createElement("video");
    const canPlay = videoNode.canPlayType(file.type);

    if (canPlay) {
      const fileURL = URL.createObjectURL(file);
      this.setState({
        // transcriptData: DEMO_TRANSCRIPT,
        mediaUrl: fileURL,
        fileName: file.name,
      });
    } else {
      alert("Select a valid audio or video file.");
    }
  };

  handleLoadMediaUrl = () => {
    const fileURL = prompt("Paste the URL you'd like to use here:");

    this.setState({
      mediaUrl: fileURL,
    });
  };

  handleLoadTranscriptJson = (files) => {
    const file = files[0];
    // console.log(file);
    // console.log('read ' + file.type);
    this.setState({ exportName: file.name.split(".")[0] });

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const data = vttToDraft(event.target.result);
      console.log(data[1]);
      console.log(data[0]);
      console.log('.........................');
      this.setState({
        transcriptData: data[0],
        id: data[1],
      });
    };
    fileReader.readAsText(file);
  };

  handleLoadTranscriptFromServer = (text) => {
    // console.log(file);
    // console.log('read ' + file.type);
    this.setState({ exportName: this.state.taskId });
    const data = vttToDraft(text);
    setTaskId(this.state.taskId)
    this.setState({
      transcriptData: data[0],
      id:'task_id: '+ this.state.taskId,
    });
  };

  uploadTranscript = (vttBody) => {
    let pre = `WEBVTT\n\nNOTE ${this.state.id}\n\n`;
    const vttComplete = pre + vttBody;
    let data = new FormData();
    data.append("cfile", new Blob([vttComplete], { type: "text/vtt" }));

    fetch(`${this.SERVER_URL}/tasks/api/return/`, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.status == 200) {
          alert("Successfully sumbitted!");
        } else {
          alert("ERROR. Could not submit.");
        }
      })
      .catch((error) => {
        console.log("error:");
        console.log(error);
        alert("ERROR. Server error.");
      });
  };

  checkTranscriptId = () => {
    if (this.state.transcriptData && !this.state.id) {
      alert("Transcript id missing in VTT. Please use another transcript");
    }
  };

  async getVttFromId()
  {
    let token =  getToken();
    let text = await GetVttFromId(token,this.state.taskId);
    if(text)
      this.handleLoadTranscriptFromServer(text);
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.transcriptData !== this.state.transcriptData) {
      this.checkTranscriptId();
    }
  }

  render() {
    if (isAuth()) {
      return (
        <div className="App">
          <header className="App-header">
            <LogoutButton></LogoutButton>
            {/* <Button onClick={ () => this.handleLoadMediaUrl()} variant="contained">Load Media URL</Button> */}

            <h1 style={{ color: "#ffffff", fontSize: 75 }}>
              Transcription Corrector
            </h1>

            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 10,
                width: "30%",
                padding: 20,
              }}
            >
              <p style={{ color: "#ffffff", fontSize: 10 }}>
                <Button
                  variant="contained"
                  component="label"
                  style={{ margin: "10px", marginRight: "0" }}
                >
                  Load Media File
                  <input
                    hidden
                    type={"file"}
                    id={"mediaFile"}
                    onChange={(e) => this.handleLoadMedia(e.target.files)}
                  />
                  {this.state.mediaUrl && (
                    <CheckCircleIcon style={{ marginLeft: "10px" }} />
                  )}
                </Button>
              </p>
            </div>

<div style={{height:15}}>

</div>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 10,
                width: "30%",
                padding: 20,
              }}
            >
            <Button
              variant="contained"
              component="label"
              style={{ margin: "10px" }}
            >
              Load Transcript (vtt)
              <input
                hidden
                type={"file"}
                id={"transcriptFile"}
                onChange={(e) => this.handleLoadTranscriptJson(e.target.files)}
              />
              {this.state.transcriptData && this.state.id && (
                <CheckCircleIcon style={{ marginLeft: "10px" }} />
              )}
            </Button>

            <p>OR</p>
            <div style={{ display: "flex", flexDirection: "row",alignContent:'center',justifyContent:'center',justifyItems:'center' }}>
            <input
            style={{
              backgroundColor: "#224957",
              width: "100%",
              height: 30,
              marginTop: 10,
              borderRadius: 7,
              color: "#ffffff",
              borderWidth: 0,
              alignSelf:'center'
            }}
            onChange={(e) => {
              this.setState({taskId:e.target.value});
            }}
            placeholder=" Enter the task id"
          ></input>
            <button onClick={()=>this.getVttFromId()} style={{alignSelf:'center',marginLeft:10}}>Submit</button>
          </div>
            </div>

            {this.state.transcriptData &&
              this.state.mediaUrl &&
              this.state.id && (
                <Redirect  to={{pathname:"editor",
              state:{transcriptData:this.state.transcriptData,mediaUrl:this.state.mediaUrl,id:this.state.id,title:this.state.exportName,uploadTranscript:this.state.uploadTranscript}
              }}></Redirect>
                
              )}
          </header>
        </div>
      );
    } else {
      return <Redirect to="login"></Redirect>;
    }
  }
}

export default ToolPage;
