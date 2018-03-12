import React, { Component } from 'react';
import 'tachyons';
import './FaceRecognition.css';
import PlacementBoxes from '../PlacementBoxes/PlacementBoxes';

class FaceRecognition extends Component {

    placeBoxes = (box) => {
        if (box.length > 0) {
            let theseBoxes = box.map((val, index) => {
                return (<PlacementBoxes key={index} box={val} />)
            });
            return theseBoxes;
        }
    }

    render() {

        const { imageUrl, box } = this.props;
        return (
            <div className="center ma">
                <div className='absolute mt2'>
                    <img id='inputImage' src={imageUrl} alt="Stuff" className="mainPicture" />
                    <div>{this.placeBoxes(box)}</div>
                </div>
            </div>
        )
    }
}

export default FaceRecognition;