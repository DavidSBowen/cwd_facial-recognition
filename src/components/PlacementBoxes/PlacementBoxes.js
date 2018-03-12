import React, { Component } from 'react';
import 'tachyons';
import './PlacementBoxes.css';

class PlacementBoxes extends Component {
    render() {
        const { box } = this.props;
        return (
            <div>
                <div className="bounding-box" style={{
                    top: box.topRow,
                    right: box.rightCol,
                    left: box.leftCol,
                    bottom: box.bottomRow
                }}>
                </div>
            </div>
        )
    }
}

export default PlacementBoxes;