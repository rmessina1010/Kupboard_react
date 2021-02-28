import React, { Component } from 'react';
import KupboardView from './viewKupboardComponent';
import MainWrap from './mainWrapComponent';

//import { kbItems, kbAnnounce, kbRoster } from '../shared/KBroster';
import { Prefoot } from './prefootComponent';
import * as serverOps from '../shared/serverOps';

class ViewKBPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kupData: false,
        }
    }

    componentDidMount() {
        let { kup } = this.props.match ? this.props.match.params : '';
        serverOps.viewRequest(kup, '')
            .then(kupboard => {
                if (kupboard.err) { kupboard = false; }
                this.setState({ kupData: kupboard })
            })
            .catch(err => {
                this.setState({ kupData: false });
                console.log(err)
            });
    }

    render() {
        //  let { kup } = this.props.match ? this.props.match.params : {};
        // let announce = [];
        // let inventory = [];
        // let kupData = false;
        // if (kbRoster['kup_' + kup]) {
        //     if (kbAnnounce['commentsIn_' + kup]) { announce = kbAnnounce['commentsIn_' + kup].announce; }
        //     if (kbItems['itemsIn_' + kup]) { inventory = kbItems['itemsIn_' + kup].inventory; }
        //     kupData = kbRoster['kup_' + kup];
        // }
        return this.state.kupData ?
            (<React.Fragment>
                <MainWrap>
                    <KupboardView announce={this.state.kupData.bulletins} {...this.state.kupData} />
                </MainWrap>
                <Prefoot map={this.state.kupData} heading={this.state.kupData.map ? null : "Map not available."} xl="6" />
            </React.Fragment >)
            : (<React.Fragment>
                <MainWrap>
                    <h2 className="text-center py-4">That Kupboard doesn't exist</h2>
                </MainWrap >
                <Prefoot heading="Try a different kupboard" blurbs="Nothing to see here folks! The Kupboard you have attemted to reach has not been created or no longer exists, click on 'FIND' to look for another one." />
            </React.Fragment>);
    }
}

export default ViewKBPage;