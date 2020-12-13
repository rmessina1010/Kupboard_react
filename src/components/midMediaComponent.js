import React, { Component } from 'react';
import { Button, Media } from 'reactstrap';

export class MidMedia extends Component {
    render() {
        let link = (this.props.linkText) ? <Button url={this.props.url} block color="primary" className="w-50 mx-auto mb-4">{this.props.linkText}</Button> : null;
        let blurbs = Array.isArray(this.props.blurbs) ? this.props.blurbs : Array(this.props.blurbs);
        blurbs = blurbs.map(blurb => <p>{blurb}</p>);
        return (
            <Media className="row py-4 align-items-center d-block d-md-flex">
                <Media object className="align-self-center mb-3 mx-auto d-block" src={this.props.img} alt={this.props.alt} />
                <Media body className="col-md-8 mx-auto order-md-2">
                    <Media heading tag="h3" className="text-info  text-center text-md-left">{this.props.heading}</Media>
                    {blurbs}
                    {link}
                </Media>
            </Media>
        );
    }
}

export default MidMedia;