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

const buildNewState = (kupboard)=>{
    return {
        kupData: kupboard.theKup,
        kup: kupboard.theKup._id,
        hours: kupboard.theKup.hours,
        announce: kupboard.theKup.bulletins,
        inventory: kupboard.theKup.inventory,
    }
};

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
                    if (kupboard.err) {
                        this.props.logoutFoo();
                        return;
                    }
                    //let newState = (kupboard.err) ? DEFAULT_DASH_STATE :
                    let newState = buildNewState(kupboard);
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


    updateFooter = async (newState) => {  /// called onSubmit in form!!!
        //alert(JSON.stringify(newState.announce));

        let imgFile = document.getElementById('thumbIMG').files[0];
        let mastFile = document.getElementById('headerIMG').files[0];
        let updateKBinDB = { ...newState.kupData }
        let newerState = await serverOps.dashRequest('', 'PUT', { updateKup: updateKBinDB })
            .then(async () => {
                if (imgFile) {
                    newState.kupData.img = await serverOps.uploadRequest('thumb', imgFile)
                        .then(upload => upload.path.replace('public', ''))
                        .catch(err => err);
                }
            })
            .then(async () => {
                if (mastFile) {
                    newState.kupData.mast = await serverOps.uploadRequest('mast', mastFile)
                        .then(upload => upload.path.replace('public', ''))
                        .catch(err => err);
                }
            })
            .then(() => {
                serverOps.dashRequest('announce', 'PUT', { updateRows: newState.announce })
                    .catch(err => console.log(err));
            })
            .then(() => {
                serverOps.dashRequest('items', 'PUT', { updateRows: newState.inventory })
                    .catch(err => console.log(err));
            })
            .then(() => {
                if (newState.itemsToDel.length) {
                    serverOps.dashRequest('items', 'DELETE', { deleteTargets: newState.itemsToDel })
                        .catch(err => console.log(err));
                }
            })
            .then(() => {
                if (newState.annsToDel.length) {
                    serverOps.dashRequest('announce', 'DELETE', { deleteTargets: newState.annsToDel })
                        .catch(err => console.log(err));
                }
            })
            .then(() => {
                serverOps.dashRequest('hours', 'PUT', { updateRows: updateKBinDB.hours })
                    .catch(err => console.log(err));
            })
            .then(() => {
                if (newState.hoursToDel.length) {
                    serverOps.dashRequest('hours', 'DELETE', { deleteTargets: newState.hoursToDel })
                        .catch(err => console.log(err));
                }
            }).then(() => {
                if (newState.newPass) {
                    serverOps.dashRequest('password', 'PUT', { newpass: newState.newPass, kup: newState.kupData.name })
                        .catch(err => console.log(err));
                }
            })
            .then(async () => {
                alert('Kupboard Updated!');
                const updatedStatePromise = await serverOps.dashRequest('', 'GET', null);
                const updatedState =  buildNewState(updatedStatePromise);
                this.setState(updatedState);
                return updatedState;
            })
            .catch(err => {
                console.log(err);
                return {};
            });
        return newerState;
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
                        refreshFoo={this.props.refreshFoo}
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