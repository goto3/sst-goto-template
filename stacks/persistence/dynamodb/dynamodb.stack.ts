import { StackContext, Table } from 'sst/constructs';

export default function DynamoDBStack({ stack }: StackContext) {
  const table = new Table(stack, 'Notes', {
    fields: {
      pk: 'string',
      sk: 'string',
      gsi1pk: 'string',
      gsi1sk: 'string',
    },
    primaryIndex: {
      partitionKey: 'pk',
      sortKey: 'sk',
    },
    globalIndexes: {
      gsi1: {
        partitionKey: 'gsi1pk',
        sortKey: 'gsi1sk',
      },
    },
  });

  return table;
}
