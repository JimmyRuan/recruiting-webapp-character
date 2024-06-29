import React from 'react';

const ClassRequirements = ({ selectedClass, selectedClassName }) => {
    if (!selectedClass) return null;

    return (
        <div className="ClassRequirements">
            <h3>Minimum Required Statistics for {selectedClassName}:</h3>
            <ul>
                {Object.entries(selectedClass).map(([attr, value]) => (
                    <li key={attr}>
                        {attr}: {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClassRequirements;
