// src/utils/characterUtils.js
import { calculateModifier } from '../components/AttributesList';

export const calculateAvailableSkillPoints = (intelligenceModifier) => {
    return 10 + (4 * intelligenceModifier);
};

export const getCharacterTotalAttributes = (character) => {
    return Object.values(character.attributes).reduce((acc, val) => acc + val, 0);
};

export const getCharacterAvailablePoints = (character) => {
    const intelligenceModifier = calculateModifier(character.attributes['Intelligence']);
    return calculateAvailableSkillPoints(intelligenceModifier) - Object.values(character.skills).reduce((acc, val) => acc + val, 0);
};
