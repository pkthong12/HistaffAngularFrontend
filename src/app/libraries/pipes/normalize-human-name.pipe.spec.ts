import { NormalizeHumanNamePipe } from './normalize-human-name.pipe';

describe('NormalizeHumanNamePipe', () => {
  it('create an instance', () => {
    const pipe = new NormalizeHumanNamePipe();
    expect(pipe).toBeTruthy();
  });
});
