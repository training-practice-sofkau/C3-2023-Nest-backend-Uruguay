import { HttpExceptionGuard } from './http-exception.guard';

describe('HttpExceptionGuard', () => {
  it('should be defined', () => {
    expect(new HttpExceptionGuard()).toBeDefined();
  });
});
