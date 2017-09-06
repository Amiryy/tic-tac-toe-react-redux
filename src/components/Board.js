import React from 'react';

import Square from './Square';

const Board = (props) => {
    return (
        <div className={'board_' + props.grid}>
            {
               props.squares.map((value, square)=>{
                  return ( <Square
                                key={square}
                                id={square}
                                value={props.squares[square]}
                                onClick={(square) => props.playerMove(square)}
                      />
                  )
               })
            }
        </div>
    )
};

export default Board;
