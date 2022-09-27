import { Intra42OAuthGuard } from './intra42.guard';

describe('Intra42Guard', () => {
  it('should be defined', () => {
    expect(new Intra42OAuthGuard()).toBeDefined();
  });
});
