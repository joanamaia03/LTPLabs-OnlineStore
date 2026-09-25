import { createController } from 'remix/router'
import { assets } from '../assets.ts'
import { routes } from '../routes.ts'
import { getItem } from './items/data.ts'
import { HomePage } from './homepage.tsx'

export default createController(routes, {
  actions: {
    async assets(context) {
      return (await assets.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
    },
    async home(context) {
      let item = await getItem('woman')
      if (item === undefined) {
        return new Response('Item not found', { status: 404 })
      }
      return context.render(<HomePage item={item} />)
    },
  },
})