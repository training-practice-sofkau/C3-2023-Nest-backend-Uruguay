import { CustomerModel } from './customer-model';

describe('CustomerModel', () => {
  it('should be defined', () => {
    expect(new CustomerModel()).toBeDefined();
  });
});
