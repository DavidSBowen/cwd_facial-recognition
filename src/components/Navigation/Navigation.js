import React, { Component } from 'react';
import 'tachyons';

class Navigation extends Component {

    navigationBarContents = (onRouteChange, isSignedIn) => {
        if (isSignedIn) {
            return (
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline ph4 pv2 pointer'>Sign Out</p>
                </nav>
            )
        } else {
            return (
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline ph4 pv2 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline ph4 pv2 pointer'>Register</p>
                </nav>
            )
        }
    }

    render() {
        const { onRouteChange, isSignedIn } = this.props;
        return (
            <div>
                {this.navigationBarContents(onRouteChange, isSignedIn)}
            </div>
        )
    }
}
export default Navigation;