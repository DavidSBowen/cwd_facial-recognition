import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChangeFunction = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmitFunction = () => {
    console.log('click')
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputchange={this.onInputChangeFunction} onButtonSubmit={this.onButtonSubmitFunction} />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
