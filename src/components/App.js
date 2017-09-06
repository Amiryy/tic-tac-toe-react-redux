import React, { Component } from 'react';
import Header from './Header';
import Container from './Container';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header titleName="Tic-Tac-Toe"
                author="Amiry's"
                git='https://github.com/Amiryy'/>
        <Container/>
      </div>
    );
  }
}

export default App;
