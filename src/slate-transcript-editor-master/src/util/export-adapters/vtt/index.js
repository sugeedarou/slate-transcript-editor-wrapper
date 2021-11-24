import { shortTimecode } from '../../timecode-converter/index.js';
import secondsToTimecode from '../../timecode-converter/src/secondsToTimecode';

import { Node } from 'slate';
import { func } from 'prop-types';

const normalisePlayerTime = function (seconds, fps) {
    return Number((1.0 / fps * Math.floor(Number((fps * seconds).toPrecision(12)))).toFixed(2));
  };
  /*
   * @param {*} seconds
   * @param {*} fps
   */
  
  
  const secondsToTimecodeVtt = function (ui_time, time_seconds) {
    // handle edge case, trying to convert zero seconds
    if (time_seconds === 0) {
      return '00:00:00.000';
    } // written for PAL non-drop timecode
    let ms = time_seconds.toString()
    let sec_ms = ms.split('.')
    let sec = sec_ms[0]
    ms = sec_ms[1]
    if(ms==undefined){
        ms = '000'
    }

    ms = ms.substring(0,3)

    if(ui_time==undefined){
        let end_h = (Math.floor((sec/(60*60)) % 24)).toString()
        let end_min = (Math.floor((sec/(60)) % 60)).toString()
        let end_sec = (Math.floor(sec % 60)).toString()
        return `${end_h.padStart(2,"0")}:${end_min.padStart(2,"0")}:${end_sec.padStart(2,"0")}.${ms.padEnd(3, "0")}`;
    }


    return `${ui_time}.${ms.padEnd(3, "0")}`;
  };

const toVttspk = function(spk){
    return `<${spk} > `;
}

const slateToVtt = ({
  value,
  speakers,
  timecodes,
  atlasFormat
}) => {
  return value // Return the string content of each paragraph in the value's children.
  .map(n => {
      let end_TimeCode
      let end_sec
      let text = Node.string(n)
      if(text===""||text===" ")
      {
        text = "empty"
      }
      if(n.children[0].text===""){
        end_TimeCode = n.startTimecode
        end_sec = JSON.stringify((parseFloat(n.start)+0.01))
      }else{
        end_TimeCode = undefined
        end_sec = n.children[0].words.at(-1).end
      }
      return `${timecodes ? `${secondsToTimecodeVtt(n.startTimecode,n.start)} --> ` : ''}${timecodes ? `${secondsToTimecodeVtt(end_TimeCode,end_sec)}\t` : ''} \n ${speakers ? `${toVttspk(n.speaker)}`  : ''}${text}`;
  }) // Join them all with line breaks denoting paragraphs.
  .join('\n\n')+'\n\n';
};

export default slateToVtt;