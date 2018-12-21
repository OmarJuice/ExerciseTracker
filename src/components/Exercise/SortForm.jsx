import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class Sort extends Component {
    onSubmit(formValues) {
        console.log(formValues)
    }
    renderInput = ({ input, label, type, meta, checked }) => {
        return (
            <>
                <label className={`${type}-label`} htmlFor="">{label}</label>
                <input className={type} type={type} {...input} checked={checked} />
            </>
        )
    }
    render() {
        return (
            <div className="box">
                <form action="" className="form has-text-centered" onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                    <div className="field">
                        <div className="contol">
                            <Field name="date" component={this.renderInput} label="date" type="checkbox" ></Field>
                        </div>
                        <div className="control has-text-centered">
                            <Field name="dateDir" component={this.renderInput} label="Ascending" type="radio" value={1} ></Field>
                            <Field name="dateDir" component={this.renderInput} label="Descending" type="radio" value={-1} ></Field>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control has-text-centered">
                            <Field name="duration" component={this.renderInput} label="duration" type="checkbox"  ></Field>
                        </div>
                        <div className="control has-text-centered">
                            <Field name="durationDir" component={this.renderInput} label="Ascending" type="radio" value={1} ></Field>
                            <Field name="durationDir" component={this.renderInput} label="Descending" type="radio" value={-1} ></Field>
                        </div>
                    </div>
                    <div className="has-text-centered">
                        <button className="button is-info">
                            Sort
                    </button>
                    </div>

                </form>

            </div>
        );
    }
}

const SortForm = reduxForm({
    form: "Sort",
})(Sort)

export default SortForm;
