import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';

const app = new Clarifai.App({
  apiKey: 'b16a97bcc12f4449b6c84d3461811a8b'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 1000
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
      box: {},
      route: 'signin',
      isSignedIn: false
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

  onRouteChange = (route) => {
    if (route === 'signout' || route === 'signin') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          : (
            route === 'signin' ?
              <SignIn onRouteChange={this.onRouteChange} />
              : // only remaining value here is route === 'register'
              <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
