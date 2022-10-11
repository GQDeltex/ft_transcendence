import { TwoFAGuard } from './twoFA.guard';

describe('TwoFaGuard', () => {
  it('should be defined', () => {
    expect(new TwoFAGuard()).toBeDefined();
  });
});
