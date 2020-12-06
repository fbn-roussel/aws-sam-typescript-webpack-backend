import { ProcessError, CustomerResource, CreateCustomerResource, CustomerType } from '@aws-sam-typescript-webpack-backend/shared';
import { CreateCustomerService } from '../domain/create-customer-service';

export class CreateCustomerProcessor {
  #createCustomerService: CreateCustomerService;

  constructor(createCustomerService: CreateCustomerService) {
    this.#createCustomerService = createCustomerService;
  }

  process = async (createCustomerResource: CreateCustomerResource): Promise<[CustomerResource, number]> => {
    try {
      const createCustomer = {
        type: CustomerType[createCustomerResource.type.toString() as keyof typeof CustomerType],
        lastName: createCustomerResource.lastName,
        firstName: createCustomerResource.firstName,
        email: createCustomerResource.email,
      };

      const customer = await this.#createCustomerService.create(createCustomer);

      return [
        {
          id: customer.id,
          type: createCustomerResource.type,
          lastName: createCustomerResource.lastName,
          firstName: createCustomerResource.firstName,
          email: createCustomerResource.email,
        },
        200,
      ];
    } catch (error) {
      throw new ProcessError(error, 500);
    }
  };
}
