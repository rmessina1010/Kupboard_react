import React, { Component } from 'react';
import { DashForm } from './dashboardComponents';
import MainWrap from './mainWrapComponent';

import { Prefoot } from './prefootComponent';

import { kbItems, kbAnnounce, kbRoster } from '../shared/KBroster';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        let { kup } = this.props.match ? this.props.match.params : {};
        let announce = [];
        let inventory = [];
        let next_ann = 1;
        let next_item = 1;
        let kupData = false;
        if (kup === this.props.auth && kbRoster['kup_' + kup]) {
            if (kbAnnounce['commentsIn_' + kup]) {
                announce = kbAnnounce['commentsIn_' + kup].announce;
                next_ann = kbAnnounce['commentsIn_' + kup].nextid;
            }
            if (kbItems['itemsIn_' + kup]) {
                inventory = kbItems['itemsIn_' + kup].inventory;
            }
            kupData = kbRoster['kup_' + kup];
            next_item = kbItems['itemsIn_' + kup].nextid;
        }
        this.state = {
            kup: kup,
            next_ann: next_ann,
            next_item: next_item,
            announce: announce,
            inventory: inventory,
            kupData: kupData
        }
    }

    updateFooter = (newState) => this.setState(newState);

    render() {
        return this.state.kupData ?
            (<React.Fragment>
                <MainWrap>
                    <DashForm items={this.state.inventory} kupboard={this.state.kupData} comments={this.state.announce} kup_id={this.state.kup} next_item={this.state.next_item} next_ann={this.state.next_ann} onUpdate={this.updateFooter} />
                </MainWrap>
                <Prefoot map={this.state.kupData} heading={this.state.kup && this.state.kupData.map ? null : "Map not available."} xl="6" />
            </React.Fragment >)
            : (<React.Fragment>
                <MainWrap>
                    <h2 className="text-center py-4">"I can't let you do that, Dave."--Hal9000</h2>
                </MainWrap >
                <Prefoot heading="Access denied." blurbs="That Kupboard may not exist or you may not have the credentials to alter it. Please try again and make sure you are attempting tolog in to your own existing Kupboard." />
            </React.Fragment>);
    }
}

export default DashboardPage;