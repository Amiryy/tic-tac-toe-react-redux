import React, { Component } from 'react';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';

class CountDownTimer extends Component {
    constructor (props) {
        super (props);
        this.state = {
            initialTime: this.props.time || null,
            timeLeft: this.props.time || null,
            percent: 0
        };
        this.timer = 0;
        this.progressBar = 0;
        this.startTimer = this.startTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.fillBar = this.fillBar.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
    }
    startTimer() {
        if (this.state.initialTime === null) {
            clearInterval(this.timer);
            clearInterval(this.progressBar);
            return;
        }
        if (this.timer === 0 && this.progressBar === 0) {
            this.timer = setInterval(this.countDown, 1000);
            this.progressBar = setInterval(this.fillBar, 100);
        }
    }
    resetTimer () {
        this.setState({
            timeLeft: this.state.initialTime,
            percent: 0
        });
        this.startTimer();
    }
    fillBar () {
        let percent = this.state.percent + (10/this.state.initialTime);
        this.setState({
            percent: percent
        });
    }
    countDown () {
        let timeLeft = this.state.timeLeft -1;
        this.setState({
            timeLeft: timeLeft
        });
        if (timeLeft === 0) {
           this.props.timeUp();
        }
    }
    pauseTimer () {
        clearInterval(this.timer);
        clearInterval(this.progressBar);
        this.timer = 0;
        this.progressBar = 0;
    }
    componentWillReceiveProps (nextProps) {
        if(nextProps.turnChange || !nextProps.turnChange) {
            this.resetTimer();
        }
        if (nextProps.firstMove || nextProps.gameEnd || nextProps.timeTraveled) {
            this.pauseTimer();
        }
    }
    componentWillUnmount () {
        this.pauseTimer();
    }
    render () {
        return (
            <div className='countdown_timer'>
                <ProgressBar
                    percent={this.state.percent}
                    intervalTime={this.state.initialTime/10}
                    spinner={false}
                    onTop={false}
                />
                {this.state.timeLeft}
            </div>
        );
    }
}

export default CountDownTimer;
