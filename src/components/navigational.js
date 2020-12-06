import React, { Component } from 'react';

class IconLink extends Component {
    render() {
        return (
            <a href={this.props.href} {...this.props.attrs}>{this.props.childBef}<i className={this.props.icon.icon} {...this.props.icon.attrs} />{this.props.childAft}</a>
        );
    }
}


class AnchorLink extends Component {
    render() {
        return (
            <a href={this.props.href} {...this.props.attrs}>
                {this.props.children}
            </a>
        );
    }
}


class Icon extends Component {
    render() {
        let baseClass = this.props.clist ? this.props.clist : '';
        baseClass += this.props.icon;
        return (
            <i className={baseClass} {...this.props.attrs} aria-hidden="true" />
        );
    }
}

export { Icon, IconLink, AnchorLink }
