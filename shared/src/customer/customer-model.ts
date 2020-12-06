export enum CustomerType {
  PROSPECT = 'PROSPECT',
  CUSTOMER = 'CUSTOMER',
}

export type Customer = {
  id: string;
  type: CustomerType;
  lastName: string;
  firstName: string;
  email?: string;
};

export type CreateCustomer = {
  type: CustomerType;
  lastName: string;
  firstName: string;
  email?: string;
};
