import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class CarlyApi implements ICredentialType {
  name = 'carlyApi';

  displayName = 'Carly API';

  documentationUrl = 'https://www.usecarly.com/developers';

  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description:
        'Carly API key. Generate one in the dashboard under Booking Pages → "Generate API key". Create/update/delete and calendar select operations require a key with the booking_pages:write scope.',
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://dashboard.carlyassistant.com/api/v1',
      description: 'Carly API base URL. Only change this if you are pointing at a non-production environment.',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.apiKey}}',
      },
    },
  };

  // Lets users click "Test" on the credential — hits the lightweight whoami endpoint.
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/whoami',
    },
  };
}
