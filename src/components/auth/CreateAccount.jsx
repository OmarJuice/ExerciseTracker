import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createAccount } from '../../actions/index';

class CreateAccount extends Component {

    onSubmit(formValues) {
        this.props.createAccount(formValues)
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
        const helpMessage = <p className={meta.error && meta.touched ? 'help is-danger' : 'help is-invisible'}>{meta.error || 'No Error'}</p>
        return (
            <div className="field">
                <label className="label" htmlFor="">{label}</label>
                <div className="control">
                    <input className={className()} type={type} {...input} autoComplete="off" />
                    {helpMessage}
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
                        <h1 className="title is-1 has-text-centered staat">Create an Account</h1>
                        <form action="" onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} className="form has-text-centered">
                            <Field name="username" component={this.renderInput} label="username" type="text"></Field>
                            <Field name="password" component={this.renderInput} label="password" type="password"></Field>
                            <Field name="passwordCheck" component={this.renderInput} label="Please re-enter your password:" type="password"></Field>

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
    let nameRegex = /\W+/g
    if (!formValues.username) {
        errors.username = 'You must enter a username'
    }
    if (nameRegex.test(formValues.username)) {
        errors.username = 'Invalid username, letters and numbers only'
    }
    if (formValues.username && formValues.username.length < 1) {
        errors.username = 'Username must be at least one character'
    }

    if (!formValues.password) {
        errors.password = 'You must enter a password'
    }
    if (formValues.password && formValues.password.length < 6) {
        errors.password = 'Password should be at least 6 characters in length'
    }
    if (!formValues.passwordCheck) {
        errors.passwordCheck = 'You must confirm your password'
    }
    if ((formValues.passwordCheck && formValues.password) && (formValues.password !== formValues.passwordCheck)) {
        errors.passwordCheck = 'Passwords must match'
    }
    return errors
}
const formWrapped = reduxForm({
    form: 'CreateAccount',
    validate
})(CreateAccount);
const mapStateToProps = (state) => {
    return {
        Error: state.error
    }
}
export default connect(mapStateToProps, { createAccount })(formWrapped)