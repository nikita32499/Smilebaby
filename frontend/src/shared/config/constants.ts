import { isNotBrowser } from 'shared/helpers/isNotBrowser';

export const REACT_BASE_API_URL = isNotBrowser() ? '' : `${window.location.origin}/api`;

export const NEST_API_URL = process.env['NEST_API_URL'] ?? 'http://nestjs:3001/api';

export const email = 'gulya@mail.ru';

export const phone = '7 900 555-35-35';
