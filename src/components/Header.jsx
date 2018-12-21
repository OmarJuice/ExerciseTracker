import React, { Component } from 'react';
import AuthButtons from './auth/AuthButtons';
import { connect } from 'react-redux';
import { cancelError } from '../actions/index';
import { Link } from 'react-router-dom';
class Header extends Component {

    state = {
        menu: false
    }

    handleClick = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    cancelError = () => {
        this.props.cancelError()
    }
    render() {
        const errorMessage = () => {
            if (this.props.error.exists) {
                return (
                    <div className="columns is-centered ">
                        <div className="column is-narrow">
                            <article class="message is-danger">
                                <div class="message-header">
                                    <p>Error</p>
                                    <button class="delete" aria-label="delete" onClick={this.cancelError}></button>
                                </div>
                                <div class="message-body">
                                    {this.props.error.message}
                                </div>
                            </article>
                        </div>
                    </div>
                )
            }
            return null
        }
        return (
            <>
                <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" rel="noopener noreferrer" target="_blank" href="https://omarjuice.github.io/"><img src="./OJICONtrue.png" alt="icon" /></a>

                        <Link className="navbar-item staat is-size-4" to="/">
                            Exercise Tracker
                    </Link>
                        <button className={this.state.menu ? "navbar-burger burger is-active" : "navbar-burger burger"} onClick={this.handleClick} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>

                    <div id="navbarBasicExample" className={this.state.menu ? "navbar-menu is-active" : "navbar-menu"}>
                        <div className="navbar-start">

                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                {this.props.username ? <p className="has-text-light">Hey there, <strong className="has-text-light">{this.props.username}</strong></p> : ''}
                            </div>
                            <div className="navbar-item">
                                <div className="buttons">
                                    <AuthButtons />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {errorMessage()}

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.credentials.username,
        error: state.error
    }
}

export default connect(mapStateToProps, { cancelError })(Header);
