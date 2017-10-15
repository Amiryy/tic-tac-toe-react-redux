import React from 'react';

import Cell from './Cell';

const Board = (props) => {
    let checkWinningCell = (cell) => {
        let winningRow = [];
        if (props.winningRow) {
            winningRow = props.winningRow.filter(
                (winningCell) => winningCell === cell)
                .length > 0 ? 'win' : '';
        }
        return winningRow;
    };
    let checkAvailability = () => {
        if (props.gameEnd) {
            return false;
        } else {
            if (props.versus === 'A') {
                return ((props.playerStarts && props.xTurn)
                    || (!props.playerStarts && !props.xTurn));
            } else if (props.versus === 'P') {
                return true
            }
        }
    };
    return (
        <div className={'board_' + props.grid}>
            {
               props.cells.map((value, cell)=>{
                  return ( <Cell
                                key={cell}
                                id={cell}
                                className={checkWinningCell(cell)}
                                available={checkAvailability()}
                                xTurn={props.xTurn}
                                value={props.cells[cell]}
                                onClick={(cell) => props.playerMove(cell)}
                      />
                  )
               })
            }
        </div>
    )
};

export default Board;
