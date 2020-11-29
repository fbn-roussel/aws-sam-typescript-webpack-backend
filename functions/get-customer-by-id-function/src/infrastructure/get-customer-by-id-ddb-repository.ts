import { DataMapper } from '@aws/dynamodb-data-mapper';

import { Customer, CustomerEntity } from '@aws-sam-typescript-webpack-backend/shared';
import { GetCustomerByIdRepository } from '../domain/get-customer-by-id-repository';

export class GetCustomerByIdDdbRepository implements GetCustomerByIdRepository {
  #ddbMapper: DataMapper;

  constructor(ddbMapper: DataMapper) {
    this.#ddbMapper = ddbMapper;
  }

  get = async (id: string): Promise<Customer | null> => {
    const customerEntity = await this.#ddbMapper.get(
      Object.assign(new CustomerEntity(), {
        partitionKey: 'CUSTOMER/' + id,
        sortKey: 'DETAILS',
      })
    );

    if (!CustomerEntity) {
      return null;
    }

    return {
      id: customerEntity.id,
      type: customerEntity.type,
      lastName: customerEntity.lastName,
      firstName: customerEntity.firstName,
      email: customerEntity.email,
    } as Customer;
  };
}
