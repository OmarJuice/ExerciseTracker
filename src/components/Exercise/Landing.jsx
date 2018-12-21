import React, { Component } from 'react';

class Landing extends Component {
    state = {
        icon: <span className="icon hero-icon"><i className="fas fa-dumbbell fa-5x"></i></span>,
        icons: [<span className="icon hero-icon"><i className="fas fa-running fa-5x"></i></span>,
        <span className="icon hero-icon"><i className="fas fa-bicycle fa-5x"></i></span>,
        <span className="icon hero-icon"><i className="fas fa-swimmer fa-5x"></i></span>,
        <span className="icon hero-icon"><i className="fas fa-dumbbell fa-5x"></i></span>,
        ]
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
                        <div id="icon1" className="title is-1 icon-container">
                            {this.state.icon}
                        </div>


                    </div>
                </div>
            </section>
        );
    }
}

export default Landing;
