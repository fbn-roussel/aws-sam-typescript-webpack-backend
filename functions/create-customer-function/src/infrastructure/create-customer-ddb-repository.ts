import { DataMapper } from '@aws/dynamodb-data-mapper';

import { Customer, CustomerEntity } from '@aws-sam-typescript-webpack-backend/shared';
import { CreateCustomerRepository } from '../domain/create-customer-repository';

export class CreateCustomerDdbRepository implements CreateCustomerRepository {
  #ddbMapper: DataMapper;

  constructor(ddbMapper: DataMapper) {
    this.#ddbMapper = ddbMapper;
  }

  save = async (customer: Customer): Promise<void> => {
    const customerEntity = Object.assign(new CustomerEntity(), {
      partitionKey: 'CUSTOMER/' + customer.id,
      sortKey: 'DETAILS',
      id: customer.id,
      lastName: customer.lastName,
      firstName: customer.firstName,
      email: customer.email,
    });

    await this.#ddbMapper.put(customerEntity);
  };
}
