import { HttpHeaders } from '@angular/common/http';

export const configs = {
  URL: 'https://online-store-api-714z.onrender.com/api',
  DOMAIN: 'https://online-store-api-714z.onrender.com',
  GOOGLE_ROOT: '/user/google',
  REGISTER_ROOT: '/user/register',
  SIGNIN_ROOT: '/user/signin',
};

export const httpConfig = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export const googleLoginHeaders = {
  headers: new HttpHeaders({
    'A-Type': 'application/json',
  }),
};

export const uploadHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded, application/json',
  }),
};

export const routes = {
  favorite: 'Обране',
};
