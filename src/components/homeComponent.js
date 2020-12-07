import React, { Component } from 'react';
import { Prefoot } from './prefootComponent';

import { genericPrefoot } from '../shared/prefootData';

class HomeContent extends Component {

    render() {
        return (
            <React.Fragment>
                <Prefoot classes="graybar-shift" {...genericPrefoot} />
            </React.Fragment>
        );
    }
}

export default HomeContent;