import * as assert from 'remix/assert'
import { describe, it } from 'remix/test'

import { router } from '../router.ts'
import { routes } from '../routes.ts'
import { getProducts } from './products/data.ts'

describe('root controller', () => {
  it('GET / returns the home page', async () => {
    let response = await router.fetch(new URL(routes.home.href(), 'http://localhost'))

    assert.equal(response.status, 200)
    assert.match(response.headers.get('Content-Type') ?? '', /text\/html/)
    assert.match(await response.text(), /<html[\s>]/)
  })

  it('supports multiple selected categories', async () => {
    let products = await getProducts(1, 'default', ['beauty', 'fragrances'])

    assert.ok(products.products.some((product) => product.category === 'beauty'))
    assert.ok(products.products.some((product) => product.category === 'fragrances'))
  })

  it('GET /products/1 returns a product detail page', async () => {
    let response = await router.fetch(new URL('/products/1', 'http://localhost'))

    assert.equal(response.status, 200)
    assert.match(await response.text(), /Essence Mascara Lash Princess|product/i)
  })
})
