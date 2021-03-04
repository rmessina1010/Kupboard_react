import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SiteData from '../shared/siteData';
import { brandCarouselData, aboutBrandData } from '../shared/brandData';

import Footer from './footerComponent';
import MainNav from './mainNavComponent';
import { BrandCarousel, BrandJumbo, ViewJumbo, DashJumbo } from './mastComponents';

import HomeContent from './homeComponent';
import findKupboard from './findPageComponent';
import { LoginPage, SignUpPage } from './loginAndSignUpComponent';
import ViewKBPage from './viewKBPageComponent';
import DashboardPage from './dashboardPageComponent';

const LOGGED_OUT = {
    url: '/login/',
    icon: 'fa fa-sign-in',
    isLogged: false,
    kup: null,
    refresh: false
}
const LOGGED_IN = {
    url: '/dash/',
    icon: 'fa fa-tachometer',
    isLogged: true,
    refresh: false
}

let LOGGED_STATE = (document.cookie.match(/^(?:.*;)?\s*kuplogged\s*=\s*([^;]+)(?:.*)?$/) || [null, null])[1];
LOGGED_STATE = !LOGGED_STATE ? LOGGED_OUT : { ...LOGGED_IN, kup: LOGGED_STATE, url: '/dash/' + LOGGED_STATE };

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: { ...LOGGED_STATE },
        }
        this.loginFoo = this.loginFoo.bind(this);
        this.logoutFoo = this.logoutFoo.bind(this);
    }

    loginFoo(userData) {
        let id = userData.kupId;
        this.setState({
            logged: { ...LOGGED_IN, kup: id, url: '/dash/' + id }
        });
        document.cookie = "kuplogged=" + id + ";path=/";
        document.cookie = "token=" + userData.token + ";path=/";
        window.location = '/dash/' + id;
    }

    logoutFoo() {
        document.cookie = "kuplogged=;path=/";
        document.cookie = "token=;path=/";
        this.setState(LOGGED_OUT);
        window.location = "/login/";
    }

    refreshFoo = () => {
        this.setState({ refresh: !this.state.refresh });
    }

    render() {
        return (
            <div>
                <header>
                    <MainNav url="/home/" children={SiteData.pages} logout={this.logoutFoo} logged={this.state.logged} siteName={SiteData.info.siteName} />
                    <Switch>
                        <Route exact path={["/", "/home/", "/view/"]} render={() => <BrandCarousel items={brandCarouselData} />} />
                        <Route path="/about/" render={() => <BrandJumbo {...aboutBrandData} fadeType="bg-shadefade" />} />
                        <Route path="/view/:kup" render={(rprops) => <ViewJumbo fadeType="bg-shadefade" {...rprops} />} />
                        <Route path="/dash/:kup" render={(rprops) => <DashJumbo fadeType="bg-shadefade" auth={this.state.logged.kup} {...rprops} refresh={this.state.refresh} />} />
                    </Switch>
                </header>
                <Switch>
                    <Route exact path={["/", "/home/", "/about/", "/view/"]} component={HomeContent} />
                    <Route exact path={["/login/", "/dash/"]}
                        render={() => !LOGGED_STATE.isLogged ?
                            (<LoginPage loginFoo={this.loginFoo} />)
                            : (<Redirect to={{ pathname: LOGGED_STATE.url }} />)
                        } />
                    <Route exact path="/signup/" render={() => (<SignUpPage loginFoo={this.loginFoo} />)} />
                    <Route path="/find/" component={findKupboard} />
                    <Route path="/view/:kup" component={ViewKBPage} />
                    <Route path="/dash/:kup" render={(rprops) => <DashboardPage auth={this.state.logged.kup} {...rprops} logoutFoo={this.logoutFoo} refreshFoo={this.refreshFoo} />} />
                    <Redirect to="/home/" />
                </Switch>
                <Footer pages={SiteData.pages} social={SiteData.social} info={SiteData.info} />
            </div>
        );
    }
}

export default Main;

