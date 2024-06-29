// src/store/actions/characterActions.js
export const ADD_CHARACTER = 'ADD_CHARACTER';
export const RESET_CHARACTERS = 'RESET_CHARACTERS';
export const UPDATE_CHARACTER_ATTRIBUTE = 'UPDATE_CHARACTER_ATTRIBUTE';
export const UPDATE_CHARACTER_SKILL = 'UPDATE_CHARACTER_SKILL';
export const SELECT_CHARACTER_CLASS = 'SELECT_CHARACTER_CLASS';

export const addCharacter = () => ({
    type: ADD_CHARACTER,
});

export const resetCharacters = () => ({
    type: RESET_CHARACTERS,
});

export const updateCharacterAttribute = (characterId, attr, value) => ({
    type: UPDATE_CHARACTER_ATTRIBUTE,
    payload: { characterId, attr, value },
});

export const updateCharacterSkill = (characterId, skill, value) => ({
    type: UPDATE_CHARACTER_SKILL,
    payload: { characterId, skill, value },
});

export const selectCharacterClass = (characterId, className) => ({
    type: SELECT_CHARACTER_CLASS,
    payload: { characterId, className },
});
