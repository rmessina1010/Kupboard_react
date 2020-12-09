import React, { Component } from 'react';
import KupboardView from './viewKupboardComponent';
import MainWrap from './mainWrapComponent';

import { kbItems, kbAnnounce, kbRoster } from '../shared/KBroster';
import { Prefoot } from './prefootComponent';

class ViewKBPage extends Component {

    render() {
        let { kup } = this.props.match ? this.props.match.params : {};
        let announce = [];
        let inventory = [];
        let kupData = false;
        if (kbRoster['kup_' + kup]) {
            if (kbAnnounce['commentsIn_' + kup]) { announce = kbAnnounce['commentsIn_' + kup].announce; }
            if (kbItems['itemsIn_' + kup]) { inventory = kbItems['itemsIn_' + kup].inventory; }
            kupData = kbRoster['kup_' + kup];
        }
        return kupData ?
            (<React.Fragment>
                <MainWrap>
                    <KupboardView inventory={inventory} announce={announce} {...kupData} />
                </MainWrap>
                <Prefoot map={kupData.map} heading={kupData.map ? null : "Map not available."} xl="6" />
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