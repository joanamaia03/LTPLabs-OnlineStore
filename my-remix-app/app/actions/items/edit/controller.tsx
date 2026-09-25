import { createController } from "remix/router";
import { routes } from "../../../routes.ts";
import {getItem, updateItem} from "../data.ts";
import { ItemEditPage } from "./page.tsx"
import * as s from "remix/data-schema";
import * as f from "remix/data-schema/form-data";
import * as coerce from "remix/data-schema/coerce";
import { redirect } from "remix/response/redirect";

const itemFormSchema = f.object({
  name: f.field(s.string()),
  price: f.field(coerce.number()),
});


export default createController(routes.items.edit, {
  actions: {
    async index(context) {
      let item = await getItem(context.params.itemId);
      if (item === undefined) {
        return new Response("Item not found", { status: 404 });
      }
      return context.render(<ItemEditPage item={item} />);
    },
     async action({ formData, params }) {
      let result = s.parseSafe(itemFormSchema, formData);
      if (!result.success) {
        return new Response("Invalid item data", { status: 400 });
      }
      let item = await updateItem(params.itemId, result.value);
      if (item === undefined) {
        return new Response("Item not found", { status: 404 });
      }
      return redirect(routes.items.show.href({ itemId: item.id }), 303);
    },
  },
});