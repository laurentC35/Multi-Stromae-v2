export const OIDC = 'OIDC';
export const NONE = 'NONE';
export const AUTHENTICATION_TYPE_ENUM = [NONE, OIDC];

export const HOUSEHOLD = 'household';
export const BUSINESS = 'business';

export const COOKIE_CONSENT = 'cookie-consent';

export const READ_ONLY = 'readonly';
export const GUEST_USER = {
  lastName: 'Guest',
  firstName: 'Guest',
  id: 'Guest',
  roles: ['Guest'],
};
export const SIMPSONS = 'simpsons';
export const TIC = 'tic';
export const DEFAULT = 'default';
export const TEST = 'test';
export const QUESTIONNAIRE_EXAMPLES = [SIMPSONS, TIC, TEST];

export const AUTHORIZED_ROLES = ['Guest', 'offline_access'];

export const QUESTIONNAIRE_EXAMPLE_URL = (q, v) =>
  `/${v}/static/questionnaire/${q}/form.json`;
export const METADATA_EXAMPLE_URL = (q, v) =>
  `/${v}/static/questionnaire/${q}/metadata.json`;
export const DATA_EXAMPLE_URL = (q, v) =>
  `/${v}/static/questionnaire/${q}/data.json`;
