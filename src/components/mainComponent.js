import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SiteData from '../shared/siteData';
import { brandCarouselData, aboutBrandData } from '../shared/brandData';

import Footer from './footerComponent';
import MainNav from './mainNavComponent';
import { BrandCarousel, BrandJumbo } from './mastComponents';

class Main extends Component {
    render() {

        let logged = {
            url: '/signup',
            icon: 'fa fa-sign-in',
            isLogged: false
        }


        return (
            <div>
                <header>
                    <MainNav url="index.html" children={SiteData.pages} logged={logged} siteName={SiteData.info.siteName} />
                    <Switch>
                        <Route exact path="/" render={() => <BrandCarousel items={brandCarouselData} />} />
                        <Route path="/about" render={() => <BrandJumbo {...aboutBrandData} fadeType="bg-shadefade" />} />
                        <Route path="/view/:kup" render={() => <BrandJumbo {...aboutBrandData} fadeType="bg-shadefade" />} />
                        <Route path="/dashboard/:kup" render={() => <BrandJumbo {...aboutBrandData} fadeType="bg-shadefade" />} />
                    </Switch>
                </header>
                <Footer pages={SiteData.pages} social={SiteData.social} info={SiteData.info} />
            </div>
        );
    }
}

export default Main;

