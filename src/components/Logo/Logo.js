import React, { Component } from 'react';
import 'tachyons';
import Tilt from 'react-tilt';
import './Logo.css';
import smallLogo from './Game_Controller-256.png'

class Logo extends Component {
    render() {
        return (
            <div className='ma4 mt0'>
                <Tilt className="Tilt br2 shadow-2" options={{ max: 50, speed: 100, scale: 1.1 }} style={{ height: 200, width: 200 }} >
                    <div className="Tilt-inner">
                        <img className="" width='150px' height='150px' src={smallLogo} alt="Game Controller" />
                    </div>
                </Tilt>
            </div>
        )
    }
}

export default Logo;