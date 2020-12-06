import { v4 as uuidv4 } from 'uuid';

import { Customer, CreateCustomer } from '@aws-sam-typescript-webpack-backend/shared';
import { CreateCustomerRepository } from './create-customer-repository';

export class CreateCustomerService {
  #createCustomerRepository: CreateCustomerRepository;

  constructor(createCustomerRepository: CreateCustomerRepository) {
    this.#createCustomerRepository = createCustomerRepository;
  }

  create = async (createCustomer: CreateCustomer): Promise<Customer> => {
    const customer = {
      id: uuidv4(),
      type: createCustomer.type,
      lastName: createCustomer.lastName,
      firstName: createCustomer.firstName,
      email: createCustomer.email,
    };

    await this.#createCustomerRepository.save(customer);

    return customer;
  };
}
