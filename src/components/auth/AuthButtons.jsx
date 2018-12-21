import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/index';

class AuthButtons extends Component {


    initiateLogout = () => {
        this.props.logout()
    }
    renderAuthButtons() {
        if (!this.props.isSignedIn) {
            return (
                <>
                    <Link className="button is-primary" to="/ExerciseTracker/signup">Sign Up</Link>
                    <Link className="button" to="/ExerciseTracker/login">Login</Link>
                </>
            )
        } else if (this.props.isSignedIn) {
            return (
                <button className="button is-warning" onClick={this.initiateLogout}>Logout</button>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButtons()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.signedIn
    }
}
export default connect(mapStateToProps, { logout })(AuthButtons);
