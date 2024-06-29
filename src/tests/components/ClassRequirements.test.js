import React from 'react';
import { render } from '@testing-library/react';
import ClassRequirements from '../../components/ClassRequirements';

const mockSelectedClass = {
    Strength: 9,
    Dexterity: 9,
    Constitution: 9,
    Intelligence: 14,
    Wisdom: 9,
    Charisma: 9,
};

test('renders ClassRequirements component with correct class name and requirements', () => {
    const { getByText } = render(
        <ClassRequirements selectedClass={mockSelectedClass} selectedClassName="Wizard" />
    );

    // Ensure the heading is rendered with the correct class name
    expect(getByText(/Minimum Required Statistics for Wizard:/)).toBeInTheDocument();

    // Ensure the class requirements are rendered correctly
    expect(getByText('Strength: 9')).toBeInTheDocument();
    expect(getByText('Dexterity: 9')).toBeInTheDocument();
    expect(getByText('Constitution: 9')).toBeInTheDocument();
    expect(getByText('Intelligence: 14')).toBeInTheDocument();
    expect(getByText('Wisdom: 9')).toBeInTheDocument();
    expect(getByText('Charisma: 9')).toBeInTheDocument();
});

test('does not render ClassRequirements component when selectedClass is null', () => {
    const { queryByText } = render(
        <ClassRequirements selectedClass={null} selectedClassName="" />
    );

    // Ensure nothing is rendered when selectedClass is null
    expect(queryByText(/Minimum Required Statistics for/)).not.toBeInTheDocument();
});
