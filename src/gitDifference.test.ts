import { getDiffFromHead } from './gitDifference';
// import simpleGit from 'simple-git';
describe('gitDifferent', () => {
  const mockValues = 'values';
  const diffSpy = jest.fn().mockResolvedValue(mockValues);
  const simpleGitMock = jest.createMockFromModule('simpleGit') as any;
  simpleGitMock.diff = diffSpy;

  it('returns success', async () => {
    const actual = await getDiffFromHead();
    expect(actual).toEqual(mockValues);
  });
  it('throws on failure', async () => {
    const actual = await getDiffFromHead();
    expect(actual).toEqual(mockValues);
  });
});
