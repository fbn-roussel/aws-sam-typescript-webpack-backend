import { Customer, CustomerEntity, ddb } from '@aws-sam-typescript-webpack-backend/shared';
import { GetCustomerByIdRepository } from '../domain/get-customer-by-id-repository';

export class GetCustomerByIdDdbRepository implements GetCustomerByIdRepository {
  get = async (id: string): Promise<Customer | null> => {
    const customerEntity = await ddb.get(
      Object.assign(new CustomerEntity(), {
        partitionKey: 'CUSTOMER/' + id,
        sortKey: 'DETAILS',
      })
    );

    if (!customerEntity) {
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
