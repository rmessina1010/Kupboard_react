import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class IconLink extends Component {
    render() {
        return (this.props.href.substr(0, 4) === 'http') ?
            (<a key={this.props.key} href={this.props.href}  {...this.props.attrs}>{this.props.childBef}<i className={this.props.icon.icon} {...this.props.icon.attrs} />{this.props.childAft}</a>)
            : (<NavLink key={this.props.key} to={this.props.href} {...this.props.attrs}>{this.props.childBef}<i className={this.props.icon.icon} {...this.props.icon.attrs} />{this.props.childAft}</NavLink>);
    }
}


class AnchorLink extends Component {
    render() {
        return (this.props.href.substr(0, 4) === 'http') ?
            (<a key={this.props.key} href={this.props.href} {...this.props.attrs}>
                {this.props.children}
            </a>)
            : (<NavLink key={this.props.key} to={this.props.href} {...this.props.attrs}>
                {this.props.children}
            </NavLink>);
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
