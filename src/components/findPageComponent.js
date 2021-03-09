import React, { Component } from 'react';
import { Prefoot } from './prefootComponent';
import { FindFormPlusList } from './findKupboardComponent';

import { genericPrefoot } from '../shared/prefootData';

class findKupboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.match.params);
        return (
            <React.Fragment>
                <FindFormPlusList at={this.props.match.params.page || 1} route='/find' />
                <Prefoot {...genericPrefoot} />
            </React.Fragment>
        );
    }
}

export default findKupboard;