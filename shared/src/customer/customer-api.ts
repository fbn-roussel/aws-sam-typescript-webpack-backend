export enum CustomerTypeResource {
  PROSPECT = 'PROSPECT',
  CUSTOMER = 'CUSTOMER',
}

export type CustomerResource = {
  id: string;
  type: CustomerTypeResource;
  lastName: string;
  firstName: string;
  email?: string;
};

export type CreateCustomerResource = {
  type: CustomerTypeResource;
  lastName: string;
  firstName: string;
  email?: string;
};
