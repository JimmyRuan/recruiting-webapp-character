import React from 'react';

export const calculateModifier = (value) => {
    return Math.floor((value - 10) / 2);
};

const AttributesList = ({ attributes, onIncrement, onDecrement, classRequirements }) => {
    const meetsRequirement = (attr) => {
        if (!classRequirements) return true;
        return attributes[attr] >= classRequirements[attr];
    };

    return (
        <div className="AttributesList">
            <h2>Attributes</h2>
            {Object.entries(attributes).map(([name, value]) => (
                <div key={name} style={{ color: meetsRequirement(name) ? 'green' : 'red' }}>
                    {name}: {value} (Modifier: {calculateModifier(value)})
                    <button onClick={() => onIncrement(name)}>+</button>
                    <button onClick={() => onDecrement(name)}>-</button>
                </div>
            ))}
        </div>
    );
};

export default AttributesList;
