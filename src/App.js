import React from 'react';
import './App.css';
import Character from './components/Character';
import PartySkillCheck from './components/PartySkillCheck';
import useCharacterOperations from './hooks/useCharacterOperations';
import { getCharacterAvailablePoints } from './utils/characterUtils';

const App = () => {
    const {
        characters,
        handleAddCharacter,
        handleResetCharacters,
        handleIncrementAttribute,
        handleDecrementAttribute,
        handleIncrementSkill,
        handleDecrementSkill,
        handleSelectClass,
    } = useCharacterOperations();

    return (
        <div className="App">
            <header className="App-header">
                <h1>Character Builder</h1>
                <button onClick={handleAddCharacter}>Add New Character</button>
                <button onClick={handleResetCharacters}>Reset All Characters</button>
            </header>

            <section className="App-section">
                <div className="App-sub-section">
                    <PartySkillCheck />
                </div>

                {Object.keys(characters).map((characterId) => {
                    const character = characters[characterId];
                    const availablePoints = getCharacterAvailablePoints(character);

                    return (
                        <Character
                            key={characterId}
                            character={character}
                            onIncrementAttribute={(attr) => handleIncrementAttribute(characterId, attr)}
                            onDecrementAttribute={(attr) => handleDecrementAttribute(characterId, attr)}
                            onIncrementSkill={(skill) => handleIncrementSkill(characterId, skill)}
                            onDecrementSkill={(skill) => handleDecrementSkill(characterId, skill)}
                            onSelectClass={(className) => handleSelectClass(characterId, className)}
                            availablePoints={availablePoints}
                        />
                    );
                })}
            </section>
        </div>
    );
};

export default App;
