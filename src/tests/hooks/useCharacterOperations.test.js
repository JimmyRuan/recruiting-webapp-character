import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCharacter,
    resetCharacters,
    updateCharacterAttribute,
    updateCharacterSkill,
    selectCharacterClass,
} from '../../store/actions/characterActions';
import {
    getCharacterTotalAttributes,
    getCharacterAvailablePoints,
} from '../../utils/characterUtils';
import useCharacterOperations from "../../hooks/useCharacterOperations";

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('../../store/actions/characterActions', () => ({
    addCharacter: jest.fn(),
    resetCharacters: jest.fn(),
    updateCharacterAttribute: jest.fn(),
    updateCharacterSkill: jest.fn(),
    selectCharacterClass: jest.fn(),
}));

jest.mock('../../utils/characterUtils', () => ({
    getCharacterTotalAttributes: jest.fn(),
    getCharacterAvailablePoints: jest.fn(),
}));

describe('useCharacterOperations', () => {
    const dispatch = jest.fn();
    const mockState = {
        characters: {
            characters: {
                '1': {
                    name: 'Character 1',
                    attributes: { Strength: 10, Intelligence: 10 },
                    skills: { Acrobatics: 2 },
                    className: 'Warrior',
                },
            },
        },
    };

    beforeEach(() => {
        useDispatch.mockReturnValue(dispatch);
        useSelector.mockImplementation((callback) => callback(mockState));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a character', () => {
        const { result } = renderHook(() => useCharacterOperations());

        act(() => {
            result.current.handleAddCharacter();
        });

        expect(dispatch).toHaveBeenCalledWith(addCharacter());
    });

    it('should reset all characters', () => {
        const { result } = renderHook(() => useCharacterOperations());

        act(() => {
            result.current.handleResetCharacters();
        });

        expect(dispatch).toHaveBeenCalledWith(resetCharacters());
    });

    it('should increment character attribute', () => {
        getCharacterTotalAttributes.mockReturnValue(20);
        const { result } = renderHook(() => useCharacterOperations());

        act(() => {
            result.current.handleIncrementAttribute('1', 'Strength');
        });

        expect(dispatch).toHaveBeenCalledWith(updateCharacterAttribute('1', 'Strength', 11));
    });

    it('should not increment character attribute if total attributes are 70 or more', () => {
        getCharacterTotalAttributes.mockReturnValue(70);
        const { result } = renderHook(() => useCharacterOperations());

        act(() => {
            result.current.handleIncrementAttribute('1', 'Strength');
        });

        expect(dispatch).not.toHaveBeenCalledWith(updateCharacterAttribute('1', 'Strength', 11));
    });

    it('should decrement character attribute', () => {
        const { result } = renderHook(() => useCharacterOperations());

        act(() => {
            result.current.handleDecrementAttribute('1', 'Strength');
        });

        expect(dispatch).toHaveBeenCalledWith(updateCharacterAttribute('1', 'Strength', 9));
    });

    it('should increment character skill', () => {
        getCharacterAvailablePoints.mockReturnValue(5);
        const { result } = renderHook(() => useCharacterOperations());

        act(() => {
            result.current.handleIncrementSkill('1', 'Acrobatics');
        });

        expect(dispatch).toHaveBeenCalledWith(updateCharacterSkill('1', 'Acrobatics', 3));
    });

    it('should not increment character skill if no available points', () => {
        getCharacterAvailablePoints.mockReturnValue(0);
        const { result } = renderHook(() => useCharacterOperations());

        act(() => {
            result.current.handleIncrementSkill('1', 'Acrobatics');
        });

        expect(dispatch).not.toHaveBeenCalledWith(updateCharacterSkill('1', 'Acrobatics', 3));
    });

    it('should decrement character skill', () => {
        const { result } = renderHook(() => useCharacterOperations());

        act(() => {
            result.current.handleDecrementSkill('1', 'Acrobatics');
        });

        expect(dispatch).toHaveBeenCalledWith(updateCharacterSkill('1', 'Acrobatics', 1));
    });

    it('should select character class', () => {
        const { result } = renderHook(() => useCharacterOperations());

        act(() => {
            result.current.handleSelectClass('1', 'Mage');
        });

        expect(dispatch).toHaveBeenCalledWith(selectCharacterClass('1', 'Mage'));
    });
});
