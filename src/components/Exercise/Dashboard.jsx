import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchExercises } from '../../actions';
import { superSort } from '../../utils/superSort';
import AddExercise from './AddExercise';
import SortForm from './SortForm';
import EditExercise from './EditExercise';
import ExerciseItem from './ExerciseItem';
class Dashboard extends Component {


    componentDidMount() {
        this.props.fetchExercises()
    }

    renderExercises = () => {

        let dateSort = this.props.sort && this.props.sort.date ? { by: 'date', direction: Number(this.props.sort.dateDir) || -1, mod: (val) => Math.floor(val / 86400000) } : null
        let durationSort = this.props.sort && this.props.sort.duration ? { by: 'duration', direction: Number(this.props.sort.durationDir || -1) } : null
        return this.props.exercise.list.sort(superSort([dateSort, durationSort]))
            .map((ex) => {
                return (
                    <ExerciseItem key={ex._id} date={ex.date} description={ex.description} duration={ex.duration} id={ex._id} />
                )
            })
    }

    render() {
        let message = <h1 className="title is-4">You have no exercises listed</h1>
        return (
            <div className="container">
                <h1 className="title is-2 has-text-centered staat">Dashboard</h1>
                <div className="columns is-centered">
                    <div className="column is-one-third">


                        <AddExercise />

                    </div>
                    <div className="column is-one-third">
                        <SortForm />
                        <div className="has-text-centered">
                            <h1 className="title is-2">{this.props.exercise.list.length || '0'}</h1>
                            <h1 className="title is-3">items</h1>
                        </div>
                    </div>
                    <div className="column is-one-third">
                        {!this.props.exercise.selectedExercise.description ? '' :
                            <EditExercise id={this.props.exercise.selectedExercise._id} initialValues={{
                                description: this.props.exercise.selectedExercise.description,
                                duration: this.props.exercise.selectedExercise.duration,
                                date: moment(this.props.exercise.selectedExercise.date).format('YYYY-DD-MM')
                            }} />}
                    </div>


                </div>
                <div className="columns is-multiline is-centered">{this.props.exercise.list.length < 1 ? message : this.renderExercises()}</div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        exercise: state.exercise,
        sort: state.form.Sort ? state.form.Sort.values : null
    }
}
export default connect(mapStateToProps, { fetchExercises })(Dashboard);
