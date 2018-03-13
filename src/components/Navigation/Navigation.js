import React, { Component } from 'react';
import 'tachyons';

class Navigation extends Component {
    render() {
        const { onRouteChange } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    onClick={() => onRouteChange('signin')}
                    className='f3 link dim black underline ph4 pv2 pointer'>Sign Out</p>
            </div>
        )
    }
}
export default Navigation;