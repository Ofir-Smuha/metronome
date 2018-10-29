import React, { Component } from 'react';
import styled from 'styled-components';

import audio1 from 'assets/audio/click1.wav'
import audio2 from 'assets/audio/click2.wav'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MetronomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bpm = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Slider = styled.input`
  width: 250px;
  margin-bottom: 10px;
`;

const StartButton = styled.button`
  font-size: 1.3rem;
  padding: 5px;
  background-color: lightblue;
  border-radius: 5px;
  border: 1px solid #EDEDED;
  cursor: pointer;
  outline: none;
  
  &:hover {
    color: orange;
  }
`;

class Metronome extends Component {

  state= {
    bpm: 100,
    count: 0,
    isPlaying: false,
    beatsPerMeasure: 4,
    audio1: new Audio(audio1),
    audio2: new Audio(audio2)
  };

  handleBpmChange = ({target}) => {
    if (this.state.isPlaying) {
      clearInterval(this.timer);
      this.setState({
        bpm: target.value,
        isPlaying: false
      },this.handleIsPlayingChange)
    } else {
      this.setState({
        bpm: target.value
      })
    }
  };

  handleIsPlayingChange = () => {

    if (this.state.isPlaying) {
      clearInterval(this.timer);
      this.setState({isPlaying: false})
    } else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
        count: 0,
        isPlaying: true
      })
    }

    this.state.audio1.play();
    this.setState({
      isPlaying: !this.state.isPlaying
    });
    this.playClick()
  };

  playClick = () => {
    if (this.state.count % this.state.beatsPerMeasure === 0) {
      this.state.audio1.play()
    } else {
      this.state.audio2.play()
    }
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }))
  };

  render() {
    return (
      <Wrapper>
        <MetronomeContainer>
          <Bpm>{this.state.bpm}: BPM</Bpm>
          <Slider
            type="range"
            min="60"
            max="240"
            defaultValue={this.state.bpm}
            onChange={this.handleBpmChange}
          />
          <StartButton onClick={this.handleIsPlayingChange}>{this.state.isPlaying? 'stop' : 'start'}</StartButton>
        </MetronomeContainer>
      </Wrapper>
    );
  }
}

export default Metronome;
