import React from 'react';

const TimeTravel = (props) => {
    return (
        <div className="game_history">
            <button className='show_history'
                    onClick={props.toggleHistory}>
                Wish You Could Time Travel?
            </button>
            <div className={props.showHistory ? 'list' : 'list_hidden'}>
                <ul>{props.moves}</ul>
            </div>
        </div>
    );
};

export default TimeTravel;
