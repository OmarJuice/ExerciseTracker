import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './Header';
import history from '../history'
import Dashboard from './Exercise/Dashboard';
import Login from './auth/Login';
import CreateAccount from './auth/CreateAccount';
import Landing from './Exercise/Landing';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div id="container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Route path="/" exact component={this.props.isSignedIn ? Dashboard : Landing} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={CreateAccount} />

                    </div>

                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.signedIn
    }

}

export default connect(mapStateToProps, null)(App);
