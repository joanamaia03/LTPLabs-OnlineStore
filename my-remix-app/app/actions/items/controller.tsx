import { createController } from "remix/router";
import { routes } from "../../routes.ts";
import { HomePage } from "../homepage.tsx";
import { getItem } from "./data.ts";

export default createController(routes.items, {
  actions: {
    async show(context) {
      let item = await getItem(context.params.itemId);
      if (item === undefined) {
        return new Response("Item not found", { status: 404 });
      }
      return context.render(<HomePage item={item} />);
    },
  },
});
