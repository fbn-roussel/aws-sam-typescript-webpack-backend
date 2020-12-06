import { Customer } from '@aws-sam-typescript-webpack-backend/shared';
import { GetCustomerByIdRepository } from './get-customer-by-id-repository';

export class GetCustomerByIdService {
  #getCustomerByIdRepository: GetCustomerByIdRepository;

  constructor(getCustomerByIdRepository: GetCustomerByIdRepository) {
    this.#getCustomerByIdRepository = getCustomerByIdRepository;
  }

  get = async (id: string): Promise<Customer | null> => {
    return this.#getCustomerByIdRepository.get(id);
  };
}
