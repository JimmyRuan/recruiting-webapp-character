import { calculateModifier } from '../../components/AttributesList';

test('calculates correct ability modifier', () => {
    expect(calculateModifier(7)).toBe(-2);
    expect(calculateModifier(9)).toBe(-1);
    expect(calculateModifier(10)).toBe(0);
    expect(calculateModifier(11)).toBe(0);
    expect(calculateModifier(12)).toBe(1);
    expect(calculateModifier(14)).toBe(2);
    expect(calculateModifier(20)).toBe(5);
});
