import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
const NODE_URL = 'http://127.0.0.1:3001'
let song_Chosen;
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: [],
      currentTrack: null,
    }
  }
  componentDidMount = async (person) => {
    song_Chosen = person;
    this.fetchAllTracks();
    this.fetchPlaylist();
  };
  fetchAllTracks = async () => {
    const response = await fetch(`${NODE_URL}/${song_Chosen}`);
    const tracks = await response.json();
    // console.log(tracks);
    this.setState({ tracks });   
  }

  render() {
    return(
      <div>

        
          <h4>choose an artist to listen to:</h4>

        <br></br>
        <button class="button" onClick={() => this.componentDidMount("bad_bunny")}>Bad Bunny</button>
        <button class="button" onClick={() => this.componentDidMount("romeo")}>Romeo Santos</button>
        <button class="button" onClick={() => this.componentDidMount("danny")}>Danny Lux</button>
        <button class="button" onClick={() => this.componentDidMount("jenni")}>Jenni Rivera</button>
        <button class="button" onClick={() => this.componentDidMount("ivan")}>Ivan Cornejo</button>
        <br />
        <br />
        <br/>
        <br/>
        <ReactAudioPlayer src={this.state.currentTrack} controls autoPlay/>
       {this.state.tracks.map(track => {
      return (
        <div align="center">
          <img src={track.album.images[0].url} width="20%" />
          <h1>{track.name}</h1>
          <button  class="click" onClick={() => this.setState({currentTrack: track.preview_url})}>Play</button>
          <h3>Release date:{track.album.release_date}</h3>
        </div>
      )
    })}
    </div>
    )
  }
}
export default App;