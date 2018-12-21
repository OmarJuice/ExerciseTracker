import React, { Component } from 'react';

class Landing extends Component {
    state = {
        icon: "fas fa-bicycle fa-5x",
        icons: ["fas fa-dumbbell fa-5x", "fas fa-swimmer fa-5x", "fas fa-running fa-5x", "fas fa-bicycle fa-5x"]
    }
    componentDidMount() {
        console.log('rend3r');
        this.renderIcon()
    }
    renderIcon = () => {
        console.log('render')
        let i = 0
        let iconTimer = setInterval(() => {
            this.setState({
                icon: this.state.icons[i],
            }, () => {
                if (i < 3) {
                    i++
                } else if (i === 3) {
                    i = 0
                }
            })
        }, 1500)
    }

    render() {

        return (
            <section className="hero is-light is-fullheight-with-navbar">
                <div className="hero-body">
                    <div id="hero-container" className="container">
                        <div id="title" className="title staat is-1">
                            Track Your Workouts

                        </div>
                        <div id="icon1" className="title is-1 hero-icon">
                            <span className="icon"><i className={this.state.icon}></i></span>
                        </div>


                    </div>
                </div>
            </section>
        );
    }
}

export default Landing;
