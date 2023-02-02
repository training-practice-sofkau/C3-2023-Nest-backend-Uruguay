import { MiddlewaresMiddleware } from './middlewares.middleware';

describe('MiddlewaresMiddleware', () => {
  it('should be defined', () => {
    expect(new MiddlewaresMiddleware()).toBeDefined();
  });
});
