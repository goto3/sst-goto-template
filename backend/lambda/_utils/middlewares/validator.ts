/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { ZodObject } from 'zod';
import middy from '@middy/core';

import HttpError from '../../../_lib/errors/http-error';
import RequestValidationError from '../errors/request-validation.error';

type ValidatorParams = {
  input?: {
    schema?: ZodObject<any, any>;
    enforce?: boolean;
  };
  output?: {
    schema?: ZodObject<any, any>;
    enforce?: boolean;
  };
};

export const validator = ({
  input: { schema: schemaIn, enforce: enforceIn = true } = {},
  output: { schema: schemaOut, enforce: enforceOut = false } = {},
}: ValidatorParams = {}): middy.MiddlewareObj<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2> => ({
  before: async (request) => {
    if (!schemaIn) return;

    const result = await schemaIn.spa(request.event);
    if (result.success) return;

    if (enforceIn) throw new RequestValidationError(result.error.issues);
    console.warn("🚨 Lambda request input doesn't match validation schema. Errors: ", JSON.stringify(result.error.issues));
  },

  after: async (request) => {
    if (!schemaOut) return;

    const result = await schemaOut.spa(request.event);
    if (result.success) return;

    if (enforceOut) throw new HttpError(500);
    console.warn("🚨 Lambda response output doesn't match validation schema. Errors: ", JSON.stringify(result.error.issues));
  },
});

export default validator;
