import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SiteData from '../shared/siteData';
import { brandCarouselData, aboutBrandData } from '../shared/brandData';

import Footer from './footerComponent';
import MainNav from './mainNavComponent';
import { BrandCarousel, BrandJumbo, UserJumbo } from './mastComponents';

import HomeContent from './homeComponent';
import findKupboard from './findPageComponent';
import { LoginPage, SignUpPage } from './loginAndSignUpComponent';
import ViewKBPage from './viewKBPageComponent';
import DashboardPage from './dashboardPageComponent';

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
                    <MainNav url="/home/" children={SiteData.pages} logged={logged} siteName={SiteData.info.siteName} />
                    <Switch>
                        <Route exact path={["/", "/home/", "/view/"]} render={() => <BrandCarousel items={brandCarouselData} />} />
                        <Route path="/about/" render={() => <BrandJumbo {...aboutBrandData} fadeType="bg-shadefade" />} />
                        <Route path={["/view/:kup", "/dash/:kup"]} render={(rprops) => <UserJumbo fadeType="bg-shadefade" {...rprops} />} />
                    </Switch>
                </header>
                <Switch>
                    <Route exact path={["/", "/home/", "/about/", "/view/"]} component={HomeContent} />
                    <Route path="/login/" component={LoginPage} />
                    <Route exact path={["/signup/", "/dash/"]} component={SignUpPage} />
                    <Route path="/find/" component={findKupboard} />
                    <Route path="/view/:kup" component={ViewKBPage} />
                    <Route path="/dash/:kup" component={DashboardPage} />
                    <Redirect to="/home/" />
                </Switch>
                <Footer pages={SiteData.pages} social={SiteData.social} info={SiteData.info} />
            </div>
        );
    }
}

export default Main;

