import { TwoFAGuard } from './twoFA.guard';

describe('TwoFAGuard', () => {
  it('should be defined', () => {
    expect(new TwoFAGuard()).toBeDefined();
  });
});
