import React from 'react';

const Square = (props) => {
    const name = (props.value===null) ?
        "square" : "square_filled " + props.className;
    return (
        <button className={name}
                onClick={() => props.onClick(props.id)}>
            {props.value}
        </button>
    );
};

export default Square;