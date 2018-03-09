import React, { Component } from 'react';
import 'tachyons';
import './ImageLinkForm.css';

class ImageLinkForm extends Component {
    
    render() {

        const { onInputChangeFunction, onButtonSubmitFunction } = this.props;

        return (
            <div>
                <p className="f3">
                    {'This Magic Brain will detect faces in your pictures.'}
                </p>
                <div className='center'>
                    <div className="form center pa4 br3 shadow-4 inputForm">
                        <input className='f4 pa2 w-70 center br1' type="text"
                        onChange={onInputChangeFunction}
                        onClick={onButtonSubmitFunction} />
                        <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple br1'>Detect</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageLinkForm;