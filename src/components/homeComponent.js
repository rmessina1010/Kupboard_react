import React, { Component } from 'react';
import MainWrap from './mainWrapComponent';
import MidMedia from './midMediaComponent';
import MainCardDeck from './cardDeckComponent';
import { Prefoot } from './prefootComponent';

import { genericPrefoot } from '../shared/prefootData';
import { infoDeck } from '../shared/cardData';
import { midPageData } from '../shared/midMediaData';

class HomeContent extends Component {

    render() {
        return (
            <React.Fragment>
                <MainWrap>
                    <MidMedia  {...midPageData} />
                    <MainCardDeck cards={infoDeck} />
                </MainWrap>
                <Prefoot classes="graybar-shift" {...genericPrefoot} />
            </React.Fragment>
        );
    }
}

export default HomeContent;