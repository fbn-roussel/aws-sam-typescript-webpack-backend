import { Customer } from '@aws-sam-typescript-webpack-backend/shared';

export interface CreateCustomerRepository {
  save(customer: Customer): Promise<void>;
}
