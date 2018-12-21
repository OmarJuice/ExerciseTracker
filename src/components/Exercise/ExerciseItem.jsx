import React, { Component } from 'react';
import { deleteExercise, getExercise } from '../../actions';
import { connect } from 'react-redux';
import moment from 'moment';

class ExerciseItem extends Component {
    handleDeleteClick = () => {

        this.props.deleteExercise(this.props.id)
    }
    handleEditClick = () => {
        this.props.getExercise(this.props.id)
    }
    render() {
        return (
            <div className="column is-3">

                <div className="box ex-box has-text-centered">
                    <button className="icon is-pulled-left" onClick={this.handleEditClick}><i class="fas fa-edit"></i></button>
                    <button className="delete is-pulled-right" onClick={this.handleDeleteClick}></button>
                    <ul class="list">
                        <li className="list-item">{moment(this.props.date).format('M/DD/YY')} </li>
                        <li className="list-item">{this.props.description}</li>
                        <li className="list-item">{this.props.duration} mins</li>
                    </ul>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = (state) => {
    ;
    return {
        auth: state.auth
    }
}

export default connect(mapStatetoProps, { deleteExercise, getExercise })(ExerciseItem);
