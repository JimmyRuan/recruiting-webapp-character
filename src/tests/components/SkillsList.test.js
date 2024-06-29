import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SkillsList from '../../components/SkillsList';
import { SKILL_LIST } from '../../consts';
import { calculateModifier } from '../../components/AttributesList';
import { act } from 'react'; // Import act from react

const mockAttributes = {
    Strength: 10,
    Dexterity: 12,
    Constitution: 10,
    Intelligence: 14,
    Wisdom: 10,
    Charisma: 10,
};

const mockSkills = {
    Acrobatics: 3,
    Perception: 2,
};

const availablePoints = 10 + (4 * calculateModifier(mockAttributes.Intelligence));

const renderSkillsList = (props = {}) => {
    const result = render(
        <SkillsList
            skills={props.skills || mockSkills}
            attributes={props.attributes || mockAttributes}
            onIncrement={props.onIncrement || jest.fn()}
            onDecrement={props.onDecrement || jest.fn()}
            availablePoints={props.availablePoints !== undefined ? props.availablePoints : availablePoints}
        />
    );

    // Log the entire rendered HTML for debugging
    console.log(result.container.innerHTML);
    return result;
};

test('renders SkillsList component with correct skills and modifiers', () => {
    const { getByText, queryByText, container } = renderSkillsList();

    // Ensure the skills section is present
    expect(getByText(/Skills/i)).toBeInTheDocument();
    expect(getByText(/Available Points:/i)).toBeInTheDocument();

    // Ensure skills are rendered with correct points, modifiers, and total values
    SKILL_LIST.forEach(({ name, attributeModifier }) => {
        const modifier = calculateModifier(mockAttributes[attributeModifier]);
        const points = mockSkills[name] || 0;
        const total = points + modifier;

        // Find the skill row by the skill name and then check within that context
        const skillRow = container.querySelector(`#${name}`);
        if(skillRow !== undefined) {
            console.log("I am here at 55", [container.innerHTML, name]);
        }

        expect(skillRow).toBeInTheDocument();


        // expect(queryByText(skillRow, new RegExp(`points: ${points}`))).toBeInTheDocument();
        // expect(queryByText(skillRow, new RegExp(`modifier \\(${attributeModifier}\\): ${modifier}`))).toBeInTheDocument();
        // expect(queryByText(skillRow, new RegExp(`total: ${total}`))).toBeInTheDocument();
    });
});

// test('increments skill points when + button is clicked', () => {
//     const mockIncrement = jest.fn();
//     const { getByText } = renderSkillsList({ onIncrement: mockIncrement });
//
//     // Click the + button for Acrobatics
//     act(() => {
//         fireEvent.click(getByText('Acrobatics').closest('.skill-row').querySelector('button'));
//     });
//     expect(mockIncrement).toHaveBeenCalledWith('Acrobatics');
// });

// test('decrements skill points when - button is clicked', () => {
//     const mockDecrement = jest.fn();
//     const { getByText } = renderSkillsList({ onDecrement: mockDecrement });
//
//     // Click the - button for Acrobatics
//     act(() => {
//         fireEvent.click(getByText('Acrobatics').closest('.skill-row').querySelectorAll('button')[1]);
//     });
//     expect(mockDecrement).toHaveBeenCalledWith('Acrobatics');
// });
//
// test('disables + button when no available points', () => {
//     const { getByText } = renderSkillsList({ availablePoints: 0 });
//
//     // Ensure the + button for Acrobatics is disabled
//     expect(getByText('Acrobatics').closest('.skill-row').querySelector('button')).toBeDisabled();
// });
//
// test('disables - button when skill points are 0', () => {
//     const { getByText } = renderSkillsList({ skills: { Acrobatics: 0 } });
//
//     // Ensure the - button for Acrobatics is disabled
//     expect(getByText('Acrobatics').closest('.skill-row').querySelectorAll('button')[1]).toBeDisabled();
// });
