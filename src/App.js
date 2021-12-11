import React from 'react';

import './App.css';
import Button from '@mui/material/Button'
import  SlateTranscriptEditor  from './slate-transcript-editor-master/src/components/index.js'
import vttToDraft from './import-adapter/vtt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

class App extends React.Component {
  
  SERVER_URL = ''

  constructor(props) {
    super(props);

    this.state = {
      transcriptData: null,
      mediaUrl: null,
      id: null,
    };
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
      const data = vttToDraft(event.target.result);
      console.log(data[1]);
      this.setState({
        transcriptData: data[0],
        id: data[1]
      });
    };
    fileReader.readAsText(file);

    
  }

  uploadTranscript = (vttBody) => {
    let pre = `WEBVTT\n\nNOTE ${this.state.id}\n\n`;
    const vttComplete = pre + vttBody
    
    fetch(`${this.SERVER_URL}/tasks/api/return/`, {
      method: 'POST',
      body: vttComplete
    }).then((response) => console.log(response))
      .catch((error) => {
        console.log('error:')
        console.log(error);
      });
    
  }

  checkTranscriptId = () => {
    if(this.state.transcriptData && !this.state.id) {
      alert('Transcript id missing in VTT. Please use another transcript');
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.transcriptData !== this.state.transcriptData) {
      this.checkTranscriptId();
    }
  }
  
  render() {
  return (
    <div>
      {/* <Button onClick={ () => this.handleLoadMediaUrl()} variant="contained">Load Media URL</Button> */}
      <Button variant="contained" component="label" style={{margin: "10px", marginRight: "0"}}>
        Load Media File
      <input
        hidden
        type={ 'file' }
        id={ 'mediaFile' }
        onChange={ e => this.handleLoadMedia(e.target.files) }
      />
      {this.state.mediaUrl && <CheckCircleIcon style={{marginLeft: "10px"}}/>}
      </Button>
      <Button variant="contained" component="label" style={{margin: "10px"}}>
        Load Transcript (vtt)
      <input
        hidden
        type={ 'file' }
        id={ 'transcriptFile' }
        onChange={ e => this.handleLoadTranscriptJson(e.target.files) }
      />
      {this.state.transcriptData && this.state.id && <CheckCircleIcon style={{marginLeft: "10px"}}/>}
      </Button>

      {this.state.transcriptData && this.state.mediaUrl && this.state.id &&
      <SlateTranscriptEditor
        mediaUrl={this.state.mediaUrl}
        transcriptData={this.state.transcriptData}
        id={this.state.id}
        title={this.state.exportName}
        showTitle={true}
        handleSaveEditor={this.uploadTranscript}
      />}
      
    </div>
  )
  }
}


export default App;
