import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import SoundCloudAudio from 'soundcloud-audio';
// import ClassNames from 'classnames';
import axios from 'axios';
let audioCtx = new(window.AudioContext || window.webkitAudioContext)();

class WaveForm extends Component {
  
  constructor(props) {
    super(props);
    this.getAudioData();
  }

  getAudioData ()  {
    axios({url: this.props.audioUrl, responseType: "arraybuffer"})
      .then(response => {
          var audioData = response.data;

          audioCtx.decodeAudioData(audioData, buffer => {
              var decodedAudioData = buffer.getChannelData(0);
              console.log(decodedAudioData);
          });
      });
  }
  
  render() {
    return (
        <div>
          {this.props.audioUrl}
        </div>
    );
  }
}


export default WaveForm;
