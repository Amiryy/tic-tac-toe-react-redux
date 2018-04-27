import React from 'react';

const Cell = (props) => {
    const name = props.value === null ?
        "cell" : "cell_filled " + props.className;
    const placeholder = props.available ? (props.value === null ?
        (props.xTurn ? 'X' : 'O') : null) : null;
    const whenToClick = (cell) => {
        return props.available ? props.onClick(cell) : null;
    };
    return (
        <button className={name}
                onClick={() => whenToClick(props.id)}>
            {props.value} {placeholder}
        </button>
    );
};

export default Cell;