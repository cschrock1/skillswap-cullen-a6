const { filterSkillsByCategory } = require('../skillswap-functions');
const { calculateTotalCosts } = require('../skillswap-functions');

describe('filterSkillsByCategory', () => {
  const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 },
    { title: 'Web Development', category: 'Programming', price: 25 }
  ];

  test('filters skills by category "Programming"', () => {
    const result = filterSkillsByCategory(skills, 'Programming');
    expect(result).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'Web Development', category: 'Programming', price: 25 }
    ]);
  });

  test('handles "All" category', () => {
    const result = filterSkillsByCategory(skills, 'All');
    expect(result).toEqual(skills);
  });

  test('returns an empty array when no matches', () => {
    const result = filterSkillsByCategory(skills, 'Cooking');
    expect(result).toEqual([]);
  });
});

describe('calculateTotalCosts', () => {
  test.each([
    [20, 2, 40],
    [25, 1.5, 37.5],
    [18, 3, 54]
  ])('calculates the total for rate %s and hours %s', (hourlyRate, hours, expected) => {
    expect(calculateTotalCosts(hourlyRate, hours)).toBe(expected);
  });

  test('returns zero for free sessions and zero hours', () => {
    expect(calculateTotalCosts(0, 3)).toBe(0);
    expect(calculateTotalCosts(20, 0)).toBe(0);
  });
});