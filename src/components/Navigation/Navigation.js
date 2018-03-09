import React, { Component } from 'react';
import 'tachyons';

class Navigation extends Component {
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f3 link dim black underline ph4 pv2 pointer'>Sign Out</p>
            </div>
        )
    }
}
export default Navigation;