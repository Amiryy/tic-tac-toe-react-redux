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
        if(!props.endGame && (props.versus==='A')) {
            if ((props.playerStarts && props.xTurn)
                || (!props.playerStarts && !props.xTurn)) {
                return true
            } else {
                return false
            }
        } else if (!props.endGame && (props.versus==='P')) {
            return true
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
