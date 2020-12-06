import React, { Component } from 'react';

import SiteData from '../shared/siteData';

import Footer from './footerComponent';
import MainNav from './mainNavComponent';

class Main extends Component {
    render() {

        let logged = {
            url: '#',
            icon: 'fa fa-sign-in',
            isLogged: false
        }


        return (
            <div>
                <header>
                    <MainNav url="index.html" children={SiteData.pages} logged={logged} siteName={SiteData.info.siteName} />
                </header>
                <Footer pages={SiteData.pages} social={SiteData.social} info={SiteData.info} />
            </div>
        );
    }
}

export default Main;