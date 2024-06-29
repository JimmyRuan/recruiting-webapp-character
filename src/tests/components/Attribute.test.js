import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Attribute from "../../components/Attribute";

test('renders attribute name and buttons', () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const { getByText } = render(
        <Attribute name="Strength" value={10} onIncrement={onIncrement} onDecrement={onDecrement} />
    );

    expect(getByText('Strength: 10')).toBeInTheDocument();
    fireEvent.click(getByText('+'));
    expect(onIncrement).toHaveBeenCalled();
    fireEvent.click(getByText('-'));
    expect(onDecrement).toHaveBeenCalled();
});