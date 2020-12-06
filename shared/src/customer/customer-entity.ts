import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table(process.env.CUSTOMER_TABLE_NAME)
export class CustomerEntity {
  @hashKey()
  partitionKey?: string;

  @rangeKey()
  sortKey?: string;

  @attribute()
  id?: string;

  @attribute()
  type?: string;

  @attribute()
  lastName?: string;

  @attribute()
  firstName?: string;

  @attribute()
  email?: string;
}
