import { HttpExceptionMiddleware } from './http-exception.middleware';

describe('HttpExceptionMiddleware', () => {
  it('should be defined', () => {
    expect(new HttpExceptionMiddleware()).toBeDefined();
  });
});
