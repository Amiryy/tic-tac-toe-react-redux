import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainMenu from '../containers/MainMenu';
import Game from '../containers/Game';
import Settings from '../containers/Settings';

const Container = () => {
    return (
        <Switch>
            <Route exact path='/'
                   render={ () => <MainMenu /> } />
            <Route exact path='/game'
                   render={ () => <Game /> } />
            <Route exact path='/settings'
                   render={ () => <Settings /> } />
        </Switch>
    )
};

export default Container;