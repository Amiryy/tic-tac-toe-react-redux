import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import Container from '../components/Container';
import '../styles/App.css';
import github from '../styles/media/github.png';
import githubdark from '../styles/media/githubdark.png';


const App = (props) => {
    if(props.theme === 'dark'){
        document.body.setAttribute('id','dark_theme');
    } else {
        document.body.setAttribute('id','light_theme');
    }
    const gitIcon = props.theme === 'light' ? github : githubdark;
    return (
      <div className={props.theme === 'light' ? 'light_theme' : 'dark_theme'}>
        <Header titleName="Tic-Tac-Toe"
                author="Amiry's"
                git='https://github.com/Amiryy'
                gitIcon={gitIcon}/>
        <Container/>
      </div>
    );
};

const mapStateToProps = (state) => ({
    theme: state.settings.theme
});

export default withRouter(connect(mapStateToProps)(App));