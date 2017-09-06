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
                                className={props.winningLine.filter(
                                    (winningSquare) => winningSquare === square)
                                    .length > 0 ? 'win' : ''
                                }
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
