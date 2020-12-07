import React from 'react';
import { Container } from 'reactstrap';

function MainWrap(props) {

    return (
        <div className="main-wrap ">
            <Container fluid="xl">
                {props.children}
            </Container>
        </div>
    );
}

export default MainWrap;
