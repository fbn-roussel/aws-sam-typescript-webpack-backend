import { ProcessError, CustomerResource, CustomerTypeResource } from '@aws-sam-typescript-webpack-backend/shared';
import { GetCustomerByIdService } from '../domain/get-customer-by-id-service';

export class GetCustomerByIdProcessor {
  #getCustomerByIdService: GetCustomerByIdService;

  constructor(getCustomerByIdService: GetCustomerByIdService) {
    this.#getCustomerByIdService = getCustomerByIdService;
  }

  process = async (id: string): Promise<[CustomerResource | null, number]> => {
    try {
      const customer = await this.#getCustomerByIdService.get(id);
      if (!customer) {
        return [null, 404];
      }

      return [
        {
          id: customer.id,
          type: CustomerTypeResource[customer.type as keyof typeof CustomerTypeResource],
          lastName: customer.lastName,
          firstName: customer.firstName,
          email: customer.email,
        },
        200,
      ];
    } catch (error) {
      throw new ProcessError(error, 500);
    }
  };
}
