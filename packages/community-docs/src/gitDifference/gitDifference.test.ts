import { getDiffFromHead } from '.';
jest.mock('simple-git');
describe('gitDifferent', () => {
  const mockValues = 'values';

  it('returns success', async () => {
    const actual = await getDiffFromHead();
    expect(actual).toEqual(mockValues);
  });

});
