import React, { Component } from 'react';

import SiteData from '../shared/siteData';

import Footer from './footerComponent';

class Main extends Component {
    render() {
        return (
            <Footer pages={SiteData.pages} social={SiteData.social} info={SiteData.info} />
        );
    }
}

export default Main;