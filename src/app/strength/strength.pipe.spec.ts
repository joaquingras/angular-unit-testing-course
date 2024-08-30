import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('should display weak if strength is 5', () => {
    expect(pipe.transform(5)).toContain('(weak)');
  });

  it('should display strong if value is between 10 and 20', () => {
    expect(pipe.transform(15)).toContain('(strong)');
  });
});
