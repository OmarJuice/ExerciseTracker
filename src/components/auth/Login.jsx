import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../actions';
class Login extends Component {

    onSubmit(formValues) {
        this.props.login(formValues)
    }
    renderInput = ({ input, label, type, meta }) => {
        const className = () => {
            if (!meta.touched) {
                return 'input'
            }
            if (meta.error && meta.touched) {
                return 'input is-danger'
            }
            if (meta.visited) {
                return 'input is-success'
            }
        }
        const helpMessage = () => {
            if (meta.error && meta.touched) {
                return <p className="help is-danger">{meta.error}</p>
            } else {
                return <p className="help is-invisible">No Error</p>
            }
        }
        return (
            <div className="field">
                <label className="label" htmlFor="">{label}</label>
                <div className="control">
                    <input className={className()} type={type} {...input} autoComplete="off" />
                    {helpMessage()}

                </div>
            </div>
        )
    }
    render() {
        // let errorMessage = this.props.Error.exists ? this.props.Error.message : '';
        return (
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-one-third is-half-tablet is-full-mobile">
                        <h1 className="title is-1 has-text-centered staat">Login</h1>
                        <form action="" onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="form has-text-centered">
                            <Field name="username" component={this.renderInput} label="username" type="text"></Field>
                            <Field name="password" component={this.renderInput} label="password" type="password"></Field>

                            <button className="button is-success">Submit</button>

                        </form>

                    </div>
                </div >
            </div>
        );
    }
}
const validate = (formValues) => {
    const errors = {}
    if (!formValues.username) {
        errors.username = 'You must enter a username'
    }

    if (!formValues.password) {
        errors.password = 'You must enter a password'
    }

    return errors
}
const formWrapped = reduxForm({
    form: 'CreateAccount',
    validate
})(Login);
const mapStateToProps = (state) => {
    return {
        Error: state.error
    }
}
export default connect(mapStateToProps, { login })(formWrapped);
