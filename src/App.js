import React from 'react';

import './App.css';
import Button from '@mui/material/Button'
import  SlateTranscriptEditor  from './slate-transcript-editor-master/src/components/index.js'
import vttToDraft from './import-adapter/vtt';
import trjsonToDraft from './import-adapter/trjson';
import { username, password, SERVER_URL } from './constants.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      transcriptData: null,
      mediaUrl: null,
      authToken: "Token 54bfe8a9d247c3251f15f93d3c2e2d161780f389" //TODO: get Auth data from TR_EC
    };
    this.getMedia = this.getMedia.bind(this);
  }

  componentDidMount() {

    

    fetch(`${SERVER_URL}/api/auth/login/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": username, "password": password})
    }).then((response) => response.json())
      .then((data) => {
        this.setState({authToken: `Token ${data.token}`});
        this.getTranscriptId();
      }).catch((error) => {
        console.log(error);
      });

    


    
  }

  getTranscriptId() {
    //get last parameter of url "trec.com/example/7" returns 7
    //TODO: fix if url ends with / then its currently undefined
    const currentTranscriptId = window.location.href.split("/").at(-1)
    let currentCorrectionId = null

    fetch(`${SERVER_URL}/api/edt/transcripts/${currentTranscriptId}/`, {
      headers: new Headers({
        'Authorization': this.state.authToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        currentCorrectionId = data.correction
        this.getCorrection(currentCorrectionId)
        //this.getMedia(currentTranscriptId)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  getCorrection(correctionId) {
    fetch(`${SERVER_URL}/api/edt/corrections/${correctionId}/`, {
      headers: new Headers({
        'Authorization': this.state.authToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          transcriptData: trjsonToDraft(data.content)
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  getMedia(e) {
    console.log("in getmedia");
    //get last parameter of url "trec.com/example/7" returns 7
    //TODO: fix if url ends with / then its currently undefined
    const currentTranscriptId = window.location.href.split("/").at(-1)

    let blob;
    console.log(this.state);

    fetch(`${SERVER_URL}/api/transcripts/${currentTranscriptId}/download/`, {
      headers: new Headers({
        'Authorization': this.state.authToken,
        //'responseType': 'blob'
      }),
    })
      .then((response) => response.blob())
      .then((data) => {
        blob = data
        const mediaURL = URL.createObjectURL(blob);
        this.setState({
          mediaUrl: mediaURL,
          fileName: 'test' //TODO: echter Dateiname
        });
        console.log(mediaURL);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  
  // https://stackoverflow.com/questions/8885701/play-local-hard-drive-video-file-with-html5-video-tag
  handleLoadMedia = files => {
  const file = files[0];
  const videoNode = document.createElement('video');
  const canPlay = videoNode.canPlayType(file.type);
  
  if (canPlay) {
    const fileURL = URL.createObjectURL(file);
    this.setState({
      // transcriptData: DEMO_TRANSCRIPT,
      mediaUrl: fileURL,
      fileName: file.name
    });
  } else {
    alert('Select a valid audio or video file.');
  }
  };
  
  handleLoadMediaUrl = () => {
  const fileURL = prompt("Paste the URL you'd like to use here:");
  
  this.setState({
    mediaUrl: fileURL
  });
  };

  
  handleLoadTranscriptJson = files => {
    const file = files[0];
    // console.log(file);
    // console.log('read ' + file.type);
    this.setState({ exportName: file.name.split('.')[0] });
    
    const fileReader = new FileReader();
    fileReader.onload = event => {

      this.setState({
        transcriptData: vttToDraft(event.target.result)
      });
    };
    fileReader.readAsText(file);

    
  }
  
  render() {
  return (
    <div>
      {/* <Button onClick={ () => this.handleLoadMediaUrl()} variant="contained">Load Media URL</Button> */}
      <Button variant="contained" component="label">
        Load local Media File
      <input
        hidden
        type={ 'file' }
        id={ 'mediaFile' }
        onChange={ e => this.handleLoadMedia(e.target.files) }
      />
      </Button>
      <Button variant="contained" component="label" onClick={this.getMedia}>
        Load Media File from Server
      </Button>
      <Button variant="contained" component="label">
        Load Transcript (vtt)
      <input
        hidden
        type={ 'file' }
        id={ 'transcriptFile' }
        onChange={ e => this.handleLoadTranscriptJson(e.target.files) }
      />
      </Button>

      {this.state.transcriptData && this.state.mediaUrl && 
      <SlateTranscriptEditor
        mediaUrl={this.state.mediaUrl}
        transcriptData={this.state.transcriptData}
        title={this.state.exportName}
        showTitle={true}
      />}
      
    </div>
  )
  }
}


export default App;
