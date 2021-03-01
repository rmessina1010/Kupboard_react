import React, { Component } from 'react';
import { DashForm } from './dashboardComponents';
import MainWrap from './mainWrapComponent';

import { Prefoot } from './prefootComponent';

// import { kbItems, kbAnnounce, kbRoster } from '../shared/KBroster';
import * as serverOps from '../shared/serverOps';

const DEFAULT_DASH_STATE = {
    kup: false,
    hours: [],
    announce: [],
    inventory: [],
    kupData: null
}
class DashboardPage extends Component {

    constructor(props) {
        super(props);
        // let announce = [];
        // let inventory = [];
        // let next_ann = 1;
        //  let next_item = 1;
        // let kupData = false;
        // if (kup === this.props.auth && kbRoster['kup_' + kup]) {
        //     if (kbAnnounce['commentsIn_' + kup]) {
        //         announce = kbAnnounce['commentsIn_' + kup].announce;
        //         next_ann = kbAnnounce['commentsIn_' + kup].nextid;
        //     }
        //     if (kbItems['itemsIn_' + kup]) {
        //         inventory = kbItems['itemsIn_' + kup].inventory;
        //     }
        //     kupData = kbRoster['kup_' + kup];
        //      next_item = kbItems['itemsIn_' + kup].nextid;
        // }
        this.state = DEFAULT_DASH_STATE;

        let { kup } = this.props.match ? this.props.match.params : '';
        if (document.cookie.indexOf('kuplogged=' + kup) > -1) {
            serverOps.dashRequest('', 'GET', null)
                .then(kupboard => {
                    let newState = (kupboard.err) ? DEFAULT_DASH_STATE :
                        {
                            kupData: kupboard.theKup,
                            kup: kupboard.theKup._id,
                            hours: kupboard.theKup.hours,
                            announce: kupboard.theKup.bulletins,
                            inventory: kupboard.theKup.inventory,
                        };
                    this.setState(newState);
                })
                .catch(err => {
                    this.setState(DEFAULT_DASH_STATE);
                    console.log(err)
                });
        }
        else { this.setState(DEFAULT_DASH_STATE); }
    }
    componentDidMount() {
        // let { kup } = this.props.match ? this.props.match.params : '';
        // if (document.cookie.indexOf('kuplogged=' + kup) > -1) {
        //     serverOps.dashRequest('', 'GET', null)
        //         .then(kupboard => {
        //             alert(JSON.stringify(kupboard));
        //             let newState = (kupboard.err) ? DEFAULT_DASH_STATE :
        //                 {
        //                     kupData: kupboard.theKup,
        //                     kup: kupboard.theKup._id,
        //                     hours: kupboard.theKup.hours,
        //                     announce: kupboard.theKup.bulletins,
        //                     inventory: kupboard.theKup.inventory,
        //                 };
        //             this.setState(newState);
        //         })
        //         .catch(err => {
        //             this.setState(DEFAULT_DASH_STATE);
        //             console.log(err)
        //         });
        // }
        // else { this.setState(DEFAULT_DASH_STATE); }
    }


    updateFooter = (newState) => {
        let updateKBinDB = { ...newState.kupData }
        if (!updateKBinDB.img) { delete updateKBinDB.img }
        if (!updateKBinDB.mast) { delete updateKBinDB.mast }
        serverOps.dashRequest('', 'PUT', { updateKup: updateKBinDB })
            .then(kup => {
                //alert(JSON.stringify(kup));
                this.setState(newState)
            })
            .catch(err => {
                console.log(err);
                // alert(JSON.stringify("!!!"));
            });


    }

    render() {
        return this.state.kupData ?
            (<React.Fragment>
                <MainWrap>
                    <DashForm
                        items={this.state.inventory}
                        kupboard={this.state.kupData}
                        comments={this.state.announce}
                        kup_id={this.state.kup}
                        onUpdate={this.updateFooter}
                        logoutFoo={this.props.logoutFoo}
                    />
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