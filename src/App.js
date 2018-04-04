import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';

// Set this to either 'local' or 'heroku'
const environment = 'heroku';



const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  },
  environment: environment
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState
  }

  componentDidMount() {
    if (environment === 'local') {
      this.setState({ apiUrlBasedOnEnvironment: 'http://127.0.0.1:3000/' });
    } else if (environment === 'heroku') {
      this.setState({ apiUrlBasedOnEnvironment: 'https://infinite-hamlet-44956.herokuapp.com/' });

    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
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
    this.setState({ imageUrl: this.state.input, box: {} })
    fetch(this.state.apiUrlBasedOnEnvironment + 'imageurl', {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then((response) => {
        this.preFormCalculateFaceBox(response);

        fetch(this.state.apiUrlBasedOnEnvironment + 'image', {
          method: "put",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(resp => {
            return resp.json()
          })
          .then(data => {
            return this.setState(Object.assign(this.state.user, { entries: data.entries }));
          });

      },
        (err) => {
          console.log(err);
        }
      )
  }

  onRouteChange = (route) => {
    if (route === 'signout' || route === 'signin') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({
      route: route
    });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  render() {
    const { isSignedIn, imageUrl, box, route, apiUrlBasedOnEnvironment } = this.state;
    return (
      <div className="App">
        {/* <Particles className='particles'
          params={particlesOptions}
        /> */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          : (
            route === 'signin' ?
              <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} apiUrlBasedOnEnvironment={apiUrlBasedOnEnvironment} />
              : // only remaining value here is route === 'register'
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} apiUrlBasedOnEnvironment={apiUrlBasedOnEnvironment} />
          )
        }
      </div>
    );
  }
}

export default App;
