import React from 'react';

function Attribute({ name, value, onIncrement, onDecrement }) {
    return (
        <div>
            {name}: {value}
            <button onClick={onIncrement}>+</button>
            <button onClick={onDecrement}>-</button>
        </div>
    );
}

export default Attribute;
