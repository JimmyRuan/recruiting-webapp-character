import React from 'react';
import { SKILL_LIST } from '../consts';
import { calculateModifier } from './AttributesList';

const SkillsList = ({ skills, attributes, onIncrement, onDecrement, availablePoints }) => {
    return (
        <div className="SkillsList">
            <h2>Skills</h2>
            <p>Available Points: {availablePoints}</p>
            {SKILL_LIST.map(({ name, attributeModifier }) => {
                const modifier = calculateModifier(attributes[attributeModifier]);
                const points = skills[name] || 0;
                const total = points + modifier;

                return (
                    <div key={name} className="skill-row" id={name}>
                        <span className="skill-name">{name}</span>
                        <span className="skill-points">points: {points}</span>
                        <button onClick={() => onIncrement(name)} disabled={availablePoints <= 0}>+</button>
                        <button onClick={() => onDecrement(name)} disabled={points <= 0}>-</button>
                        <span className="skill-modifier">modifier ({attributeModifier}): {modifier}</span>
                        <span className="skill-total">total: {total}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default SkillsList;
