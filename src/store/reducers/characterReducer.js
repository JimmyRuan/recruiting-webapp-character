// src/store/reducers/charactersReducer.js
import {
    ADD_CHARACTER,
    RESET_CHARACTERS,
    UPDATE_CHARACTER_ATTRIBUTE,
    UPDATE_CHARACTER_SKILL,
    SELECT_CHARACTER_CLASS,
} from '../actions/characterActions';
import { ATTRIBUTE_LIST } from '../../consts';

const initialState = {
    characters: {},
    totalCounter: 0,
};

const charactersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHARACTER:
            const newCounter = state.totalCounter + 1;
            const newName = `Character ${newCounter}`;
            const newCharacter = {
                id: newName,
                name: newName,
                attributes: ATTRIBUTE_LIST.reduce((acc, attr) => {
                    acc[attr] = 10;
                    return acc;
                }, {}),
                className: '',
                skills: {},
            };

            return {
                ...state,
                characters: {
                    ...state.characters,
                    [newName]: newCharacter,
                },
                totalCounter: newCounter,
            };
        case RESET_CHARACTERS:
            return initialState;
        case UPDATE_CHARACTER_ATTRIBUTE:
            const { characterId, attr, value } = action.payload;
            return {
                ...state,
                characters: {
                    ...state.characters,
                    [characterId]: {
                        ...state.characters[characterId],
                        attributes: {
                            ...state.characters[characterId].attributes,
                            [attr]: value,
                        },
                    },
                },
            };
        case UPDATE_CHARACTER_SKILL:
            const { skill } = action.payload;
            return {
                ...state,
                characters: {
                    ...state.characters,
                    [action.payload.characterId]: {
                        ...state.characters[action.payload.characterId],
                        skills: {
                            ...state.characters[action.payload.characterId].skills,
                            [skill]: action.payload.value,
                        },
                    },
                },
            };
        case SELECT_CHARACTER_CLASS:
            return {
                ...state,
                characters: {
                    ...state.characters,
                    [action.payload.characterId]: {
                        ...state.characters[action.payload.characterId],
                        className: action.payload.className,
                    },
                },
            };
        default:
            return state;
    }
};

export default charactersReducer;
