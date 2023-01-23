import { Customer } from './customer';

describe('Customer', () => {
  it('should be defined', () => {
    expect(new Customer()).toBeDefined();
  });
});
