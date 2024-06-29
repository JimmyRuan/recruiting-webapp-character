import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClassList from '../../components/ClassList';
import { CLASS_LIST } from '../../consts';

const mockAttributes = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
};

test('renders ClassList and highlights classes based on requirements', () => {
    const { getByText } = render(
        <ClassList
            attributes={mockAttributes}
            onSelectClass={jest.fn()}
            selectedClassName=""
        />
    );

    // Barbarian class should be highlighted in red because Strength is not >= 14
    expect(getByText('Barbarian')).toHaveStyle('color: red');

    // Wizard class should be highlighted in red because Intelligence is not >= 14
    expect(getByText('Wizard')).toHaveStyle('color: red');

    // Bard class should be highlighted in red because Charisma is not >= 14
    expect(getByText('Bard')).toHaveStyle('color: red');
});

test('calls onSelectClass with the correct class requirements when a class is clicked', () => {
    const mockSelectClass = jest.fn();
    const { getByText } = render(
        <ClassList
            attributes={mockAttributes}
            onSelectClass={mockSelectClass}
            selectedClassName=""
        />
    );

    fireEvent.click(getByText('Wizard'));
    expect(mockSelectClass).toHaveBeenCalledWith('Wizard');
});

test('highlights the selected class with an underscore', () => {
    const mockSelectClass = jest.fn();
    const { getByText } = render(
        <ClassList
            attributes={mockAttributes}
            onSelectClass={mockSelectClass}
            selectedClassName="Wizard"
        />
    );

    expect(getByText('Wizard')).toHaveStyle('text-decoration: underline');
});
