import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SiteData from '../shared/siteData';
import { brandCarouselData, aboutBrandData } from '../shared/brandData';

import Footer from './footerComponent';
import MainNav from './mainNavComponent';
import { BrandCarousel, BrandJumbo } from './mastComponents';

import HomeContent from './homeComponent';
import findKupboard from './findPageComponent';
import { LoginPage, SignUpPage } from './loginAndSignUpComponent';
import ViewKBPage from './viewKBPageComponent';

class Main extends Component {
    render() {

        let logged = {
            url: '/login',
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
                <Switch>
                    <Route exact path={["/", "/about"]} component={HomeContent} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/find" component={findKupboard} />
                    <Route path="/kupboard_view/:kup" component={ViewKBPage} />

                </Switch>
                <Footer pages={SiteData.pages} social={SiteData.social} info={SiteData.info} />
            </div>
        );
    }
}

export default Main;

