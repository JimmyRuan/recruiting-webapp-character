import React, { useState } from 'react';
import { SKILL_LIST } from '../consts';

const SkillCheck = ({ skills }) => {
    const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
    const [dc, setDc] = useState(10);
    const [result, setResult] = useState(null);
    const [randomNumber, setRandomNumber] = useState(null);

    const handleSkillChange = (e) => {
        setSelectedSkill(e.target.value);
    };

    const handleDcChange = (e) => {
        setDc(Number(e.target.value));
    };

    const handleRoll = () => {
        const randomNum = Math.floor(Math.random() * 20) + 1;
        setRandomNumber(randomNum);
        const totalSkill = skills[selectedSkill] || 0;
        const isSuccess = (totalSkill + randomNum) >= dc;
        setResult(isSuccess ? 'Success' : 'Failure');
    };

    return (
        <div className="SkillCheck">
            <h3>Skill Check</h3>
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
                </div>
            )}
        </div>
    );
};

export default SkillCheck;
