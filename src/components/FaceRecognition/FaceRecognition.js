import React, { Component } from 'react';
import 'tachyons';
import './FaceRecognition.css';

class FaceRecognition extends Component {

    render() {

        const { imageUrl } = this.props;

        return (
            <div>
                <img src={imageUrl} alt="Stuff" className="ma4 mainPicture" />
            </div>
        )
    }
}

export default FaceRecognition;