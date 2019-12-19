import React from 'react';
import './App.css';
import Speech from './components/Speech'
//import CloudSpeech from './components/CloudSpeech'


class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <Speech/>
      </div>
    );
  }
}

export default App;
