import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import Config from '../Config';
import './Navbar.css';
import Dropdown, {DropdownContent, DropdownTrigger} from 'react-simple-dropdown';
import { localeAction } from '../_actions';

class Navbar extends Component {

    renderLink(title, path, newTab=false) {
        var currentLocation = this.props.location.pathname;
        return (
            <li className={currentLocation === path ? 'active': ''}>
                {!newTab ? <Link to={path}><FormattedMessage id={title} /></Link>: <a href={path} target="_blank" rel="noopener noreferrer"><FormattedMessage id={title} /></a>}
            </li>
        );
    }

    renderHelpDropdown() {
        return (
            <Dropdown className="navbar-dropdown help-dropdown">
                <DropdownTrigger role="button">
                    <span className="dropdown__name">
                        <FormattedMessage id="Help"/>
                    </span>
                </DropdownTrigger>
                <DropdownContent>
                    <ul className="dropdown__segment dropdown__quick-links">
                        {this.renderLink('License', '/license')}
                        {this.renderLink('About', '/about')}
                        {this.renderLink('News', '/news')}
                        {this.renderLink('Tips', '/tips')}
                        <li><a href="https://makegirlsmoe.github.io/" target="_blank" rel="noopener noreferrer">Official Blog</a></li>
                        <li><a href="https://github.com/makegirlsmoe" target="_blank" rel="noopener noreferrer">Github</a></li>
                    </ul>
                </DropdownContent>
            </Dropdown>
        );
    }

    renderLanguageDropdown() {
        return (
            <Dropdown className="navbar-dropdown language-dropdown">
                <DropdownTrigger role="button">
                    <span className="dropdown__name">
                        <FormattedMessage id="CurrentLanguage"/>
                    </span>
                </DropdownTrigger>
                <DropdownContent>
                    <ul className="dropdown__segment dropdown__quick-links">
                        <li className="dropdown__link"><a role="button" onClick={() => this.props.dispatch(localeAction.changeLocale('en'))}>English</a></li>
                        <li className="dropdown__link"><a role="button" onClick={() => this.props.dispatch(localeAction.changeLocale('ja'))}>日本語</a></li>
                        <li className="dropdown__link"><a role="button" onClick={() => this.props.dispatch(localeAction.changeLocale('zh'))}>中文</a></li>
                        <li className="dropdown__link"><a role="button" onClick={() => this.props.dispatch(localeAction.changeLocale('ru'))}>Русский</a></li>
                    </ul>
                </DropdownContent>
            </Dropdown>
        );
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <Link className="navbar-brand" to="/"><span style={{color: Config.colors.theme}}>MakeGirlsMoe</span></Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {this.renderLink('Home', '/')}
                            {this.renderLink('Transition', '/transition')}
                            <li>{this.renderHelpDropdown()}</li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>{this.renderLanguageDropdown()}</li>
                            <li><Link to='/signup'>Sign Up</Link></li>
                            <li><Link to='/login'>Log In</Link></li>
                            <li>
                                <a className="twitter-share-button"
                                   style={{display: this.props.twitterVisible ? 'block' : 'none'}}
                                    href={"https://twitter.com/intent/tweet?"
                                    + "text=" + encodeURIComponent(Config.twitter.defaultText.substring(0, Config.twitter.defaultText.indexOf('http')))
                                    + "&url=" + encodeURIComponent(Config.twitter.defaultText.substring(Config.twitter.defaultText.indexOf('http')))}>
                                    Tweet
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        twitterVisible: state.twitter.visible,
        locale: state.selectLocale.locale
    };
}

export default connect(mapStateToProps)(Navbar);
