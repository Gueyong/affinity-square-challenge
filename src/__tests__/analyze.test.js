import handler from '@/app/api/analyze/route'
import { createMocks } from 'node-mocks-http';

describe('/api/analyze API', () => {
  it('returns expected results for a valid URL', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        url: 'https://www.google.com',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());

    expect(data).toHaveProperty('htmlVersion');
    expect(data).toHaveProperty('pageTitle');
    expect(data).toHaveProperty('headings');
    expect(data).toHaveProperty('internalLinks');
    expect(data).toHaveProperty('externalLinks');
    expect(data).toHaveProperty('loginFormDetected');
    expect(data).toHaveProperty('validationResults');
  });

  it('returns an error for an invalid URL', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        url: 'https://invalid-url',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    const data = JSON.parse(res._getData());

    expect(data).toHaveProperty('error');
  });
});
