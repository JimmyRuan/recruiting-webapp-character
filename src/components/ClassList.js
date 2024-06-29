import React from 'react';
import { CLASS_LIST } from '../consts';

const ClassList = ({ attributes, onSelectClass, selectedClassName }) => {
    const checkClassRequirements = (classAttributes) => {
        return Object.keys(classAttributes).every(attr => attributes[attr] >= classAttributes[attr]);
    };

    return (
        <div className="ClassList">
            <h2>Classes</h2>
            <ul>
                {Object.entries(CLASS_LIST).map(([className, classAttributes]) => (
                    <li
                        key={className}
                        style={{
                            color: checkClassRequirements(classAttributes) ? 'green' : 'red',
                            textDecoration: className === selectedClassName ? 'underline' : 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => onSelectClass(className)}
                    >
                        {className}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClassList;
