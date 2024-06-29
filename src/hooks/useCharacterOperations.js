// src/hooks/useCharacterOperations.js
import { useDispatch, useSelector } from 'react-redux';
import {
    addCharacter,
    resetCharacters,
    updateCharacterAttribute,
    updateCharacterSkill,
    selectCharacterClass,
} from '../store/actions/characterActions';
import {
    getCharacterTotalAttributes,
    getCharacterAvailablePoints,
} from '../utils/characterUtils';

const useCharacterOperations = () => {
    const dispatch = useDispatch();
    const characters = useSelector((state) => state.characters.characters);

    const handleAddCharacter = () => {
        dispatch(addCharacter());
    };

    const handleResetCharacters = () => {
        dispatch(resetCharacters());
    };

    const handleIncrementAttribute = (characterId, attr) => {
        const character = characters[characterId];
        const totalAttributes = getCharacterTotalAttributes(character);
        if (totalAttributes < 70) {
            dispatch(updateCharacterAttribute(characterId, attr, character.attributes[attr] + 1));
        }
    };

    const handleDecrementAttribute = (characterId, attr) => {
        dispatch(updateCharacterAttribute(characterId, attr, characters[characterId].attributes[attr] - 1));
    };

    const handleIncrementSkill = (characterId, skill) => {
        const availablePoints = getCharacterAvailablePoints(characters[characterId]);
        if (availablePoints > 0) {
            dispatch(updateCharacterSkill(characterId, skill, (characters[characterId].skills[skill] || 0) + 1));
        }
    };

    const handleDecrementSkill = (characterId, skill) => {
        dispatch(updateCharacterSkill(characterId, skill, Math.max(0, (characters[characterId].skills[skill] || 0) - 1)));
    };

    const handleSelectClass = (characterId, className) => {
        dispatch(selectCharacterClass(characterId, className));
    };

    return {
        characters,
        handleAddCharacter,
        handleResetCharacters,
        handleIncrementAttribute,
        handleDecrementAttribute,
        handleIncrementSkill,
        handleDecrementSkill,
        handleSelectClass,
    };
};

export default useCharacterOperations;
