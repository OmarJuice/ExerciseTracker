import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import { updateExercise } from '../../actions/index';

class EditExercise extends Component {

    onSubmit(formValues) {

        formValues.date = new Date(moment(formValues.date).format()).getTime()
        this.props.updateExercise(this.props.id, formValues)
        document.getElementById('ex-description').value = ''
        document.getElementById('ex-date').value = ''
        document.getElementById('ex-duration').value = ''
    }

    renderInput = ({ input, label, type, meta, min, max, id }) => {
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
            return 'input'
        }
        const helpMessage = <p className={meta.error && meta.touched ? 'help is-danger' : 'help is-invisible'}>{meta.error || 'Error'}</p>
        return (
            <div className="field">
                <label className="label" htmlFor="">{label}</label>
                <div className="control">
                    <input id={id} className={className()} type={type} {...input} autoComplete="off" min={min ? min : ''} max={max ? max : ''} />
                    {helpMessage}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="box">
                <h1 className="title is-4 has-text-centered staat">Edit</h1>
                <form action="" className="form has-text-centered" onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                    <Field id="ex-description" name="description" component={this.renderInput} label="description" type="text" ></Field>
                    <Field id="ex-duration" name="duration" component={this.renderInput} label="duration" type="number" min="0" max="500"></Field>
                    <Field id="ex-date" name="date" component={this.renderInput} label="date" type="date"></Field>
                    <button className="button is-success is-rounded"><span className="icon"><i class="fas fa-edit"></i></span></button>
                </form>
            </div>
        );
    }
}
const validate = ({ description, duration, date }) => {
    const errors = {}
    let regex = /W+/g
    if (!description) {
        errors.description = "You must enter a description"
    }
    if (description && regex.test(description)) {
        errors.description = "Description must only consist of letters and numbers"
    }
    if (!duration) {
        errors.duration = "You must enter a duration in minutes"
    }
    return errors
}
const EditExerciseForm = reduxForm({
    form: 'EditExercise',
    validate,
    enableReinitialize: true
})(EditExercise)
export default connect(null, { updateExercise })(EditExerciseForm)