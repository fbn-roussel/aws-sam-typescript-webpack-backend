// import * as t from 'io-ts';
// import { string, type } from 'io-ts';
// import { Option } from 'fp-ts/lib/Option';
// import { option } from 'io-ts-types/lib/option';
// import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable';

// export type CustomerResource = t.TypeOf<typeof CustomerCodec>;
// export type CreateCustomerResource = t.TypeOf<typeof CreateCustomerCodec>;

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

// type Toto = {
//   lastName: string;
//   firstName: string;
//   email: Option<string>;
// };

// export const CreateCustomerCodec = t.type({
//   type: t.keyof(CustomerTypeResource),
//   lastName: t.string,
//   firstName: t.string,
//   email: optionFromNullable(t.string),
// });

// const RequiredCreateCustomerCodec = t.type({
//   type: t.keyof(CustomerTypeResource),
//   lastName: t.string,
//   firstName: t.string,
//   email: Option<t.string>,
// });

// const OptionalCreateCustomerCodec = t.partial({
//   email: t.string,
// });

// export const CreateCustomerCodec = t.intersection([RequiredCreateCustomerCodec, OptionalCreateCustomerCodec]);
