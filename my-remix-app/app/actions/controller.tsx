import { createController } from 'remix/router'
import { assets } from '../assets.ts'
import { routes } from '../routes.ts'
import { getCategories, getProduct, getProducts, type ProductSort } from './products/data.ts'
import { CartPage } from './cart.tsx'
import { ProductDetailPage, ProductListPage } from './homepage.tsx'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (await assets.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
    },
    async home(context) {
      try {
        let requestUrl = new URL(context.request.url)
        let requestedPage = Number(requestUrl.searchParams.get('page') ?? '1')
        let page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
        let requestedSort = requestUrl.searchParams.get('sort') ?? 'default'
        let sort = isProductSort(requestedSort) ? requestedSort : 'default'
        let categories = await getCategories()
        let requestedCategories = requestUrl.searchParams.getAll('category')
        let category = requestedCategories.filter((item) => categories.some((category) => category.slug === item))
        let products = await getProducts(page, sort, category.length > 0 ? category : undefined)
        return context.render(<ProductListPage {...products} categories={categories} category={category.length > 0 ? category : undefined} />)
      } catch {
        return new Response('Unable to load products', { status: 502 })
      }
    },
    async product(context) {
      let id = Number.parseInt(context.params.id ?? '', 10)
      if (!Number.isInteger(id)) {
        return new Response('Not Found', { status: 404 })
      }

      try {
        let product = await getProduct(id)
        return context.render(<ProductDetailPage product={product} />)
      } catch {
        return new Response('Unable to load product', { status: 404 })
      }
    },
    async cart(context) {
      return context.render(<CartPage />)
    },
  },
})

function isProductSort(value: string): value is ProductSort {
  return ["default", "title-asc", "title-desc", "price-asc", "price-desc"].includes(value)
}