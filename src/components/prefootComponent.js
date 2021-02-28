import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export class Prefoot extends Component {
    render() {
        let prefootContent = null;
        if (this.props.blurbs || this.props.map || this.props.heading) {
            let md = 8;
            let xl = this.props.xl ? this.props.xl : md;
            let blurbs = null;
            if (this.props.blurbs) {
                blurbs = Array.isArray(this.props.blurbs) ? this.props.blurbs.map(blurb => <p className="text-white">{blurb}</p>) : <p className="text-white">{this.props.blurbs}</p>;
            }
            let heading = this.props.heading ? (<h5 className="text-info">{this.props.heading}</h5>) : null;
            let map = this.props.map;
            let loc;
            let src;
            if (map) {
                loc = encodeURI(map.address + ' ' + map.city + map.state + map.zip)
                src = "https://maps.google.com/maps?width=100%25&height=300&hl=en&q=" + loc + "&ie=UTF8&output=embed";
                map = (<iframe className="kupmap" title="map" width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={src} allowfullscreen="" aria-hidden="false" tabindex="0" style={{ border: '5px #fff solid;' }} ></ iframe>);
            } else { map = null; }
            prefootContent = (<Container fluid>
                <Row>
                    <Col xs="12" md={md} xl={xl} className="mx-auto py-4 lead">
                        {heading}
                        {blurbs}
                        {map}
                    </Col>
                </Row>
            </Container>);
        }
        return (
            <div className={"prefoot " + this.props.classes} >
                {prefootContent}
            </div>
        );
    }
}