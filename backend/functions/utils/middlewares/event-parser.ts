import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import middy from '@middy/core';
import _ from 'lodash';
import HttpError from 'Contexts/lib/errors/http-error';

const contentTypePattern = /^application\/(.+\+)?json($|;.+)/;
const responseKeys = ['headers', 'cookies', 'isBase64Encoded', 'statusCode'];

const defaults = {
  reviver: undefined,
};

export const eventParser = (opts = {}): middy.MiddlewareObj<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2> => ({
  before: async (request) => {
    const options = { ...defaults, ...opts };
    const { headers, body } = request.event;
    const contentType = headers?.['Content-Type'] ?? headers?.['content-type'];
    if (!contentTypePattern.test(contentType as string)) return;

    try {
      const data = request.event.isBase64Encoded
        ? Buffer.from(body as string, 'base64').toString()
        : body;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      request.event.body = JSON.parse(data as string, options.reviver);
    } catch (err) {
      throw new HttpError(400, 'Malformed Body', 'Invalid or malformed JSON was provided.');
    }
    console.info('🚀 Incoming Request: ', request);
  },

  after: async (request) => {
    const { response } = request;
    const headers = { ...(response?.headers ?? {}), 'Content-Type': 'application/json' };
    const statusCode = response?.statusCode ?? 200;
    const body = JSON.stringify(response?.body ?? { ..._.omit(response, responseKeys) });

    request.response = {
      headers,
      statusCode,
      body,
    };
    console.info('✅ Outgoing Response: ', request.response);
  },
});

export default eventParser;
