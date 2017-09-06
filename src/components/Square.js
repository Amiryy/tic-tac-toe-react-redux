import React from 'react';

const Square = (props) => {
    return (
        <button className={(props.value===null) ? "square" : "square_filled"}
                onClick={() => props.onClick(props.id)}>
            {props.value}
        </button>
    );
};

export default Square;