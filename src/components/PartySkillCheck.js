import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SKILL_LIST } from '../consts';
import { calculateModifier } from './AttributesList';

const PartySkillCheck = () => {
    const characters = useSelector((state) => state.characters.characters);
    const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
    const [dc, setDc] = useState(10);
    const [result, setResult] = useState(null);
    const [randomNumber, setRandomNumber] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleSkillChange = (e) => {
        setSelectedSkill(e.target.value);
    };

    const handleDcChange = (e) => {
        setDc(Number(e.target.value));
    };

    const handleRoll = () => {
        let highestSkillTotal = -Infinity;
        let bestCharacter = null;

        Object.values(characters).forEach((character) => {
            const skillValue = character.skills[selectedSkill] || 0;
            const attributeValue = character.attributes[SKILL_LIST.find(skill => skill.name === selectedSkill).attributeModifier];
            const totalSkill = skillValue + calculateModifier(attributeValue);

            if (totalSkill > highestSkillTotal) {
                highestSkillTotal = totalSkill;
                bestCharacter = character.name;
            }
        });

        const randomNum = Math.floor(Math.random() * 20) + 1;
        setRandomNumber(randomNum);
        const isSuccess = (highestSkillTotal + randomNum) >= dc;
        setResult(isSuccess ? 'Success' : 'Failure');
        setSelectedCharacter(bestCharacter);
    };

    return (
        <div className="PartySkillCheck">
            <h3>Party Skill Check</h3>
            <div>
                <label>Skill: </label>
                <select value={selectedSkill} onChange={handleSkillChange}>
                    {SKILL_LIST.map((skill) => (
                        <option key={skill.name} value={skill.name}>
                            {skill.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>DC: </label>
                <input type="number" value={dc} onChange={handleDcChange} min="1" />
            </div>
            <button onClick={handleRoll}>Roll</button>
            {randomNumber !== null && (
                <div>
                    <p>Random Number: {randomNumber}</p>
                    <p>Result: {result}</p>
                    <p>Character Selected: {selectedCharacter}</p>
                </div>
            )}
        </div>
    );
};

export default PartySkillCheck;
