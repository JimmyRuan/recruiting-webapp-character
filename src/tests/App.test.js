import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders App component and integrates ClassList, AttributesList, and SkillsList', () => {
    render(<App />);

    // Ensure Character Builder header is present
    expect(screen.getByText(/Character Builder/i)).toBeInTheDocument();

    // Ensure classes are rendered
    expect(screen.getByText('Barbarian')).toBeInTheDocument();
    expect(screen.getByText('Wizard')).toBeInTheDocument();
    expect(screen.getByText('Bard')).toBeInTheDocument();

    // Click on Wizard class and verify attribute highlighting
    fireEvent.click(screen.getByText('Wizard'));

    // Verify attributes are highlighted correctly
    expect(screen.getByText('Intelligence: 10 (Modifier: 0)')).toHaveStyle('color: red');
    expect(screen.getByText('Strength: 10 (Modifier: 0)')).toHaveStyle('color: green');

    // Verify skill points increment
    fireEvent.click(screen.getByText('Acrobatics').parentNode.querySelector('button'));
    expect(screen.getByText('Acrobatics').parentNode.querySelector('.skill-points').textContent).toBe('points: 1');

    // Verify skill points decrement
    fireEvent.click(screen.getByText('Acrobatics').parentNode.querySelectorAll('button')[1]);
    expect(screen.getByText('Acrobatics').parentNode.querySelector('.skill-points').textContent).toBe('points: 0');
});
