import { Customer } from '@aws-sam-typescript-webpack-backend/shared';

export interface GetCustomerByIdRepository {
  get(id: string): Promise<Customer | null>;
}
