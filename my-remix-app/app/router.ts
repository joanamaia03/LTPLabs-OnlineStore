import { createRouter, type RouterContext } from 'remix/router'
import { render } from 'remix/middleware/render'
import {formData} from 'remix/middleware/form-data'
import { staticFiles } from 'remix/middleware/static'

import controller from './actions/controller.tsx'
import itemsController from './actions/items/controller.tsx'
import { assets } from './assets.ts'
import { routes } from './routes.ts'
import itemsEditController from './actions/items/edit/controller.tsx'

const renderMiddleware = render({ assets })

export const router = createRouter({
  middleware: [staticFiles("./public", { index: false }), formData(), renderMiddleware],
});
export type AppContext = RouterContext<typeof router>;
declare module "remix/router" {
  interface RouterTypes {
    context: AppContext;
  }
}

router.map(routes, controller)
router.map(routes.items, itemsController)
router.map(routes.items.edit, itemsEditController);