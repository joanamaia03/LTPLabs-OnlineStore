import {form, get, route } from 'remix/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: '/',
  items:{
    show: get('/items/:itemId'),
    edit: form('/items/:itemId/edit'),
  }
});
