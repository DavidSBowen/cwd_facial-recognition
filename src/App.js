import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'b16a97bcc12f4449b6c84d3461811a8b'
});

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
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  preFormCalculateFaceBox = (data) => {
    const boundingBoxes = data.outputs[0].data.regions;
    const inputImage = document.getElementById('inputImage');
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);

    let thisFaceBox = [];

    for (let face = 0; face < boundingBoxes.length; face++) {
      let thisFace = (boundingBoxes[face].region_info.bounding_box)
      thisFaceBox.push(this.calculateFaceBox(thisFace, width, height));
    }
    this.displayFaceBox(thisFaceBox);
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  calculateFaceBox = (thisFace, width, height) => {
    return {
      leftCol: thisFace.left_col * width,
      topRow: thisFace.top_row * height,
      bottomRow: height - (thisFace.bottom_row * height),
      rightCol: width - (thisFace.right_col * width)
    }
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
        (response) => {
          this.preFormCalculateFaceBox(response);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
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
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
      </div>
    );
  }
}

export default App;
