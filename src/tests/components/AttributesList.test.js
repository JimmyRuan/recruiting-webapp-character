import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AttributesList from '../../components/AttributesList';

const mockAttributes = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
};

const mockClassRequirements = {
    Strength: 14,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
};

test('renders AttributesList and highlights attributes based on class requirements', () => {
    const { getByText } = render(
        <AttributesList
            attributes={mockAttributes}
            onIncrement={jest.fn()}
            onDecrement={jest.fn()}
            classRequirements={mockClassRequirements}
        />
    );

    // Strength should be highlighted in red because it is not >= 14
    expect(getByText('Strength: 10 (Modifier: 0)')).toHaveStyle('color: red');

    // Dexterity should be highlighted in green because it is >= 10
    expect(getByText('Dexterity: 10 (Modifier: 0)')).toHaveStyle('color: green');
});

test('calls onIncrement and onDecrement when buttons are clicked', () => {
    const mockIncrement = jest.fn();
    const mockDecrement = jest.fn();
    const { getAllByText } = render(
        <AttributesList
            attributes={mockAttributes}
            onIncrement={mockIncrement}
            onDecrement={mockDecrement}
            classRequirements={mockClassRequirements}
        />
    );

    // Click the first + button
    fireEvent.click(getAllByText('+')[0]);
    expect(mockIncrement).toHaveBeenCalledWith('Strength');

    // Click the first - button
    fireEvent.click(getAllByText('-')[0]);
    expect(mockDecrement).toHaveBeenCalledWith('Strength');
});
