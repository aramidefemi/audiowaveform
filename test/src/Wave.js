import React, { Component } from "react";
import WaveItem from "./wave-item";
import axios from "axios";
import "./wave.css";

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const WaveBar = () => <div className="wavebar" />;

class WaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SPACE_BETWEEN_BARS: 0.2,
      buckets: []
    };
    this.bucketArray = this.bucketArray.bind(this);
    this.getAudioData();
  }

  getAudioData() {
    axios({ url: this.props.audioUrl, responseType: "arraybuffer" }).then(
      response => {
        var audioData = response.data;
        audioCtx.decodeAudioData(audioData, buffer => {
          var decodedAudioData = buffer.getChannelData(0);
          console.log(this.bucketArray(decodedAudioData));
        });
      }
    );
  }
  bucketArray(decodedAudioData) {
    const NUMBER_OF_BUCKETS = 100; // number of "bars" the waveform should have
    let bucketDataSize = Math.floor(
      decodedAudioData.length / NUMBER_OF_BUCKETS
    );
    let buckets = [];
    for (var i = 0; i < NUMBER_OF_BUCKETS; i++) {
      let startingPoint = i * bucketDataSize;
      let endingPoint = i * bucketDataSize + bucketDataSize;
      let max = 0;
      for (var j = startingPoint; j < endingPoint; j++) {
        if (decodedAudioData[j] > max) {
          max = decodedAudioData[j];
        }
      }
      let size = Math.abs(max);
      buckets.push({comment: 'show comment', volume: size / 2});
    }
    console.log(buckets);
    this.setState({
      buckets: buckets
    });
  }

  render() {
    return (
      <div style={{ display: "flex", transform: "scale(.6)" }}>
        {this.state.buckets.map((bucket, index) => {
       
          let bucketSVGHeight = bucket.volume * 200.0;

          var reach = this.props.data.currentTime / (this.props.data.duration /  100) >= index ? "white" : ""; // if the current time is  greater or equal to the current position (i) decorate with white class
          return (
            <WaveItem
              popup={bucket.comment}
              height={bucketSVGHeight}
              key={index}
              onSeekTrack={ ()=>this.props.onSeekTrack(index * (this.props.data.duration /  100) )}
              reach={reach}
            />
          );
        })}
      </div>
    );
  }
}

export default WaveForm;
