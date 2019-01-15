import React, { Component } from "react";
import { Popup } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./wave.css";

class WaveItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Popup
        trigger={
          <div
            onClick={ () => { 
              this.props.onSeekTrack();
            }}
            className={`wavebar ${this.props.reach} `}
            style={{ height: this.props.height }}
            data-tip="hello world"
          />
        }
        content={this.props.popup}
      />
    );
  }
}

export default WaveItem;
