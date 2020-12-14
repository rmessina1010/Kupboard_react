import React, { Component } from 'react';
import { Prefoot } from './prefootComponent';
import { FindFormPlusList } from './findKupboardComponent';

import { genericPrefoot } from '../shared/prefootData';

class findKupboard extends Component {

    render() {
        return (
            <React.Fragment>
                <FindFormPlusList />
                <Prefoot {...genericPrefoot} />
            </React.Fragment>
        );
    }
}

export default findKupboard;