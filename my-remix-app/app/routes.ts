import { get, route } from 'remix/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: '/',
  product: get('/products/:id'),
  cart: '/cart',
});
