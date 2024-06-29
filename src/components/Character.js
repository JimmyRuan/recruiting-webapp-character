import React from 'react';
import AttributesList from './AttributesList';
import SkillsList from './SkillsList';
import ClassList from './ClassList';
import ClassRequirements from './ClassRequirements';
import SkillCheck from './SkillCheck';
import { CLASS_LIST } from "../consts";

const Character = ({ character, onIncrementAttribute, onDecrementAttribute, onIncrementSkill, onDecrementSkill, onSelectClass, availablePoints }) => {
    const { name, attributes, skills, className } = character;
    const totalAttributes = Object.values(attributes).reduce((acc, val) => acc + val, 0);
    const maxAttributesReached = totalAttributes >= 70;
    const allSkillPointsUsed = availablePoints <= 0;

    return (
        <div className="Character">
            <h2>{name}</h2>
            <div className="Character-content">
                <div className="Character-section">
                    <SkillCheck skills={skills} />
                </div>

                <div className="Character-section">
                    {maxAttributesReached && <p style={{ color: 'red' }}>Warning: Maximum attributes limit of 70 reached!</p>}
                    <AttributesList
                        attributes={attributes}
                        onIncrement={onIncrementAttribute}
                        onDecrement={onDecrementAttribute}
                        classRequirements={CLASS_LIST[className]}
                    />
                </div>

                <div className="Character-section">
                    <ClassList
                        attributes={attributes}
                        onSelectClass={onSelectClass}
                        selectedClassName={className}
                    />
                    <ClassRequirements
                        selectedClass={CLASS_LIST[className]}
                        selectedClassName={className}
                    />
                </div>

                <div className="Character-section">
                    {allSkillPointsUsed && <p style={{ color: 'red' }}>Warning: All skill points are used up!</p>}
                    <SkillsList
                        skills={skills}
                        attributes={attributes}
                        onIncrement={onIncrementSkill}
                        onDecrement={onDecrementSkill}
                        availablePoints={availablePoints}
                    />
                </div>

            </div>
        </div>
    );
};

export default Character;
