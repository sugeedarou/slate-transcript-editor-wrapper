import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import "../App.css";
import { getToken, isAuth, setTaskId } from "../user/User";
import vttToDraft from "../import-adapter/vtt";
import { Redirect } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import toast, { Toaster } from "react-hot-toast";
import GetCorrectedList from "../api/GetCorrectedList";
import { Button } from "@mui/material";
import GetVttCorrectionFromId from "../api/GetVttCorrectionFromId";
import GetVttFromId from "../api/GetVttFromId";
import getMediaURL from "../api/GetMediaURL";
class AdminPage extends React.Component {
  columns = [
    { field: "task_name", headerName: "Task Name", flex: 1 },
    { field: "task_user", headerName: "Creator Email", type: "text", flex: 1 },
    {
      field: "date_transcribed",
      headerName: "Creation Date",
      type: "date",
      flex: 1,
      renderCell: (params) => {
        let date = new Date(params.row.date_transcribed)
        return <div>{date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()}</div>}
    },
    { field: "corrected_user", headerName: "Corrector Email", flex: 1 },
    {
      field: "date_corrected",
      headerName: "Correction Date",
      type: "date",
      flex: 1,
      renderCell: (params) => {
      let date = new Date(params.row.date_corrected)
      return <div>{date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()}</div>}
    },
    { field: "language", headerName: "language Date", type: "text", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      align: "left",
      headerAlign: "left",
      renderCell: (params) => <Button onClick={()=>{this.openListener(params)}}>listen</Button>,
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      transcriptData: null,
      mediaUrl: null,
      id: null,
      taskId: "",
      fileName: "",
      tasks: [],
      rows: [
        {
          id: 1,
          task_name: "task name",
          creator_email: "test@test.com",
          creation_date: "1/15/2022",
          corrector_email: "test@test.com",
          correction_date: "1/15/2022",
        },
        {
          id: 2,
          task_name: "atask name",
          creator_email: "test@test.com",
          creation_date: "1/15/2022",
          corrector_email: "test@test.com",
          correction_date: "1/15/2022",
        },
        {
          id: 3,
          task_name: "task name",
          creator_email: "test@test.com",
          creation_date: "1/15/2022",
          corrector_email: "test@test.com",
          correction_date: "1/15/2022",
        }
      ],
    };
  }

  openListener(params)
  {
    this.state = {
      transcriptData: null,
      mediaUrl: null,
      id: null,
      taskId: params.row.id,
      fileName: "",
    };

    this.getVttFromId();
    this.getMediaURL();
  }

  async getVttFromId() {
    let token = getToken();
    let text = await GetVttCorrectionFromId(token, this.state.taskId);
    if (text) {
      console.log("Hss");
      // if (!window.confirm("Load your last uploaded correction?")) {
      //   console.log("%%%%%%%66666")
      //   //text = await GetVttFromId(token, this.state.taskId);
      //   text = await GetVttCorrectionFromIdWA(token, this.state.taskId);
      // }
    } else {
      text = await GetVttFromId(token, this.state.taskId);
    }
    if (text) this.handleLoadTranscriptFromServer(text);
    else
      toast.error("Failed to load the file, please check your task id", {
        position: "bottom-center",
      });
  }

  async getMediaURL() {
    let mediaURL = await getMediaURL(this.state.taskId);
    if (mediaURL) {
      this.setState({ mediaUrl: mediaURL });
    } else {
      alert("failed to load files");
    }
  }

  handleLoadTranscriptFromServer(text) 
  {
    // console.log(file);
    // console.log('read ' + file.type);
    this.setState({ exportName: this.state.taskId });
    const data = vttToDraft(text);
    setTaskId(this.state.taskId);
    this.setState({
      transcriptData: data[0],
      id: "task_id:" + data[1],
      fileName: "",
    });
  }

  componentDidMount() {
    let token = getToken();
    GetCorrectedList(token).then((v) => {
      console.log(v);
      if (v) this.setState({ rows: v });
    });
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
            <div style={{ width: "85%", textAlign: "end" }}>
              <Button
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset Filters
              </Button>
            </div>

            <div
              style={{
                height: 700,
                width: "85%",
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: 20,
              }}
            >
              <DataGrid
                sx={{ borderWidth: 0 }}
                Background="Transparent"
                RowBackground="Transparent"
                rows={this.state.rows}
                columns={this.columns}
              />
            </div>
            {this.state.transcriptData && this.state.mediaUrl && (
              <Redirect
                to={{
                  pathname: "listener",
                  state: {
                    fileName: this.state.fileName,
                    transcriptData: this.state.transcriptData,
                    mediaUrl: this.state.mediaUrl,
                    id: this.state.id,
                    exportName: this.state.exportName,
                    uploadTranscript: this.state.uploadTranscript,
                  },
                }}
              ></Redirect>
            )}

            <Toaster></Toaster>
          </header>
        </div>
      );
    } else {
      return <Redirect to="login"></Redirect>;
    }
  }
}

export default AdminPage;
